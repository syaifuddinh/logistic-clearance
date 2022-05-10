import React from "react";
import { Row, Col } from "react-bootstrap";
import SummaryCard from "../../../components/SummaryCard/SummaryCard";
import JobTable from "./CargoOwner/JobTable";
import SummaryChart from "./CargoOwner/SummaryChart";
import TotalOrderChart from "./CargoOwner/TotalOrderChart";
import TotalAmountChart from "./CargoOwner/TotalAmountChart";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";
import User from "../../../../model/User";

export default class CargoOwner extends React.Component {
    state = {
        period: "Yearly",
        periods: ["Today", "Weekly", "Monthly", "Yearly"],
        transaction: {
            actived: 0, 
            completed: 0,
            rejected: 0,
            total: 0
        }
    };

    componentDidMount() {
        this.getSummary();
    }

    getSummary = async () => {
        let dt: any = null;
        let transaction: any = this.state.transaction;
        transaction.actived = 0;
        transaction.rejected = 0;
        transaction.completed = 0;
        transaction.total = 0;
        this.setState({ transaction: transaction });
        try { 
            dt = await DeliveryOrder.monitorStatus(
                this.state.period,
                User.getCompanyName()
            );
            transaction.actived = dt.activedOrder;
            transaction.rejected = dt.rejectedOrder;
            transaction.completed = dt.completedOrder;
            transaction.total = dt.totalOrder;
            this.setState({transaction: transaction});
        } catch(e) {
            
        }
    }

    getTransactionAmount = async () => {
        let dt: any = null;
        try { 
            dt = await DeliveryOrder.monitorService(
                "ThisYear",
                User.getCompanyName()
            );
        } catch(e) {
            
        }
    }
    
    render() {
        return (
            <>
                <div>
                    <Row className="mt-3">
                        <Col
                            lg="4"
                            md="6"
                            xs="12"
                            className="md-mb-0px mb-20px md-pr-2"
                        >
                            <SummaryCard
                                title={<GeneralTranslation slug="totalOrder" />}
                                description={this.state.transaction.total}
                                imageName="totbag.svg"
                            />
                        </Col>
                        <Col
                            lg="4"
                            md="6"
                            xs="12"
                            className="md-mb-0px mb-20px"
                        >
                            <SummaryCard
                                title={<GeneralTranslation slug="inProgress" />}
                                description={this.state.transaction.actived}
                                imageName="inProgress.svg"
                            />
                        </Col>
                        <Col
                            lg="4"
                            md="6"
                            xs="12"
                            className="md-pl-2 md-mb-0px mb-20px"
                        >
                            <SummaryCard
                                title={<GeneralTranslation slug="completed" />}
                                description={this.state.transaction.completed}
                                imageName="completed.svg"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="mb-3">
                            <JobTable isActived={true} />
                        </Col>
                    </Row>

                    <Row className="mt-1">
                        <Col xs="12" md="6" lg="5">
                            <SummaryChart />
                        </Col>
                        <div className="d-block d-md-none">
                            <br />
                        </div>
                        <Col xs="12" md="6" lg="7">
                            <TotalOrderChart />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <TotalAmountChart />
                        </Col>
                    </Row>
                </div>
            </>
        );
    };
}
