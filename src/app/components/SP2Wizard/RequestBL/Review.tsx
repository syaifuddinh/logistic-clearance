import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { GeneralTranslation } from "../../Translation/Loadable";
import { HorizontalLine } from "../../Line/HorizontalLine/Loadable";
import GologsTable from "../../Table/GologsTable";
import moment from "moment";

interface IProps {
    containers?: any;
    paidThru?: any;
    cargoOwnerTaxId?: any;
    cargoOwnerName?: any;
    forwarderTaxId?: any;
    forwarderName?: any;
    typeTransaction?: any;
    terminalOperator?: any;
    blNumber?: any;
    documentType?: any;
    sppbNumber?: any;
    pibNumber?: any;
    doNumber?: any;
    pibDate?: any;
    sppbDate?: any;
    doDate?: any;
    date?: any;
    notifyEmails?: any;
    showStatusContainerColumn?: boolean;
}

class Review extends Component<IProps> {
    state = {
        table: { 
            columnDefs: [],
            columns: [],
            data: []
        }
    }

    componentDidMount() {
        let table:any = this.state.table
        table.columnDefs.push({ title:  ""  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="mblAwbNumber" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="vesselId" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="vesselName" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="voyageNumber" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerNumber" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerSize" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerType" />  })
        if (this.props.showStatusContainerColumn === true) {
            table.columnDefs.push({
                title: <GeneralTranslation slug="containerStatus" />
            });
        }

        table.columns.push({
            data: "action",
            className:"text-center"
        });
        table.columns.push({
            data: "mbl",
            className: "font-weight-light-bold text-primary-gray"
        });
        table.columns.push({
            data: "vesselNumber",
            className: "font-weight-light-bold text-primary-gray"
        });
        table.columns.push({
            data: "vesselName",
            className: "font-weight-light-bold text-primary-gray"
        });
        table.columns.push({
            data: "voyageNumber",
            className: "font-weight-light-bold text-primary-gray"
        });
        table.columns.push({
            data: "containerNumber",
            className: "font-weight-light-bold text-primary-gray"
        });
        table.columns.push({
            data: "containerSize",
            className: "font-weight-light-bold text-primary-gray"
        });
        table.columns.push({
            data: "containerType",
            className: "font-weight-light-bold text-primary-gray"
        });
        if (this.props.showStatusContainerColumn === true) {
            table.columns.push({
                data: "statusName",
                className: "font-weight-light-bold text-primary-gray"
            });
        }

        table.data = this.props.containers
        table.data = table.data.map((v) => {
            v.action = "";
            return v
        })

        this.setState({table : table})
    }

    

    render() {
        return (
            <Container fluid>
                <Form className="mt-5 col-md-12 pb-4">
                    <Row>
                        <Col
                            xs="12"
                            md="5"
                            className="md-border-right-1px border-muted mr-4 mb-15px md-mb-0px"
                        >
                            <Row className="mb-3">
                                <Col xs="12" md="5">
                                    <GeneralTranslation
                                        slug="cargoOwnerTaxId"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                </Col>
                                <Col xs="12" md="7">
                                    <span className="fs-16px">
                                        {this.props.cargoOwnerTaxId}
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="5">
                                    <GeneralTranslation
                                        slug="cargoOwnerCompanyName"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                </Col>
                                <Col xs="12" md="7">
                                    <span className="fs-16px">
                                        {this.props.cargoOwnerName}
                                    </span>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs="12" md="6">
                            <Row className="mb-3">
                                <Col xs="12" md="5">
                                    <GeneralTranslation
                                        slug="forwarderTaxId"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                </Col>
                                <Col xs="12" md="7">
                                    <span className="fs-16px">
                                        {this.props.forwarderTaxId ? this.props.forwarderTaxId : "-"}
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="5">
                                    <GeneralTranslation
                                        slug="forwarderName"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                </Col>
                                <Col xs="12" md="7">
                                    <span className="fs-16px">
                                        {this.props.forwarderName ? this.props.forwarderName : "-"}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <HorizontalLine className="mt-4" />

                    <table className="w-100">
                        <tbody>
                            <tr className="border-bottom">
                                <td className="py-4 pl-0" colSpan={3}>
                                    <div className="row ml-0px">
                                        <div className="md-w-33 w-100 mb-16px md-mb-0px">
                                            <span>
                                                <GeneralTranslation
                                                    slug="terminalOperator"
                                                    className="fs-12px font-weight-light-bolder text-primary-gray"
                                                />
                                            </span>
                                            <div className="fs-16px mt-1">
                                                {this.props.terminalOperator}
                                            </div>
                                        </div>

                                        <div className="md-w-33 w-100">
                                            <span>
                                                <GeneralTranslation
                                                    slug="typeTransaction"
                                                    className="fs-12px font-weight-light-bolder text-primary-gray"
                                                />
                                            </span>
                                            <div className="fs-16px mt-1">
                                                {this.props.typeTransaction}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr className="border-bottom">
                                <td
                                    className="md-w-33 w-100  py-4 pl-0"
                                    colSpan={3}
                                >
                                    <div className="row ml-0px">
                                        <div className="md-w-33 w-100 mb-16px md-mb-0px">
                                            <GeneralTranslation
                                                slug="blNumber"
                                                className="fs-12px font-weight-light-bolder text-primary-gray"
                                            />
                                            <div className="fs-16px mt-1">
                                                {this.props.blNumber}
                                            </div>
                                        </div>

                                        <div className="md-w-33 w-100">
                                            <GeneralTranslation
                                                slug="blDate"
                                                className="fs-12px font-weight-light-bolder text-primary-gray"
                                            />
                                            <div className="fs-16px mt-1">
                                                {this.props.date
                                                    ? moment(
                                                          this.props.date
                                                      ).format("DD-MM-YYYY")
                                                    : ""}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td
                                    className="py-4 pl-0 align-top border-right"
                                    rowSpan={3}
                                >
                                    <GeneralTranslation
                                        slug="documentType"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.documentType.label
                                            ? this.props.documentType.label
                                            : ""}
                                    </div>
                                </td>
                                <td className="py-4 pl-3 border-bottom border-right">
                                    <GeneralTranslation
                                        slug="sppbNumber"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.sppbNumber}
                                    </div>
                                </td>
                                <td className="py-4 pl-3 border-bottom border-right">
                                    <GeneralTranslation
                                        slug="sppbDate"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.sppbDate
                                            ? moment(
                                                  this.props.sppbDate
                                              ).format("DD-MM-YYYY")
                                            : ""}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-4 border-bottom border-right pl-3">
                                    <GeneralTranslation
                                        slug="pibNumber"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.pibNumber}
                                    </div>
                                </td>
                                <td className="py-4 border-bottom border-right pl-3">
                                    <GeneralTranslation
                                        slug="pibDate"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.pibDate
                                            ? moment(this.props.pibDate).format(
                                                  "DD-MM-YYYY"
                                              )
                                            : ""}
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-4 border-bottom border-right pl-3">
                                    <GeneralTranslation
                                        slug="doNumber"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.doNumber ? this.props.doNumber : "-"}
                                    </div>
                                </td>
                                <td className="py-4 border-bottom border-right pl-3">
                                    <GeneralTranslation
                                        slug="doExpiredDate"
                                        className="fs-12px font-weight-light-bolder text-primary-gray"
                                    />
                                    <div className="fs-16px mt-1">
                                        {this.props.doDate
                                            ? moment(this.props.doDate).format(
                                                  "DD-MM-YYYY"
                                              )
                                            : "-"}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <HorizontalLine className="my-4" />

                    <span>
                        <Row className="mb-2">
                            <Form.Label as={Col} sm={4}>
                                <GeneralTranslation
                                    slug="selectedContainer"
                                    className="fs-18px"
                                />
                            </Form.Label>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={12}>
                                {this.state.table.columnDefs.length > 0 && (
                                    <GologsTable
                                        hideNumbering={true}
                                        hideSearch={true}
                                        theadVariant="secondary"
                                        columnDefs={this.state.table.columnDefs}
                                        data={this.state.table.data}
                                        columns={this.state.table.columns}
                                    />
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Form.Label as={Col} sm={4}>
                                <GeneralTranslation
                                    slug="paidThru"
                                    className="font-weight-light-bolder text-primary-gray fs-12px"
                                />
                            </Form.Label>
                            <Form.Label as={Col} sm={4} />
                        </Row>
                        <Row className="mt-1">
                            <Form.Label as={Col} sm={4} className="fs-16px">
                                {this.props.paidThru
                                    ? moment(this.props.paidThru).format(
                                          "DD-MM-YYYY"
                                      )
                                    : "-"}
                            </Form.Label>
                            <Form.Label as={Col} sm={4} />
                        </Row>

                        <Row className="mt-1">
                            <Form.Label as={Col} sm={4}>
                                <GeneralTranslation
                                    slug="inviteAndNotifyPeople"
                                    className="font-weight-light-bolder text-primary-gray fs-12px"
                                />
                            </Form.Label>
                            <Form.Label as={Col} sm={4} />
                        </Row>
                        <Row className="mt-1">
                            <Form.Label as={Col} sm={6} className="fs-16px">
                                {this.props.notifyEmails ? this.props.notifyEmails : "-"}
                            </Form.Label>
                            <Form.Label as={Col} sm={6} />
                        </Row>
                    </span>
                </Form>
            </Container>
        );
    }
}

export default Review;
