import React, { Component } from "react";
import GologsTable from "../../components/Table/GologsTable";
import DeliveryOrder from "../../../endpoints/DeliveryOrder";
import { GologsTab } from "../../components/Tab/Loadable";
import { GeneralTranslation } from "../../components/Translation/Loadable";
import { StatusBar } from "../../components/StatusBar/Loadable";
import DeliveryOrderModel from "../../../model/DeliveryOrder";
import UserModel from "../../../model/User";
import moment from "moment";
import { Link } from "react-router-dom";
import RejectModal from "./Components/RejectModal";

export default class CustomTab extends Component {
    state = {
        tabs: [],
        activeTab: "active",
        data: {
            draft: [],
            active: [],
            completed: []
        },
        defaultRequest: {
            draft: {},
            active: {},
            completed: {}
        },
        activedAmount: 0,
        requestedAmount: 0
    };

    constructor(props) {
        super(props);
        setTimeout(() => {

            let query: any = new URLSearchParams(window.location.search);
            let tab: any = query.get("tab");
            if (tab == "active" || tab == "draft" || tab == "completed") {
                this.setState({activeTab: tab});
            } else {
                const companyType = UserModel.getCompanyType();
                if(companyType === "Forwarder") {
                    tab = "draft";
                } else {
                    tab = "active";
                }
                this.setState({activeTab: tab});
            }
        }, 200);
    }

    setDefaultRequest = companyType => {
        let defaultRequest: any = this.state.defaultRequest;
        defaultRequest.draft = {
            IsCreatedDateDesc: true
        };
        defaultRequest.active = {
            IsDraft: false,
            IsCreatedDateDesc: true
        };
        defaultRequest.completed = {
            Status: "DO_RELEASE",
            IsCreatedDateDesc: true
        };
        switch(companyType) {
            case "CargoOwner":
                defaultRequest.draft.IsDraft = true;
                defaultRequest.draft.CreatedBy = UserModel.getCompanyName();
                
                defaultRequest.active.CreatedBy = UserModel.getCompanyName();
                defaultRequest.completed.CreatedBy = UserModel.getCompanyName();
                
                break;
                case "Forwarder":
                    defaultRequest.draft.FreightForwarderName = UserModel.getCompanyName();
                    defaultRequest.draft.Status = "DELEGATE";
                    
                    defaultRequest.active.FreightForwarderName = UserModel.getCompanyName();
                    defaultRequest.active.IsInProgress = true;
                    defaultRequest.completed.FreightForwarderName = UserModel.getCompanyName();


                defaultRequest.draft.IsDelegate = true;
                defaultRequest.active.IsDelegate = true;
                defaultRequest.completed.IsDelegate = true;
                break;
        }

        this.setState({ defaultRequest: defaultRequest });
    }

    setDataByCompanyType = () => {
        const companyType = UserModel.getCompanyType();
        this.setDefaultRequest(companyType);
    }
    
    componentDidMount() {
        let tabs: any = this.state.tabs;
        let columnDefs: any = {};
        let columns: any = {};
        this.setDataByCompanyType();

        columnDefs = {
            draft: [
                { title: "Services" },
                {
                    title: "Created Date",
                    orderable: true,
                    ascendingRequest: { IsCreatedDateDesc: false },
                    descendingRequest: { IsCreatedDateDesc: true },
                    defaultSort: true,
                    defaultOrderType: "desc"
                },
                { title: "Type" },
                {
                    title: "",
                    className: "text-center"
                }
            ],
            active: [
                {
                    title: <GeneralTranslation slug="jobNumber" />,
                    orderable: true,
                    ascendingRequest: { IsJobNumberDesc: false },
                    descendingRequest: { IsJobNumberDesc: true }
                },
                {
                    title: <GeneralTranslation slug="transaction" />
                },
                {
                    title: <GeneralTranslation slug="createdDate" />,
                    orderable: true,
                    ascendingRequest: { IsCreatedDateDesc: false },
                    descendingRequest: { IsCreatedDateDesc: true },
                    defaultSort: true,
                    defaultOrderType: "desc"
                },
                { title: <GeneralTranslation slug="Type" /> },
                { title: <GeneralTranslation slug="status" /> },
                { title: "" }
            ],
            completed: [
                {
                    title: <GeneralTranslation slug="jobNumber" />,
                    orderable: true,
                    ascendingRequest: { IsJobNumberDesc: false },
                    descendingRequest: { IsJobNumberDesc: true }
                },
                { title: <GeneralTranslation slug="transaction" /> },
                {
                    title: <GeneralTranslation slug="createdDate" />,
                    orderable: true,
                    ascendingRequest: { IsCreatedDateDesc: false },
                    descendingRequest: { IsCreatedDateDesc: true },
                    defaultSort: true,
                    defaultOrderType: "desc"
                },
                { title: <GeneralTranslation slug="completedDate" /> },
                { title: <GeneralTranslation slug="Type" /> },
                { title: <GeneralTranslation slug="paymentMethod" /> },
                { title: "" }
            ]
        };

        columns = {
            draft: [
                {
                    data: null,
                    render: () => "DO Online"
                },
                {
                    data: null,
                    name: "Search",
                    searchable: true,
                    render: v => {
                        return moment(v.createdDate).format(
                            "DD-MM-YYYY HH:mm:ss"
                        );
                    }
                },
                { 
                    data: null,
                    render: (param: any) => param.isDelegate === true ? "DELEGATE" : "DIRECT"
                },
                {
                    data: null,
                    render: v => this.getDetailBtn(v.id)
                }
            ],
            active: [
                {
                    data: "jobNumber",
                    name: "Search",
                    searchable: true
                },
                {
                    data: null,
                    render: () => "DO Online"
                },
                {
                    data: null,
                    name: "CreatedDate",
                    render: v => {
                        return moment(v.createdDate).format(
                            "DD-MM-YYYY HH:mm:ss"
                        );
                    }
                },
                {
                    data: null,
                    render: (param: any) => param.isDelegate == true ? "Delegate" : "Direct"
                },
                {
                    data: null,
                    render: v => {
                        let resp: any = <></>;
                        if (v.isDelegate === false) {
                            resp = (
                                <StatusBar
                                    key={v.id}
                                    activeSection={v.positionStatus}
                                    subtitle={moment(v.modifiedDate).format(
                                        "DD-MM-YYYY HH:mm:ss"
                                    )}
                                    list={DeliveryOrderModel.statuses}
                                />
                            );
                        } else if (v.isDelegate === true) {
                                   resp = (
                                       <StatusBar
                                           key={v.id}
                                           activeSection={v.positionStatus}
                                           subtitle={v.modifiedDate}
                                           list={
                                               DeliveryOrderModel.delegateStatuses
                                           }
                                       />
                                   );
                               }

                        return resp;
                    }
                },
                {
                    data: null,
                    render: v => this.getActiveDetailBtn(v.id, v.isDelegate)
                }
            ],
            completed: [
                {
                    data: "jobNumber",
                    name: "Search",
                    searchable: true
                },
                {
                    data: null,
                    render: () => "DO Online"
                },
                {
                    data: null,
                    render: v => {
                        return moment(v.createdDate).format(
                            "DD-MM-YYYY HH:mm:ss"
                        );
                    }
                },
                {
                    data: null,
                    render: v => {
                        return moment(v.modifiedDate).format(
                            "DD-MM-YYYY HH:mm:ss"
                        );
                    }
                },
                { data: "deliveryOrderType" },
                {
                    data: null,
                    render: () => "Credit Card"
                },
                {
                    data: null,
                    render: v => this.getActiveDetailBtn(v.id, v.isDelegate)
                }
            ]
        };

        tabs.push({
            slug: "draft",
            name: <GeneralTranslation slug="draft" />,
            amount: this.state.requestedAmount,
            content: (
                <GologsTable
                    striped={true}
                    columnDefs={columnDefs.draft}
                    columns={columns.draft}
                    serverSide={true}
                    defaultRequest={this.state.defaultRequest.draft}
                    target="deliveryOrders"
                    endpoint={DeliveryOrder.list}
                    onReload={this.onDraftReload}
                    showSummaryLength={true}
                    showPagination={true}
                />
            )
        });
        tabs.push({
            slug: "active",
            name: <GeneralTranslation slug="active" />,
            amount: this.state.activedAmount,
            content: (
                <GologsTable
                    striped={true}
                    columnDefs={columnDefs.active}
                    columns={columns.active}
                    serverSide={true}
                    defaultRequest={this.state.defaultRequest.active}
                    target="deliveryOrders"
                    endpoint={DeliveryOrder.list}
                    onReload={this.onActiveReload}
                    showSummaryLength={true}
                    showPagination={true}
                    overflowX="scroll"
                    width={970}
                />
            )
        });
        tabs.push({
            slug: "completed",
            name: <GeneralTranslation slug="completed" />,
            content: (
                <GologsTable
                    striped={true}
                    columnDefs={columnDefs.completed}
                    columns={columns.completed}
                    serverSide={true}
                    defaultRequest={this.state.defaultRequest.completed}
                    target="deliveryOrders"
                    onReload={this.onCompletedReload}
                    endpoint={DeliveryOrder.list}
                    showSummaryLength={true}
                    showPagination={true}
                    overflowX="scroll"
                    width={970}
                />
            )
        });
        this.setState({ tabs: tabs });
    }

    onDraftReload = (v) => {
        let requestedAmount = v.totalCount;
        let tabs: any = this.state.tabs;
        let idx: number = tabs.findIndex(tab => tab.slug === "draft")
        if (idx > -1) {
            tabs[idx].amount = requestedAmount;
            this.setState({tabs: tabs});
        }
    }

    onActiveReload = (v) => {
        let activedAmount = v.totalCount;
        let tabs: any = this.state.tabs;
        let idx: number = tabs.findIndex(tab => tab.slug === "active")
        if (idx > -1) {
            tabs[idx].amount = activedAmount;
            this.setState({tabs: tabs});
        }
    }

    onCompletedReload = (v) => {
        let completedAmount = v.totalCount;
        let tabs: any = this.state.tabs;
        let idx: number = tabs.findIndex(tab => tab.slug === "completed")
        if (idx > -1) {
            tabs[idx].amount = completedAmount;
            this.setState({tabs: tabs});
        }
    }


    setActivedAmount = e => {
        this.setState({ activedAmount: e });
        let tabs:any = this.state.tabs;
        let idx:number = tabs.findIndex(v => v.slug == "active")
        if (idx > -1) {
            tabs[idx].amount = e
            this.setState({tabs : tabs})
        }
    };

    setRequestedAmount = e => {
        this.setState({ requestedAmount: e });
    };

    changeState = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    };

    getDetailBtn = id => (
        <div className="text-center">
            <Link
                to={
                    {
                        pathname: "do-request/" + id + "/continue"
                    }
                }
            >
                <div
                    className="text-primary d-inline-block font-weight-bold mr-4"
                >
                    <GeneralTranslation slug="continue" />
                </div>
            </Link>
            &nbsp;
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
    
    refreshTable = () => {
        let refreshButton: any = document.getElementById(
            "datatableRefreshButton"
        );
        if (refreshButton) {
            refreshButton.click();
        }
    }

    getActiveDetailBtn = (id, isDelegate) => {
        const companyType = UserModel.getCompanyType();
        let url: string = "";
        if(isDelegate === true) {
            url = "/delegate/" + id;
        } else {
            url = "do-request/" + id;
        }
        return <div className="text-center">
            <Link
                to={
                    {
                        pathname: url
                    }
                }
            >
                <div
                    className="text-primary font-weight-bold"
                >
                    <GeneralTranslation slug="detail" />
                </div>
            </Link>
        </div>
    };
    
    render() {
        return (
            <>
                {this.state.tabs.length > 0 && (
                    <GologsTab
                        showCircle={true}
                        showAmount={true}
                        activeTab={this.state.activeTab}
                        data={this.state.tabs}
                    />
                )}
            </>
        );
    }
}
