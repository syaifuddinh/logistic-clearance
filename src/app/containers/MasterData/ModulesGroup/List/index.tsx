import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import GologsTable from "../../../../components/Table/GologsTable";
import ModuleGroup from "../../../../../endpoints/Master/ModuleGroup";
import Storage from "../../../../../endpoints/Storage";
import { GologsButton } from "../../../../components/Button/Loadable";
import { ConfirmModal } from "../../../../components/Modal/Confirm/Loadable";
import { CreatePage } from "../Components/CreatePage/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faFolder, faTrash  } from "@fortawesome/free-solid-svg-icons";
import GologsAlert from "../../../../components/Alert/GologsAlert";
import moment from "moment";

export default class List extends React.Component {
    state = {
        isShowCreatePage: false,
        breadcrumbs: [],
        data: {
            moduleGroupCode: "",
            moduleGroupName: ""
        },
        file: {
            attachment: {
                fileName: "",
                file: null
            }
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

    onFileDrop = async (fieldName, value) => {
        let file: any = this.state.file;
        try {
            file[fieldName].isShowLoading = true;
            this.setState({file: file});
            await Storage.uploadFile(value);
            file = this.state.file;
            file[fieldName].isShowLoading = false;
            file[fieldName].file = value;
            file[fieldName].fileName = value.name;
            this.setState({file: file});
        } catch(e) {
            this.showErrorDefaultMessage();
            file = this.state.file
            file[fieldName].isShowLoading = false;
            this.setState({file: file});
        }
    }

    onFileDelete = (fieldName, value) => {
        let file: any = this.state.file;
        file[fieldName] = {};
        this.setState({ file: file });
    }


    refreshTable = () => {
        let refreshButton: any = document.getElementById("datatableRefreshButton");
        if (refreshButton) {
            refreshButton.click();
        }
    }
    
    onSubmit = async (id = null) => {
        let dt: any = {};
        let data: any = this.state.data;
        try {
            if (id) {
                dt = await ModuleGroup.update(this.state.data, id);
            } else {
                dt = await ModuleGroup.store(this.state.data);
            }
            this.setState({data: {}})
            this.refreshTable();
        } catch(e) {
            this.showErrorDefaultMessage();
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
            await this.show(id);
        }
    };

    destroy = (id) => {
        const runAction = async () => {
            let dt: any = {};
            try {
                await ModuleGroup.destroy(id);
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
        this.setState({data: data});
        try {
            dt = await ModuleGroup.show(id);
            data.moduleGroupName = dt.moduleGroupName;
            data.moduleGroupCode = dt.moduleGroupCode;
            this.setState({data: data});
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
                name: <GeneralTranslation slug="sidebarMenu.modulesGroup" />
            }
        ];
        this.setState({breadcrumbs: breadcrumbs});

        table.columnDefs = [
            { title: <GeneralTranslation slug="modulesGroupCode" />},
            { title: <GeneralTranslation slug="modulesGroupName" />},
            { title: ""}
        ];

        table.columns = [
            { data: "moduleGroupCode" },
            { data: "moduleGroupName" },
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
                onFileDrop={this.onFileDrop}
                onFileDelete={this.onFileDelete}
                data={this.state.data}
                file={this.state.file}
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
                                    <GeneralTranslation slug="sidebarMenu.modulesGroup" />
                                </h4>

                                <Breadcrumb items={this.state.breadcrumbs} />
                            </div>

                            <div>
                                <CreatePage
                                    onDataChange={this.onDataChange}
                                    onFileDrop={this.onFileDrop}
                                    onFileDelete={this.onFileDelete}
                                    onSubmit={this.onSubmit}
                                    data={this.state.data}
                                    file={this.state.file}
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
                                    endpoint={ModuleGroup.list}
                                    overflowX="scroll"
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
