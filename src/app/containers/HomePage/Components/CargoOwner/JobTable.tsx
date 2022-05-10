import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { translations } from "../../../../../locales/i18n";
import GologsTable from "../../../../components/Table/GologsTable";
import CargoOwnerStatusIndicator from "../../../../components/StatusIndicator/CargoOwnerStatusIndicator";
import CargoOwnerDirectStatusIndicator from "../../../../components/StatusIndicator/CargoOwnerDirectStatusIndicator";
import { StatusBar } from "../../../../components/StatusBar/Loadable";
import Transaction from "../../../../../endpoints/Transaction";
import DeliveryOrderModel from "../../../../../model/DeliveryOrder";
import SP2Model from "../../../../../model/SP2";
import UserModel from "../../../../../model/User";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
    hideActiveOrder?: boolean;
    showExportButton?: boolean;
    showStatus?: boolean;
    onLoaded?: any;
    isActived?: boolean;
};

export default class JobTable extends React.Component<IProps> {
    state = {
        data: [],
        columns: [],
        activeOrderQty: 0
    };

    constructor(props) {
        super(props);
        let columns = [
            {
                data: "jobNumber",
                name: "Search",
                searchable: true
            },
            {
                data: null,
                render: (param: any) =>
                    param.deliveryOrderType ? "DO Online" : "SP2"
            },
            {
                data: null,
                render: v => {
                    return moment(v.createdDate).format("DD-MM-YYYY HH:mm:ss");
                }
            },
            {
                data: null,
                render: (param: any) => {
                    let response: string = "";
                    if(param.isDelegate === true) {
                        response = "Delegate";
                    } else if(param.isDelegate === false) {
                        response = "Direct";
                    }
                    
                    return response;
                }
            },
            {
                data: null,
                render: v => {
                    let statuses: any = [];
                    let positionStatus: any = 0;
                    let modifiedDate: any = 0;
                    if (v.deliveryOrderType) {
                        if(v.isDelegate === false) {
                            statuses = DeliveryOrderModel.statuses;
                        } else if(v.isDelegate === true) {
                            statuses = DeliveryOrderModel.delegateStatuses;
                        }
                        positionStatus = v.positionStatus;
                        modifiedDate = v.modifiedDate;
                    } else {
                        if(v.isDelegate === false) {
                            statuses = SP2Model.statuses;
                        } else if(v.isDelegate === true) {
                            statuses = SP2Model.delegateStatuses;
                        }
                        positionStatus = v.statusPosition;
                        modifiedDate = v.modifiedDate;
                    }
                    modifiedDate = moment(v.modifiedDate).format("DD-MM-YYYY HH:mm:ss");

                    return (
                        <StatusBar
                            activeSection={positionStatus}
                            subtitle={modifiedDate}
                            list={statuses}
                        />
                    );
                }
            },
            {
                data: null,
                className: "text-center",
                render: (param: any) => {
                    const isDelegate = param.isDelegate;
                    const id = param.id;
                    let type: string = "";
                    if (param.deliveryOrderType) {
                        type = "do";
                    } else {
                        type = "sp2";
                    }

                    return this.getDetailBtn(id, type, isDelegate);
                } 
            }
        ];

        this.changeState("columns", columns);
    }

    onReload = (v) => {
        let amount = v.total;
        this.setState({activeOrderQty: amount});
    }

    changeState = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    };

    getStatus = (activeSection = 0, type = "direct") => {
        const jobType = type.toLowerCase();
        return (
            <div>
                { 
                    jobType == "direct" && (
                        <CargoOwnerDirectStatusIndicator length={5} activeSection={activeSection} />
                    ) 
                }
    
                { 
                    jobType != "direct" && (
                        <CargoOwnerStatusIndicator length={6} activeSection={activeSection} />
                    ) 
                }
            </div>
        );
    };

    getDetailBtn = (id: string, type: string, isDelegate) => {
        let url: string = "";
        let transactionType: string = type.toLowerCase();

        if(isDelegate === true) {
            url = "/delegate/";
        } else {
            switch(transactionType) {
                case "do":
                    url = "/do-request/";
                    break;
                case "sp2":
                    url = "/sp2-request/";
                    break;
            }
        }
        
        url += id;
        
        return (
            <Link
                to={{
                    pathname: url
                }}
            >
                <a className="text-primary font-weight-bold">Detail</a>
            </Link>
        );
    };

    getContent = props => {
        const { t } = useTranslation();

        const columnDefs = [
            {
                title: t(translations.entities.general.jobNumber),
                orderable: true,
                ascendingRequest: { IsJobNumberDesc: false },
                descendingRequest: { IsJobNumberDesc: true }
            },
            { title: t(translations.entities.general.transactions) },
            {
                title: t(translations.entities.general.createdDate),
                orderable: true,
                ascendingRequest: { IsCreatedDateDesc: false },
                descendingRequest: { IsCreatedDateDesc: true },
                defaultSort: true,
                defaultOrderType: "desc"
            },
            { title: t(translations.entities.general.Type) },
            { title: t(translations.entities.general.status) },
            { title: "" }
        ];

        return (
            <>
                <Card className="rounded-20px">
                    <Card.Body>
                        {!props.hideActiveOrder && (
                            <Card.Subtitle className="text-sixth-gray text-capitalize d-inline-block">
                                {t(translations.entities.general.orderList)} (
                                {this.state.activeOrderQty})
                            </Card.Subtitle>
                        )}
                        <div className="mt-3">
                            <GologsTable
                                showExportButton={props.showExportButton}
                                striped={true}
                                serverSide={true}
                                defaultRequest={{
                                    IsDraft: false,
                                    createdBy: UserModel.getCompanyName()
                                }}
                                target="data"
                                endpoint={Transaction.list}
                                onReload={props.onReload}
                                showSummaryLength={true}
                                showPagination={true}
                                columnDefs={columnDefs}
                                columns={props.columns}
                                overflowX="scroll"
                                width={970}
                                startPaginationKey="start"
                                lengthPaginationKey="lenght"
                                totalDataParam="total"
                            />
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    };

    render() {
        return <this.getContent 
            data={this.state.data} 
            hideActiveOrder={this.props.hideActiveOrder} 
            showExportButton={this.props.showExportButton} 
            columns={this.state.columns}
            onReload={this.onReload}
        />;
    }
}
