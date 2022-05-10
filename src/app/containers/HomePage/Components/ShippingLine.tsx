import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SummaryCard from "../../../components/SummaryCard/SummaryCard";
import TimeMilestone from "../../../components/Milestone/TimeMilestone";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import ExportButton from "./ShippingLine/ExportButton";
import JobTable from "./ShippingLine/JobTable";
import SummaryChart from "./ShippingLine/SummaryChart";
import TotalOrderChart from "./ShippingLine/TotalOrderChart";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";
import TotalAmountChart from "./ShippingLine/TotalAmountChart";

export default class ShippingLine extends React.Component {
    state = {
        period: "Yearly",
        periods: ["Today", "Weekly", "Monthly", "Yearly"],
        transaction: {
            actived: 0, 
            completed: 0,
            rejected: 0,
            total: 0
        },
        uploadedDocument: {
            do: 0, 
            proformaInvoice: 0
        }
    };

    componentDidMount() {
        this.getSummary();
        this.getUploadedDocument();
    }

    periodOnChange = (idx) => {
        let periods: any = this.state.periods;
        this.setState({period: periods[idx - 1]});
        setTimeout(() => {
            this.getSummary();
        }, 400)
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
            dt = await DeliveryOrder.monitorStatus(this.state.period);
            transaction.actived = dt.activedOrder;
            transaction.rejected = dt.rejectedOrder;
            transaction.completed = dt.completedOrder;
            transaction.total = dt.totalOrder;
            this.setState({transaction: transaction});
        } catch(e) {
            
        }
    }

    getUploadedDocument = async () => {
        let dt: any = null;
        let uploadedDocument: any = this.state.uploadedDocument;
        uploadedDocument.do = 0;
        uploadedDocument.proformaInvoice = 0;
        this.setState({ uploadedDocument: uploadedDocument });
        try { 
            dt = await DeliveryOrder.monitorUpload();
            uploadedDocument.do = dt.deliveryOrderQty;
            uploadedDocument.proformaInvoice = dt.proformaInvoiceQty;
            this.setState({uploadedDocument: uploadedDocument});
        } catch(e) {
            
        }
    }
    
    render () {
        return (
            <>
                <Container>
                    <h5 className="font-weight-bold">
                        <GeneralTranslation slug="today" />
                    </h5>
                    <Row className="mt-3">
                        <Col lg="3" md="6" xs="12" className="mb-3">
                            <SummaryCard
                                title={
                                    <>
                                        <GeneralTranslation
                                            slug="upload"
                                            className="mr-1"
                                        />
                                        <GeneralTranslation slug="do" />
                                    </>
                                }
                                description={this.state.uploadedDocument.do}
                            />
                        </Col>
                        <Col lg="4" md="6" xs="12">
                            <SummaryCard
                                title={
                                    <>
                                        <GeneralTranslation
                                            slug="upload"
                                            className="mr-1"
                                        />
                                        <GeneralTranslation slug="proformaInvoice" />
                                    </>
                                }
                                description={this.state.uploadedDocument.proformaInvoice}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="d-flex col-12 col-md-10 align-items-center">
                            <TimeMilestone onClick={this.periodOnChange} />
                        </Col>
                        <Col className="col-12 d-md-none d-block h-6px"></Col>
                        <Col className="d-flex col-12 col-md-2 justify-content-end align-items-center">
                            <ExportButton />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col lg="3" md="6" xs="12" className="mb-3">
                            <SummaryCard
                                title={<GeneralTranslation slug="active" />}
                                description={this.state.transaction.actived}
                                imageName="inProgress.svg"
                            />
                        </Col>
                        <Col lg="3" md="6" xs="12" className="mb-3">
                            <SummaryCard
                                title={<GeneralTranslation slug="completed" />}
                                description={this.state.transaction.completed}
                                imageName="completed.svg"
                            />
                        </Col>
                        <Col lg="3" md="6" xs="12" className="mb-3">
                            <SummaryCard
                                title={<GeneralTranslation slug="rejected" />}
                                description={this.state.transaction.rejected}
                                imageName="rejected.svg"
                            />
                        </Col>
                        <Col lg="3" md="6" xs="12">
                            <SummaryCard
                                title={<GeneralTranslation slug="totalOrder" />}
                                description={this.state.transaction.total}
                                imageName="totbag.svg"
                            />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="mb-3">
                            <JobTable />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs="12" md="6" lg="5">
                            <SummaryChart period={this.state.period} />
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
                </Container>
            </>
        );
    }
}
