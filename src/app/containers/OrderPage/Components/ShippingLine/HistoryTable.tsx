import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { translations } from "../../../../../locales/i18n";
import GologsTable from "../../../../components/Table/GologsTable";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";
import moment from "moment";
import { Link } from "react-router-dom";

interface IProps {
    onDataFetched?: any;
}

export default class HistoryTable extends React.Component<IProps> {
    state = {
        data: []
    };

    onDataFetched = e => {
        if (e) {
            if (this.props.onDataFetched) {
                this.props.onDataFetched(e);
            }
        }
    };

    changeState = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    };
    getDetailBtn = id => (
        <Link
            to={{
                pathname: "/order/" + id
            }}
        >
            <div className="text-secondary font-weight-bold">
                Detail
            </div>
        </Link>
    );

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
            { title: t(translations.entities.general.customer) },
            {
                title: t(translations.entities.general.submitDateAndTime),
                orderable: true,
                ascendingRequest: { IsCreatedDateDesc: false },
                descendingRequest: { IsCreatedDateDesc: true },
            },
            {
                title: t(translations.entities.general.completedDateAndTime),
                orderable: true,
                ascendingRequest: { IsCompleteDateDesc: false },
                descendingRequest: { IsCompleteDateDesc: true },
                defaultSort: true,
                defaultOrderType: "desc"
            },
            { title: "" }
        ];

        const columns = [
            {
                data: "jobNumber",
                searchable: true,
                name: "Search"
            },
            {
                data: null,
                render: () => "DO Online"
            },
            { data: "customerName" },
            {
                data: null,
                render: v => {
                    return moment(v.createdDate).format("DD-MM-YYYY HH:mm:ss");
                }
            },
            {
                data: null,
                render: v => {
                    return moment(v.modifiedDate).format("DD-MM-YYYY HH:mm:ss");
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
                        <div className="mt-3">
                            <GologsTable
                                overflowX="scroll"
                                variant="secondary"
                                striped={true}
                                columnDefs={columnDefs}
                                columns={columns}
                                serverSide={true}
                                defaultRequest={{
                                    IsDraft: false,
                                    Status: "DO_RELEASE"
                                }}
                                target="deliveryOrders"
                                endpoint={DeliveryOrder.list}
                                showSummaryLength={true}
                                onReload={props.onDataFetched}
                                showPagination={true}
                                width={1200}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    };

    render() {
        return (
            <this.getContent
                data={this.state.data}
                onDataFetched={this.onDataFetched}
            />
        );
    }
}
