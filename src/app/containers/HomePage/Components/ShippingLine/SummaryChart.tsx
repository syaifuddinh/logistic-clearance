import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";

type IProps = {
    period?: string;
};

export default class SummaryChart extends React.Component<IProps> {
    state = {
        periods: ["Today", "Weekly", "Monthly", "Yearly"],
        transaction: {
            actived: 0,
            rejected: 0,
            completed: 0,
            total: 0
        },
        chart: {
            type: "bar",
            datasets: [
                {
                    label: "# of Votes",
                    data: [0, 0, 0],
                    backgroundColor: ["#0078ff", "#fd7e14", "#dc3545"]
                }
            ]
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.period !== prevProps.period) {
            this.getSummary();
        }
    }

    getSummary = async () => {
        let dt: any = null;
        let transaction: any = this.state.transaction;
        let chart: any = this.state.chart;
        transaction.actived = 0;
        transaction.rejected = 0;
        transaction.completed = 0;
        transaction.total = 0;
        this.setState({ transaction: transaction });
        try {
            dt = await DeliveryOrder.monitorStatus(this.props.period);
            transaction.actived = dt.activedOrder;
            transaction.rejected = dt.rejectedOrder;
            transaction.completed = dt.completedOrder;
            transaction.total = dt.totalOrder;
            chart.datasets[0].data = [
                transaction.completed,
                transaction.actived,
                transaction.rejected
            ];

            chart = {
                type: "bar",
                datasets: [
                    {
                        label: "# of Votes",
                        data: [
                            transaction.completed,
                            transaction.actived,
                            transaction.rejected
                        ],
                        backgroundColor: ["#0078ff", "#fd7e14", "#dc3545"]
                    }
                ]
            };
            this.setState({transaction: transaction});
            this.setState({chart: chart});
        } catch(e) {
            
        }
    }

    componentDidMount() {
        this.getSummary();
    }
    
    showItem = (title, content, color = "secondary") => {
        return (
            <div className="d-flex justify-content-between mb-1">
                <span>
                    <div
                        className={"d-inline-block rounded-circle mr-2 border-" + color}
                        style={{ width: "3.9mm", height: "3.9mm", border: "2.5px solid" }}
                    ></div>
                    <span className="text-capitalize">{title}</span>
                </span>
                <span>{content}</span>
            </div>
        );
    };

    render() {
        return (
            <>
                <Card className="h-100">
                    <Card.Body>
                        <Card.Subtitle className="text-muted text-capitalize d-inline-block">
                            <GeneralTranslation slug="status" />
                        </Card.Subtitle>
                        <Card.Text className="mt-1">
                            <Row>
                                <Col sm="8" xs="12">
                                    <Doughnut data={this.state.chart} type="bar" />
                                </Col>
                                <Col
                                    sm="4"
                                    xs="12"
                                    className="text-center d-flex flex-column justify-content-center"
                                >
                                    <span className="font-weight-bold">
                                        Total
                                    </span>
                                    <br />
                                    <span>{this.state.transaction.total}</span>
                                </Col>
                            </Row>
                        </Card.Text>
                        <Card.Text className="mt-1">
                            {this.showItem(
                                <GeneralTranslation slug="completed" />,
                                this.state.transaction.completed
                            )}
                            {this.showItem(
                                <GeneralTranslation slug="active" />,
                                this.state.transaction.actived,
                                "warning"
                            )}
                            {this.showItem(
                                <GeneralTranslation slug="rejected" />,
                                this.state.transaction.rejected,
                                "danger"
                            )}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    };
}
