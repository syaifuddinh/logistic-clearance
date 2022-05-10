import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { GologsButton } from "../../../../../components/Button/Loadable";
import { HorizontalLine } from "../../../../../components/Line/HorizontalLine/Loadable";
import NumberFormat from "react-number-format";

interface IProps {
    data: any;
    invoice?: any;
}

export default class ProformaInvoice extends React.Component<IProps> {
    
    downloadProformaInvoice = () => {
        
    };

    render() {
        return (
            <Container className="px-2 py-3" fluid>
                <Row className="mb-3">
                    <Col xs={12} md={4}>
                        <GeneralTranslation
                            className="text-capitalize font-weight-light-bolder fs-18px"
                            slug="proformaInvoice"
                        />
                    </Col>

                    <Col xs={12} md={8} className="mt-16px md-mt-0px">
                        <div className="row ml-0px float-right">
                            <GologsButton
                                size="extra-small"
                                variant="success"
                                onClick={this.downloadProformaInvoice}
                                content={
                                    <>
                                        <GeneralTranslation
                                            slug="download"
                                            className="font-weight-light-bolder fs-12px mr-1"
                                        />
                                        <GeneralTranslation
                                            slug="proformaInvoice"
                                            className="font-weight-light-bolder fs-12px text-capitalize mr-2"
                                        />
                                    </>
                                }
                                icon="download.svg"
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <div className="fs-24px font-weight-light-bolder text-primary-gray">
                            <GeneralTranslation slug="proformaInvoice" />
                            <span> - </span>
                            <span>{this.props.data.customsOfficeLabel}</span>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs={12} md={6} className="pl-5">
                        <div className="fs-18px text-black pl-2">
                            <GeneralTranslation slug="claim" className="mr-1" />
                            <GeneralTranslation
                                slug="customClearance.name"
                                className="mr-1"
                            />
                            <span>{this.props.data.customsOfficeLabel}</span>
                        </div>
                    </Col>
                </Row>

                <HorizontalLine className="mt-2" />

                <Row className="mt-1 mb-2 d-flex align-items-center">
                    <Col xs={12} md={6}>
                        <div className="fs-18px text-black pl-2">
                            <GeneralTranslation slug="subtotal" />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="fs-24px text-black pl-2 d-flex justify-content-end">
                            <NumberFormat
                                value={this.props.invoice.primarySubtotal}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                            />
                        </div>
                    </Col>
                </Row>

                <HorizontalLine />

                <Row className="mt-2">
                    <Col xs={12}>
                        <div className="fs-18px font-weight-light-bolder text-primary-gray">
                            <GeneralTranslation
                                slug="proformaInvoice"
                                className="mr-1"
                            />
                            <GeneralTranslation
                                slug="customClearance.name"
                                className="mr-1"
                            />
                            <span> - GOLOGS PLATFORM</span>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs={12}>
                        <div className="fs-16px text-third-gray">
                            <GeneralTranslation
                                slug="platformServiceFee"
                                className="mr-1"
                            />
                            <span> : </span>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs={12} md={6} className="pl-5">
                        <div className="fs-18px text-black pl-2">
                            <GeneralTranslation slug="customClearance.service" />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="fs-18px text-black pl-2 float-right">
                            <NumberFormat
                                value={this.props.invoice.serviceFee}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col xs={12} md={6} className="pl-5">
                        <div className="fs-18px text-black pl-2">
                            <GeneralTranslation slug="vat" className="mr-1" />
                            <span>10%</span>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="fs-18px text-black pl-2 float-right">
                            <NumberFormat
                                value={this.props.invoice.vat}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                            />
                        </div>
                    </Col>
                </Row>

                <HorizontalLine className="mt-2" />

                <Row className="mt-3 mb-2 d-flex align-items-center">
                    <Col xs={12} md={6}>
                        <div className="fs-18px text-black pl-2">
                            <GeneralTranslation slug="subtotal" />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="fs-24px text-black pl-2 float-right">
                            <NumberFormat
                                value={this.props.invoice.secondarySubtotal}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3 bg-secondary-gray d-flex align-items-center py-2">
                    <Col
                        xs={12}
                        md={6}
                        className="font-weight-light-bolder fs-32px"
                    >
                        <div className="text-black">
                            <GeneralTranslation slug="total" />
                        </div>
                    </Col>
                    <Col
                        xs={12}
                        md={6}
                        className="font-weight-light-bolder fs-32px"
                    >
                        <div className="text-black pl-2 float-right">
                            <NumberFormat
                                value={this.props.invoice.grandtotal}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
