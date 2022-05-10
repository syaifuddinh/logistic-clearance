import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import GologsTable from "../../../../components/Table/GologsTable";
import Contract from "../../../../../endpoints/Master/Contract";
import { GologsButton } from "../../../../components/Button/Loadable";
import { ConfirmModal } from "../../../../components/Modal/Confirm/Loadable";
import { CreatePage } from "../Components/CreatePage/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash  } from "@fortawesome/free-solid-svg-icons";
import GologsAlert from "../../../../components/Alert/GologsAlert";
import moment from "moment";

export default class List extends React.Component {
    state = {
        isShowCreatePage: false,
        breadcrumbs: [],
        data: {
            companyId: "",
            cargoOwnerId: "",
            contractNumber: "",
            emailPPJK: "",
            firstParty: "",
            secondParty: "",
            services: "",
            startDate: "",
            endDate: "",
            billingPeriod: "",
            priceRate: 0
        },
        option: {
        },
        table: {
            columnDefs: [],
            columns: []
        },
        alert: {
            show: false,
            type: "success",
            slug: ""
        }
    };

    refreshTable = () => {
        let refreshButton: any = document.getElementById("datatableRefreshButton");
        if (refreshButton) {
            refreshButton.click();
        }
    }
    
    onSubmit = async (id = null) => {
        let dt: any = {};
        let data: any = this.state.data;
        data.priceRate = parseInt(data.priceRate);
        try {
            if (id) {
                dt = await Contract.update(data, id);
            } else {
                dt = await Contract.store(data);
            }
            this.setState({data: {}})
            this.setState({option: {}})
            this.refreshTable();
        } catch(e) {
            throw Error(e);
        }
    }
    
    onDataChange = (fieldName, value) => {
        let data: any = this.state.data;
        data[fieldName] = value;
        this.setState({data: data});
    }

    onOptionChange = (fieldName, value) => {
        let option: any = this.state.option;
        option[fieldName] = value;
        this.setState({option: option});
        this.setParty(fieldName);
        this.setService();
    }

    setParty = (fieldName) => {
        let data: any = this.state.data
        switch(fieldName) {
            case "cargoOwner":
                data.secondParty = this.state.option[fieldName].label;
                data.cargoOwnerId = this.state.option[fieldName].value;
                break;
            case "forwarder":
                data.firstParty = this.state.option[fieldName].label;
                data.companyId = this.state.option[fieldName].value;
                data.emailPPJK = this.state.option[fieldName].email;
                break;
        }
        this.setState({data: data});
    }

    setService = () => {
        let option: any = this.state.option
        let data: any = this.state.data
        if(option.services) {
            if(option.services.value) {
                data.services = option.services.value;
                this.setState({data: data});
            }
        }
    }
    
    showCreatePage = () => {
        this.setState({isShowCreatePage: true});
    };
    hideCreatePage = () => {
        this.setState({isShowCreatePage: false});
    };

    edit = (id) => {
        return async () => {
            await this.show(id)
            this.showCreatePage();
        }
    };

    destroy = (id) => {
        const runAction = async () => {
            let dt: any = {};
            try {
                await Contract.destroy(id);
                this.refreshTable();
                this.showSuccessMessage("responseMessage.destroySuccess");
            } catch(e) {
                this.refreshTable();
                this.showErrorDefaultMessage();
                throw Error(e);
            }
        }

        return runAction;
    };

    show = async (id) => {
        let dt: any = {};
        let data: any = {};
        let option: any = this.state.option;
        this.setState({data: data});
        this.setState({option: {}});
        try {
            dt = await Contract.show(id);
            data.contractNumber = dt.contractNumber;
            data.firstParty = dt.firstParty;
            data.secondParty = dt.secondParty;
            data.services = dt.services;
            if (dt.startDate) data.startDate = new Date(dt.startDate);
            if (dt.endDate) data.endDate = new Date(dt.endDate);
            data.emailPPJK = dt.emailPPJK;
            data.billingPeriod = dt.billingPeriod;
            data.priceRate = dt.priceRate;
            this.setState({data: data});
            
            const forwarderId = dt.companyId;
            const cargoOwnerId = dt.cargoOwnerId;
            let services = dt.services;
            data.companyId = forwarderId;
            data.cargoOwnerId = cargoOwnerId;
            if(forwarderId) {
                option.forwarder = {label: dt.firstParty, value: forwarderId};
            } else {
                delete option.forwarder;
            }

            if(cargoOwnerId) {
                option.cargoOwner = {label: dt.secondParty, value: cargoOwnerId};
            } else {
                delete option.cargoOwner;
            }
            
            if(services) {
                services = services.trim().toUpperCase();
                option.services = { label: dt.services, value: services };
            } else {
                delete option.services;
            }
            
            this.setState({option: option});
            
        } catch(e) {
            this.showErrorDefaultMessage();
        }
    };

    showSuccessMessage = (slug) => {
        let alert: any = this.state.alert;
        alert.show = true;
        alert.type = "success"
        alert.slug = slug;
        this.setState({alert: alert});
        setTimeout(() => {
            let alert: any = this.state.alert;
            alert.show = false;
            this.setState({alert: alert});
        }, 4000) 
    }

    showDangerMessage = (slug) => {
        let alert: any = this.state.alert;
        alert.show = true;
        alert.type = "danger"
        alert.slug = slug;
        this.setState({alert: alert});
        setTimeout(() => {
            let alert: any = this.state.alert;
            alert.show = false;
            this.setState({alert: alert});
        }, 4000) 
    }

    showErrorDefaultMessage = () => {
        this.showDangerMessage("responseMessage.errorDefault");
    }

    componentDidMount() {
        let breadcrumbs: any = this.state.breadcrumbs;
        let table: any = this.state.table;
        breadcrumbs = [
            {
                name: <GeneralTranslation slug="sidebarMenu.masterData" />
            },
            {
                name: <GeneralTranslation slug="sidebarMenu.contract" />
            }
        ];
        this.setState({breadcrumbs: breadcrumbs});

        table.columnDefs = [
            { title: <GeneralTranslation slug="contractNumber" />},
            { title: <GeneralTranslation slug="firstParty" />},
            { title: <GeneralTranslation slug="secondParty" />},
            { title: <GeneralTranslation slug="services" />},
            { title: <GeneralTranslation slug="startDate" />},
            { title: <GeneralTranslation slug="endDate" />},
            { title: <GeneralTranslation slug="billingPeriod" />},
            { title: <GeneralTranslation slug="action" />}
        ];

        table.columns = [
            { data: "contractNumber" },
            { data: "firstParty" },
            { data: "secondParty" },
            { data: "services" },
            {
                data: null,
                render: v => {
                    let startDate: any = v.startDate ? v.startDate : "";
                    let resp: any = "";
                    if (startDate) {
                        startDate = moment(new Date(startDate)).format(
                            "YYYY-MM-DD"
                        );
                    }
                    resp = startDate;

                    return resp;
                }
            },
            {
                data: null,
                render: v => {
                    let endDate: any = v.endDate ? v.endDate : "";
                    let resp: any = "";
                    if (endDate) {
                        endDate = moment(new Date(endDate)).format(
                            "YYYY-MM-DD"
                        );
                    }
                    resp = endDate;

                    return resp;
                }
            },
            { data: "billingPeriod" },
            {
                data: null,
                render: v => {
                    return this.getDetailBtn(v.id);
                }
            }
        ];

        this.setState({table: table});
    
    }

    getDetailBtn = (id) => (
        <div>

            <CreatePage
                onOptionChange={this.onOptionChange}
                option={this.state.option}
                onDataChange={this.onDataChange}
                data={this.state.data}
                id={id}
                onSubmit={this.onSubmit}
                button={
                    <span 
                        onClick={this.edit(id)} 
                        className="text-primary font-weight-bold mr-2"
                    >
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                }
            />

            <ConfirmModal
                onConfirm={this.destroy(id)}
                button={
                    <span 
                        onClick={this.destroy} 
                        className="text-danger font-weight-bold"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                }
            />
        </div>
    );

    render() {
        return (
            <div className="gologs-container">
                <Container>
                    <Row className="bg-white">
                        <Col className="px-3 pt-4  d-flex justify-content-between align-items-center">
                            <div className="d-inline-block">
                                <h4 className="font-weight-bold d-inline-block mb-0 text-capitalize">
                                    <GeneralTranslation slug="sidebarMenu.contract" />
                                </h4>

                                <Breadcrumb items={this.state.breadcrumbs} />
                            </div>

                            <div>
                                <CreatePage
                                    onOptionChange={this.onOptionChange}
                                    option={this.state.option}
                                    onDataChange={this.onDataChange}
                                    onSubmit={this.onSubmit}
                                    data={this.state.data}
                                    button={
                                        <GologsButton
                                            onClick={this.showCreatePage}
                                            variant="primary"
                                            contentByTranslation={true}
                                            translation="addNew"
                                            size="small"
                                        />
                                    }
                                />
                            </div>
                        </Col>
                    </Row>

                    <Row className="bg-white mt-3">
                        <Col className="px-3 pt-4  d-flex justify-content-between align-items-center">
                            {this.state.table.columnDefs.length > 0 && (
                                <GologsTable
                                    serverSide={true}
                                    columnDefs={this.state.table.columnDefs}
                                    columns={this.state.table.columns}
                                    endpoint={Contract.list}
                                />
                            )}
                        </Col>
                    </Row>
                </Container>

                {this.state.alert.show && (
                    <GologsAlert
                        variant={this.state.alert.type}
                        slug={this.state.alert.slug}
                    />
                )}
            </div>
        );
    }
}
