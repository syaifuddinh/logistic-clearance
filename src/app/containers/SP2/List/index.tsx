import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import GologsTable from "../../../components/Table/GologsTable";
import { GologsTab } from "../../../components/Tab/Loadable";
import { StatusBar } from "../../../components/StatusBar/Loadable";
import SP2 from "../../../../model/SP2";
import User from "../../../../model/User";
import SP2Endpoint from "../../../../endpoints/SP2";
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
    defaultRequest?: any;
};

export default class SP2RequestList extends React.Component {
    state: MyState = {
        showRejectModal : false,
        activeTab : "active",
        tabs : [],
        data : {
            draft : {
                columnDefs : [],
                columns : [],
                data : []
            },
            active : {
                columnDefs : [],
                columns : [],
                data : []
            },
            completed : {
                columnDefs : [],
                columns : [],
                data : []
            },
        },
        activedAmount : 0,
        completedAmount : 0,
        requestedAmount : 0,
        defaultRequest: {
            draft: {},
            active: {},
            completed: {}
        },
    };

    constructor(props) {
        super(props);
        setTimeout(() => {
            let query: any = new URLSearchParams(window.location.search);
            let tab: any = query.get("tab");
            if (tab == "active" || tab == "draft" || tab == "completed") {
                this.setState({ activeTab: tab });
            } else {
                const companyType = User.getCompanyType();
                if (companyType === "Forwarder") {
                    tab = "draft";
                } else {
                    tab = "active";
                }
                this.setState({ activeTab: tab });
            }
        }, 200);
    }

    getDraftDetail (id) {
        return (
            <div className="d-flex justify-content-center w-100">
                <Link
                    to={{
                        pathname: "/sp2-request/" + id + "/continue"
                    }}
                >
                    <span className="font-weight-light-bolder text-primary mr-3">
                        <GeneralTranslation slug="continue" />
                    </span>
                </Link>

                <RejectModal
                    id={id}
                    label={
                        <span className="font-weight-light-bolder text-danger">
                            <GeneralTranslation slug="cancel" />
                        </span>
                    }
                    onSubmit={() => {
                        this.refreshTable();
                    }}
                />
            </div>
        );
    }

    refreshTable = () => {
        let refreshButton: any = document.getElementById(
            "datatableRefreshButton"
        );
        if (refreshButton) {
            refreshButton.click();
        }
    }

    getActiveDetail (id, isDelegate) {
        let pathname: string = "";
        if (!isDelegate) {
            pathname = "/sp2-request/" + id;
        } else  {
            pathname = "/delegate/" + id;
        }
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

    setDefaultRequest = companyType => {
        let defaultRequest: any = this.state.defaultRequest;
        defaultRequest.draft = {
            IsCreatedDateDesc: true
        };
        defaultRequest.active = {
            IsCreatedDateDesc: true
        };
        defaultRequest.completed = {
            IsCreatedDateDesc: true
        };
        switch(companyType) {
            case "CargoOwner":
                defaultRequest.draft.Status = "Draft";
                defaultRequest.draft.CreatedBy = User.getCompanyName();
                
                defaultRequest.active.Status = "Actived";
                defaultRequest.active.CreatedBy = User.getCompanyName();

                defaultRequest.completed.Status = "Completed";
                defaultRequest.completed.CreatedBy = User.getCompanyName();
                
                break;
            case "Forwarder":
                defaultRequest.draft.FreightForwarderName = User.getCompanyName();
                defaultRequest.active.FreightForwarderName = User.getCompanyName();
                defaultRequest.completed.FreightForwarderName = User.getCompanyName();

                defaultRequest.draft.IsDelegate = true;
                defaultRequest.draft.Status = "Delegate";
                defaultRequest.active.IsDelegate = true;
                defaultRequest.active.IsInProgress = true;
                defaultRequest.completed.IsDelegate = true;
                defaultRequest.completed.Status = "Completed";
                break;
        }

        this.setState({ defaultRequest: defaultRequest });
    }

    setDataByCompanyType = () => {
        const companyType = User.getCompanyType();
        this.setDefaultRequest(companyType);
    }
    
    componentDidMount() {
        let data:any = this.state.data;
        let tabs:any = this.state.tabs;

        this.setDataByCompanyType();

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
            render: () => "SP2"
        });
        data.draft.columns.push({
            data: null,
            render: resp =>
                moment(resp.createdDate).format("DD-MM-YYYY HH:mm:ss")
        });
        data.draft.columns.push({
            data: null,
            render: (param: any) => param.isDelegate === false ? "Fill Out Form" : "Delegate"
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
            name: "Search"
        });
        data.active.columns.push({
            data: null,
            render: () => "SP2"
        });
        data.active.columns.push({
            data: null,
            render: resp =>
                moment(resp.createdDate).format("DD-MM-YYYY HH:mm:ss")
        });
        data.active.columns.push({
            data: null,
            render: (param: any) =>
                param.isDelegate === false ? "Fill Out Form" : "Delegate"
        });
        data.active.columns.push({
            data: null,
            render: (resp) => {
                return <StatusBar
                    activeSection={resp.statusPosition}
                    subtitle={
                        moment(resp.createdDate).format("DD-MM-YYYY HH:mm:ss")
                    }
                    list={resp.isDelegate === false ? SP2.statuses : SP2.delegateStatuses}
                />;
            }
        });
        data.active.columns.push({
            data: null,
            render: (data) => {
                return this.getActiveDetail(data.id, data.isDelegate);
            }
        });
        
        
        data.active.data = data.active.data.map((v) => {
            v.status = (<></>);
            if (v.type === "Fill Out Form") {
                v.status = (
                    <StatusBar
                        activeSection={v.statusPosition}
                        subtitle={v.modifiedDate}
                        list={SP2.statuses}
                        />
                        );
                    } else if (v.type === "Delegate") {
                v.status = (
                    <StatusBar
                        activeSection={v.statusPosition}
                        subtitle={v.modifiedDate}
                        list={SP2.delegateStatuses}
                    />
                    );
            }

            v.createdDate = moment(v.createdDate).format(
                "DD-MM-YYYY HH:mm:SS"
            );
            v.action = this.getActiveDetail(v.id, v.isDelegate);

            return v;
        });
        
        data.completed.columnDefs = []
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="jobNumber" />  });
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="transaction" />  });
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="createdDate" />  });
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="completedDate" />  });
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="Type" />  });
        data.completed.columnDefs.push({ title:  <GeneralTranslation slug="paymentMethod" />  });
        data.completed.columnDefs.push({ title:  ""  });
        
        
        data.completed.columns = []
        data.completed.columns.push({
            data: "jobNumber",
            searchable: true,
            name: "Search"
        });
        data.completed.columns.push({
            data: null,
            render: () => "SP2"
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
            render: (param: any) => {
                return this.getActiveDetail(param.id, param.isDelegate);
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
                    defaultRequest={this.state.defaultRequest.draft}
                    serverSide={true}
                    target="data"
                    endpoint={SP2Endpoint.list}
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
                    defaultRequest={this.state.defaultRequest.active}
                    serverSide={true}
                    target="data"
                    endpoint={SP2Endpoint.list}
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
                    defaultRequest={this.state.defaultRequest.completed}
                    endpoint={SP2Endpoint.list}
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
                    <title>{t(translations.SP2.title)}</title>
                </Helmet>
                <Sidebar
                    header-name={<GeneralTranslation slug="SP2.title" />}
                />
            </>
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