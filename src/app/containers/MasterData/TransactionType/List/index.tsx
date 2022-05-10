import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import GologsTable from "../../../../components/Table/GologsTable";
import TransactionType from "../../../../../endpoints/Master/TransactionType";
import { GologsButton } from "../../../../components/Button/Loadable";
import { ConfirmModal } from "../../../../components/Modal/Confirm/Loadable";
import { CreatePage } from "../Components/CreatePage/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faFolder, faTrash  } from "@fortawesome/free-solid-svg-icons";
import GologsAlert from "../../../../components/Alert/GologsAlert";

export default class List extends React.Component {
    state = {
        isShowCreatePage: false,
        breadcrumbs: [],
        data: {
            transactionName: "",
            transactionAlias: "",
            tableName: ""
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
    
    onSubmit = async (id?: string) => {
        let dt: any = {};
        try {
            if (id) {
                dt = await TransactionType.update(this.state.data, id);
            } else {
                dt = await TransactionType.store(this.state.data);
            }
            this.setState({data: {}})
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
        // const runAction = async () => {
        //     let dt: any = {};
        //     try {
        //         await TransactionType.destroy(id);
        //         this.refreshTable();
        //         this.showSuccessMessage("responseMessage.destroySuccess");
        //     } catch(e) {
        //         this.refreshTable();
        //         this.showErrorDefaultMessage();
        //         throw Error(e);
        //     }
        // }

        // return runAction;
    };

    show = async (id) => {
        let dt: any = {};
        let data: any = {};
        this.setState({data: data});
        try {
            dt = await TransactionType.show(id);
            data.transactionName = dt.transactionName;
            data.transactionAlias = dt.transactionAlias;
            data.tableName = dt.tableName;
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
                name: <GeneralTranslation slug="transactionType" />
            }
        ];
        this.setState({breadcrumbs: breadcrumbs});

        table.columnDefs = [
            { title: <GeneralTranslation slug="transactionName" /> },
            { title: <GeneralTranslation slug="transactionAlias" /> },
            { title: <GeneralTranslation slug="tableName" /> },
            { title: "" }
        ];

        table.columns = [
            { data: "transactionName" },
            { data: "transactionAlias" },
            { data: "tableName" },
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
                                    <GeneralTranslation slug="transactionType" />
                                </h4>

                                <Breadcrumb items={this.state.breadcrumbs} />
                            </div>

                            <div>
                                <CreatePage
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
                                    endpoint={TransactionType.list}
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
