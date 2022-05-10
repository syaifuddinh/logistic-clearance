import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { translations } from "../../../../../locales/i18n";
import GologsTable from "../../../../components/Table/GologsTable";
import StatusIndicator from "../../../../components/StatusIndicator/StatusIndicator";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
    onDataFetched?: any;
    showActiveOrder?: boolean;
    showViewAll?: boolean;
};

export default class ActivedTable extends React.Component<IProps> {
    state = {
        data: [],
        activeOrder: 0
    };

    onDataFetched = (e) => {
        let activeOrder: number = 0;
        if (e) {
            activeOrder = e.totalCount ? e.totalCount : 0;
            this.setState({ activeOrder: activeOrder });
            if (this.props.onDataFetched) {
                this.props.onDataFetched(e);
            }
        }
    }    

    componentDidMount() {
    }

    changeState = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    };
    
    getStatus = (activeSection = 0, subtitle = null) => {
        return <StatusIndicator 
            length={4} 
            activeSection={activeSection} 
            subtitle={subtitle}
        />;
    };
    getDetailBtn = (id) => (
        <Link
            to={
                {
                    pathname: "/order/" + id
                }
            }
        >
            <div 
                className="text-secondary font-weight-bold"
            >
            Detail
            </div>
        </Link>
    );
  
    getContent = (props) => {
        const { t } = useTranslation();
        
        const columnDefs = [
            {
                title: t(translations.entities.general.jobNumber),
                orderable: true,
                ascendingRequest: { IsJobNumberDesc: false },
                descendingRequest: { IsJobNumberDesc: true }
            },
            { title: t(translations.entities.general.transactions) },
            { title: t(translations.entities.general.customer) },
            {
                title: t(translations.entities.general.submitDateAndTime),
                orderable: true,
                ascendingRequest: { IsCreatedDateDesc: false },
                descendingRequest: { IsCreatedDateDesc: true },
                defaultSort: true,
                defaultOrderType: "desc"
            },
            { title: t(translations.entities.general.status) },
            { title: "" }
        ];

        const columns = [
            {
                data: "jobNumber",
                searchable: true,
                name: "Search",
                className: "md-w-300px"
            },
            {
                data: null,
                render: () => "DO Online",
                className: "md-w-130px"
            },
            {
                data: "customerName",
                className: "md-w-100px"
            },
            {
                data: null,
                className: "md-w-180px",
                render: v => {
                    return moment(v.createdDate).format("DD-MM-YYYY HH:mm:ss");
                }
            },
            {
                data: null,
                render: v => {
                    let activeLength: any = 0;
                    if(v.isDelegate === true) {
                        activeLength = v.positionStatus - 1;
                        activeLength = activeLength > 0 ? activeLength : 1;
                    } else {
                        activeLength = v.positionStatus;
                    }
                    return this.getStatus(activeLength, v.modifiedDate);
                }
            },
            {
                data: null,
                className: "text-center",
                render: v => {
                    return this.getDetailBtn(v.id);
                }
            }
        ];

        return (
            <>
                <Card>
                    <Card.Body>
                        <div className="mb-5">
                            {props.showActiveOrder && (
                                <span className="float-left fs-16px font-poppins text-seventh-gray mb-2 d-inline-block text-capitalize">
                                    <GeneralTranslation slug="orderList" /> (
                                    {props.activeOrder})
                                </span>
                            )}
                            {props.showViewAll && (
                                <span className="float-right fs-16px font-poppins text-seventh-gray mb-2 d-inline-block text-capitalize">
                                    <a className="text-secondary" href="/order">
                                        <GeneralTranslation slug="viewAll" /> (
                                    </a>
                                </span>
                            )}
                        </div>
                        <div className="mt-3">
                            <GologsTable
                                variant="secondary"
                                striped={true}
                                columnDefs={columnDefs}
                                columns={columns}
                                serverSide={true}
                                defaultRequest={{
                                    IsDraft: false,
                                    IsInProgress: true
                                }}
                                target="deliveryOrders"
                                endpoint={DeliveryOrder.list}
                                onReload={props.onDataFetched}
                                showSummaryLength={true}
                                showPagination={true}
                                overflowX="scroll"
                                width={1200}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }

    render() {
        return (
            <this.getContent
                data={this.state.data}
                activeOrder={this.state.activeOrder}
                showActiveOrder={this.props.showActiveOrder}
                onDataFetched={this.onDataFetched}
            />
        );
    }

}