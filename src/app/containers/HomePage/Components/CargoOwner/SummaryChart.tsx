import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";
import User from "../../../../../model/User";

export default class SummaryChart extends React.Component{
    state = {
        period: "Yearly",
        transaction : {
            total : 0,
            do : 0,
            sp2 : 0,
            tms : 0,
            customClearance: 0
        },
        chart: {
            type: "bar",
            datasets: [
                {
                    label: "# of Votes",
                    data: [12, 19, 3],
                    backgroundColor: ["#0078ff", "#fd7e14", "#dc3545"]
                }
            ]
        }
    }

    componentDidMount() {
        this.getSummary();
    }
    
    getSummary = async () => {
        let dt: any = null;
        let transaction: any = this.state.transaction;
        transaction.do = 0;
        transaction.sp2 = 0;
        transaction.tms = 0;
        transaction.customClearance = 0;
        this.setState({ transaction: transaction });
        this.getTotal();
        try { 
            dt = await DeliveryOrder.monitorStatus(
                this.state.period,
                User.getCompanyName()
            );
            transaction.do = dt.totalOrder;
            this.setState({transaction: transaction});
            this.getTotal();
        } catch(e) {
            
        }
    }

    getTotal = () => {
        let transaction: any = this.state.transaction;
        let total: number = transaction.total;
        total = transaction.do + transaction.sp2 + transaction.tms + transaction.customClearance;
        transaction.total = total;
        this.setState({transaction: transaction})
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
                        <Card.Subtitle className="text-sixth-gray fs-16px text-capitalize d-inline-block">
                            <GeneralTranslation slug="serviceOrder" />
                        </Card.Subtitle>
                        <Card.Text className="mt-1">
                            <Row>
                                <Col sm="8" xs="12">
                                    <Doughnut
                                        data={this.state.chart}
                                        type="bar"
                                    />
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
                                "DO Online",
                                this.state.transaction.do,
                                "primary"
                            )}
                            {this.showItem("SP2", 0, "warning")}
                            {this.showItem("Custom clearance", 0, "danger")}
                            {this.showItem("TMS", 0, "secondary")}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    };
}
