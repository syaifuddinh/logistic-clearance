import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import GologsTable from "../../../components/Table/GologsTable";
import InTransit from "../../../../endpoints/Master/InTransit";
import moment from "moment";
import { ConfirmModal } from "../../../components/Modal/Confirm/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash
} from "@fortawesome/free-solid-svg-icons";

export default class InTransitList extends React.Component {
    state = {
        table: {
            columnDefs: [],
            columns: [],
            data: []
        },
        alert: {
            show: false,
            type: "success",
            slug: ""
        }
    };

    componentDidMount() {
        this.initTable();
    }

    getDetailBtn = id => (
        <div>
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

    showErrorDefaultMessage = () => {
        this.showDangerMessage("responseMessage.errorDefault");
    };

    showSuccessMessage = slug => {
        let alert: any = this.state.alert;
        alert.show = true;
        alert.type = "success";
        alert.slug = slug;
        this.setState({ alert: alert });
        setTimeout(() => {
            let alert: any = this.state.alert;
            alert.show = false;
            this.setState({ alert: alert });
        }, 4000);
    };

    showDangerMessage = slug => {
        let alert: any = this.state.alert;
        alert.show = true;
        alert.type = "danger";
        alert.slug = slug;
        this.setState({ alert: alert });
        setTimeout(() => {
            let alert: any = this.state.alert;
            alert.show = false;
            this.setState({ alert: alert });
        }, 4000);
    };

    refreshTable = () => {
        let refreshButton: any = document.getElementById(
            "datatableRefreshButton"
        );
        if (refreshButton) {
            refreshButton.click();
        }
    };

    destroy = id => {
        const runAction = async () => {
            let dt: any = {};
            try {
                await InTransit.destroy(id);
                this.refreshTable();
                this.showSuccessMessage(
                    "responseMessage.destroySuccess"
                );
            } catch (e) {
                this.refreshTable();
                this.showErrorDefaultMessage();
                throw Error(e);
            }
        };

        return runAction;
    };

    initTable = () => {
        let table: any = this.state.table;
        table.columnDefs = [];
        table.columnDefs.push({
            title: <GeneralTranslation slug="customerName" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="service" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="errorMessage" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="status" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="jobNumber" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="jobCreatedDate" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="errorCreatedDate" />
        });
        table.columnDefs.push({
            title: <GeneralTranslation slug="nextAction" />
        });
        
        table.columns = [
            {
                data: "customerName",
                className: "w-150px"
            },
            { data: "service" },
            {
                data: "errorMessage",
                className: "w-250px"
            },
            { data: "status" },
            { data: "jobNumber" },
            {
                data: null,
                className: "w-150px",
                render: param => {
                    let date: any = moment(param.jobCreatedDate).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                    date = date === "01-01-0001 00:00:00" ? "" : date;
                    return date;
                }
            },
            {
                data: null,
                className: "w-150px",
                render: param =>
                    moment(param.errorCreatedDate).format("DD-MM-YYYY HH:mm:ss")
            },
            {
                data: null,
                className: "text-center w-95px",
                render: v => {
                    return this.getDetailBtn(v.id);
                }
            }
        ];

        this.setState({ table: table });
    };

    getHeader() {
        const { t } = useTranslation();

        return (
            <>
                <Helmet>
                    <title>
                        {t(translations.sidebarMenu.inTransit)}
                    </title>
                </Helmet>
                <Sidebar
                    header-name={
                        <GeneralTranslation slug="sidebarMenu.inTransit" />
                    }
                />
            </>
        );
    }

    render() {
        return (
            <>
                <this.getHeader />
                <div className="gologs-container">
                    <div className="bg-white rounded-10px p-4">
                        {this.state.table.columnDefs.length >
                            0 && (
                            <GologsTable
                                serverSide={true}
                                striped={true}
                                columnDefs={
                                    this.state.table.columnDefs
                                }
                                columns={
                                    this.state.table.columns
                                }
                                endpoint={InTransit.list}
                                overflowX="scroll"
                                width={1200}
                            />
                        )}
                    </div>
                </div>
            </>
        );
    }
}