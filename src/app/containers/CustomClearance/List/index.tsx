import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import GologsTable from "../../../components/Table/GologsTable";
import { GologsTab } from "../../../components/Tab/Loadable";
import { StatusBar } from "../../../components/StatusBar/Loadable";
import CustomClearance from "../../../../model/CustomClearance";
import User from "../../../../model/User";
import CustomClearanceEndpoint from "../../../../endpoints/CustomClearance";
import RejectModal from "./Components/RejectModal";
import moment from "moment";
import { Link } from "react-router-dom";
import { format } from "path";

type MyState = {
    activeTab?: any;
    data?: any;
    tabs?: any;
    activedAmount?: number;
    requestedAmount?: number;
    completedAmount?: number;
    showRejectModal: boolean;
};

export default class CustomClearanceRequestList extends React.Component {
    state: MyState = {
        showRejectModal: false,
        activeTab: "active",
        tabs: [],
        data: {
            draft: {
                columnDefs: [],
                columns: [],
                data: []
            },
            active: {
                columnDefs: [],
                columns: [],
                data: []
            },
            completed: {
                columnDefs: [],
                columns: [],
                data: []
            },
        },
        activedAmount: 0,
        completedAmount: 0,
        requestedAmount: 0
    };

    constructor(props) {
        super(props);
        setTimeout(() => {
            let query: any = new URLSearchParams(window.location.search);
            let tab: any = query.get("tab");
            if (tab == "active" || tab == "draft" || tab == "completed") {
                this.setState({ activeTab: tab });
            }
        }, 200);
    }

    getDraftDetail (id) {
        return (
            <div className="d-flex justify-content-center w-100">
                <Link
                    to={{
                        pathname: "/custom-clearance-request/" + id + "/continue"
                    }}
                >
                    <span className="font-weight-light-bolder text-primary mr-3">
                        <GeneralTranslation slug="continue" />
                    </span>
                </Link>

                <RejectModal
                    label={
                        <span className="font-weight-light-bolder text-danger">
                            <GeneralTranslation slug="cancel" />
                        </span>
                    }
                />
            </div>
        );
    }

    getActiveDetail (id, type) {
        let pathname: string = "";
        pathname = "/custom-clearance-request/" + id;

        return (
            <div className="d-flex justify-content-center w-100">
                <Link
                    to={{
                        pathname: pathname
                    }}
                >
                    <span className="font-weight-light-bolder text-primary">
                        <GeneralTranslation slug="detail" />
                    </span>
                </Link>
            </div>
        );
    }

    onDataReload = (slug) => {
        return (v) => {
            let amount = v.total;
            let tabs: any = this.state.tabs;
            let idx: number = tabs.findIndex(tab => tab.slug === slug);
            if (idx > -1) {
                tabs[idx].amount = amount;
                this.setState({ tabs: tabs });
            }
        } 
    }

    componentDidMount() {
        let data:any = this.state.data
        let tabs:any = this.state.tabs

        data.draft.columnDefs = []
        data.draft.columnDefs.push({ title:  <GeneralTranslation slug="service" />  })
        data.draft.columnDefs.push({
            title: <GeneralTranslation slug="createdDate" />,
            orderable: true,
            ascendingRequest: { IsCreatedDateDesc: false },
            descendingRequest: { IsCreatedDateDesc: true }
        });
        data.draft.columnDefs.push({ title:  <GeneralTranslation slug="Type" />  })
        data.draft.columnDefs.push({ title:  ""  })
        
        
        data.draft.columns = []
        data.draft.columns.push({
            data: null,
            render: () => "Custom Clearance"
        });
        data.draft.columns.push({
            data: null,
            render: resp =>
                moment(resp.createdDate).format("DD-MM-YYYY HH:mm:ss")
        });
        data.draft.columns.push({
            data: null,
            render: () => "Fill Out Form"
        })
        data.draft.columns.push({
            data: null,
            render: data => {
                return this.getDraftDetail(data.id);
            }
        });
        
        data.active.columnDefs = []
        data.active.columnDefs.push({
            title: <GeneralTranslation slug="jobNumber" />,
            orderable: true,
            ascendingRequest: { IsJobNumberDesc: false },
            descendingRequest: { IsJobNumberDesc: true }
        });
        data.active.columnDefs.push({ title :  <GeneralTranslation slug="transaction" />  })
        data.active.columnDefs.push({
            title: <GeneralTranslation slug="createdDate" />,
            orderable: true,
            ascendingRequest: { IsCreatedDateDesc: false },
            descendingRequest: { IsCreatedDateDesc: true }
        });
        data.active.columnDefs.push({ title :  <GeneralTranslation slug="Type" />  })
        data.active.columnDefs.push({ title :  <GeneralTranslation slug="status" />  })
        data.active.columnDefs.push({ title :  ""  })
        
        
        data.active.columns = [];
        data.active.columns.push({
            data: "jobNumber",
            searchable: true,
            name: "JobNumber"
        });
        data.active.columns.push({
            data: null,
            render: () => "Custom Clearance"
        });
        data.active.columns.push({
            data: null,
            render: resp =>
                moment(resp.createdDate).format("DD-MM-YYYY HH:mm:ss")
        });
        data.active.columns.push({
            data: null,
            render: () => "Fill Out Form"
        });
        data.active.columns.push({
            data: null,
            render: (resp) => {
                return <StatusBar
                    activeSection={resp.positionStatus}
                    subtitle={
                        moment(resp.createdDate).format("DD-MM-YYYY HH:mm:ss")
                    }
                    list={CustomClearance.statuses}
                />;
            }
        });
        data.active.columns.push({
            data: null,
            render: (data) => {
                return this.getActiveDetail(data.id, "Fill Out Form");
            }
        });
        
        
        data.active.data = data.active.data.map((v) => {
            v.status = (<></>);
            if (v.type === "Fill Out Form") {
                v.status = (
                    <StatusBar
                        activeSection={v.positionStatus}
                        subtitle={v.modifiedDate}
                        list={CustomClearance.statuses}
                        />
                        );
                    } else if (v.type === "Delegate") {
                v.status = (
                    <StatusBar
                        activeSection={v.positionStatus}
                        subtitle={v.modifiedDate}
                        list={CustomClearance.delegateStatuses}
                    />
                    );
            }

            v.createdDate = moment(v.createdDate).format(
                "DD-MM-YYYY HH:mm:SS"
            );
            v.action = this.getActiveDetail(v.id, v.type);

            return v;
        });
        
        data.completed.columnDefs = []
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="jobNumber" />  })
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="transaction" />  })
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="createdDate" />  })
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="completedDate" />  })
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="Type" />  })
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="paymentMethod" />  })
        data.completed.columnDefs.push({ title:  ""  })
        
        
        data.completed.columns = []
        data.completed.columns.push({
            data: "jobNumber",
            searchable: true,
            name: "Search"
        });
        data.completed.columns.push({
            data: null,
            render: () => "Custom Clearance"
        })
        data.completed.columns.push({
            data: null,
            render: resp => moment(resp.createdDate).format("YYYY-MM-DD")
        });
        data.completed.columns.push({
            data: null,
            render: () => moment(new Date()).format("YYYY-MM-DD")
        });
        data.completed.columns.push({
            data: null,
            render: () => moment(new Date()).format("YYYY-MM-DD")
        });
        data.completed.columns.push({
            data: null,
            render: () => "Debit"
        });
        data.completed.columns.push({
            data: null,
            render: data => {
                return this.getActiveDetail(data.id, "Fill Out Form");
            }
        });
        
        this.setState({data : data})

        tabs.push({
            slug: "draft",
            name: <GeneralTranslation slug="draft" />,
            amount: data.draft.data.length,
            content: (
                <GologsTable
                    totalDataParam="total"
                    striped={false}
                    columnDefs={this.state.data.draft.columnDefs}
                    columns={this.state.data.draft.columns}
                    defaultRequest={{
                        IsDraft: true,
                        CreatedBy: User.getCompanyName(),
                        IsCreatedDateDesc: true
                    }}
                    target="data"
                    serverSide={true}
                    endpoint={CustomClearanceEndpoint.list}
                    showSummaryLength={true}
                    showPagination={true}
                    onReload={this.onDataReload("draft")}
                />
            )
        });
        tabs.push({
            slug: "active",
            name: <GeneralTranslation slug="active" />,
            amount: data.active.data.length,
            content: (
                <GologsTable
                    totalDataParam="total"
                    striped={false}
                    showExportButton={true}
                    columnDefs={this.state.data.active.columnDefs}
                    columns={this.state.data.active.columns}
                    defaultRequest={{
                        IsDraft: false,
                        CreatedBy: User.getCompanyName(),
                        IsCreatedDateDesc: true
                    }}
                    target="data"
                    serverSide={true}
                    endpoint={CustomClearanceEndpoint.list}
                    showSummaryLength={true}
                    showPagination={true}
                    onReload={this.onDataReload("active")}
                />
            )
        });
        tabs.push({
            slug: "completed",
            name: <GeneralTranslation slug="completed" />,
            amount: this.state.data.completed.data.length,
            content: (
                <GologsTable
                    totalDataParam="total"
                    showExportButton={true}
                    striped={false}
                    columnDefs={this.state.data.completed.columnDefs}
                    columns={this.state.data.completed.columns}
                    serverSide={true}
                    target="data"
                    defaultRequest={{
                        IsComplete: true,
                        CreatedBy: User.getCompanyName(),
                        IsCreatedDateDesc: true
                    }}
                    endpoint={CustomClearanceEndpoint.list}
                    showSummaryLength={true}
                    showPagination={true}
                    onReload={this.onDataReload("completed")}
                />
            )
        });
        this.setState({tabs : tabs})
    }

    getHeader () {
        const { t } = useTranslation();
        
        return (
            <>
                <Helmet>
                    <title>{t(translations.customClearance.title)}</title>
                </Helmet>
                <Sidebar
                    header-name={<GeneralTranslation slug="customClearance.title" />}
                /> </>
        );
    }

    render() {
        return (
            <>
                <this.getHeader />
                <div className="gologs-container">
                    <GologsTab
                        showCircle={true}
                        showAmount={true}
                        activeTab={this.state.activeTab}
                        data={this.state.tabs}
                    />
                </div>
            </>
        );
    }
}