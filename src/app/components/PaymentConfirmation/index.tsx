import React, { Component } from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { Col, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { CustomerServiceInfo } from "../CustomerServiceInfo/Loadable";
import { HorizontalLine } from "../Line/HorizontalLine/Loadable";
import { GologsButton } from "../Button/Loadable";

type IDetails = {
    name: string;
    amount: number;
};

type IProps = {
    subjectSlug: string;
    objectSlug: string;
    personName: string;
    jobNumber: string;
    date: string;
    paymentMethod: string;
    bankReferenceId: string;
    grandtotal: number;
    onDownloadReceipt: any;
    details: IDetails[];
};

export default class PaymentConfirmation extends Component<IProps> {    
    render() {
        return (
            <>
                <Row>
                    <Col xs={12} md={6}>
                        <GeneralTranslation
                            slug="paymentConfirmation"
                            className="fs-18px font-weight-light-bolder"
                        />
                        <div className="mt-5 fs-14px">
                            <div>
                                <GeneralTranslation
                                    slug="hi"
                                    className="mb-3 mr-1"
                                />
                                {this.props.personName},
                            </div>

                            <div className="mt-3">
                                <GeneralTranslation slug="instruction.paymentConfirmed" />
                                <GeneralTranslation
                                    slug={this.props.subjectSlug}
                                    className="ml-1"
                                />
                                .
                                <GeneralTranslation 
                                    slug="instruction.wait"
                                    className="ml-1"
                                />
                                <GeneralTranslation
                                    slug={this.props.objectSlug}
                                    className="ml-1"
                                />
                            </div>

                            <div className="mt-3">
                                <GeneralTranslation slug="responseMessage.serviceThankyou" />
                                .
                            </div>
                            <div className="mt-5 pt-5">
                                <CustomerServiceInfo />.
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="text-capitalize">
                        <div className="border-1 border-eighth-gray rounded-18px p-5 md-ml-15px">
                            <div>
                                <GeneralTranslation
                                    slug="receipt"
                                    className="fs-18px font-weight-light-bolder"
                                />
                            </div>

                            <Row className="mt-4 mb-1 fs-12px text-ninth-gray">
                                <Col xs="12" md="6" className="text-left">
                                    <GeneralTranslation slug="jobNumber" />
                                </Col>
                                <Col xs="12" md="6" className="text-right">
                                    <GeneralTranslation slug="dateAndTime" />
                                </Col>
                            </Row>
                            <Row className="mt-1 fs-12px text-black">
                                <Col xs="12" md="6" className="text-left">
                                    {this.props.jobNumber}
                                </Col>
                                <Col xs="12" md="6" className="text-right">
                                    {this.props.date}
                                </Col>
                            </Row>

                            <Row className="mt-4 mb-1 fs-12px text-ninth-gray">
                                <Col xs="12" md="6" className="text-left">
                                    <GeneralTranslation slug="paymentMethod" />
                                </Col>
                                <Col xs="12" md="6" className="text-right">
                                    <GeneralTranslation slug="bankReferenceId" />
                                </Col>
                            </Row>
                            <Row className="mt-1 fs-12px text-black">
                                <Col xs="12" md="6" className="text-left">
                                    {this.props.paymentMethod}
                                </Col>
                                <Col xs="12" md="6" className="text-right">
                                    {this.props.bankReferenceId}
                                </Col>
                            </Row>
                            <HorizontalLine className="mt-3" />
                            <Row className="mt-4 mb-1 fs-12px text-ninth-gray">
                                <Col xs="12" md="6" className="text-left">
                                    <GeneralTranslation slug="description" />
                                </Col>
                                <Col xs="12" md="6" className="text-right">
                                    <GeneralTranslation slug="amount" />
                                </Col>
                            </Row>
                            {this.props.details.map(v => (
                                <Row className="mt-1 fs-12px text-black">
                                    <Col xs="12" md="6" className="text-left">
                                        {v.name}
                                    </Col>
                                    <Col xs="12" md="6" className="text-right">
                                        <NumberFormat
                                            value={v.amount}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"Rp "}
                                        />
                                    </Col>
                                </Row>
                            ))}

                            <Row className="mt-3 fs-16px">
                                <Col xs="12" md="6" className="text-left">
                                    <GeneralTranslation
                                        slug="total"
                                        className="text-black"
                                    />
                                </Col>
                                <Col
                                    xs="12"
                                    md="6"
                                    className="text-primary text-right font-weight-light-bolder"
                                >
                                    <NumberFormat
                                        value={this.props.grandtotal}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"Rp "}
                                    />
                                </Col>
                            </Row>

                            <Row className="mt-5">
                                <Col
                                    xs="12"
                                    className="d-flex justify-content-center"
                                >
                                    <GologsButton
                                        size="extra-small"
                                        onClick={this.props.onDownloadReceipt}
                                        showLoading={true}
                                        variant="success"
                                        content={
                                            <>
                                                <GeneralTranslation
                                                    slug="download"
                                                    className="font-weight-light-bolder fs-12px mr-1"
                                                />
                                                <GeneralTranslation
                                                    slug="receipt"
                                                    className="font-weight-light-bolder fs-12px text-capitalize mr-2"
                                                />
                                            </>
                                        }
                                        icon="download.svg"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
        );  
    }
}