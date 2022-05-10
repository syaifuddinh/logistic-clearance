import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsInput from "../../../../../components/Input/GologsInput";
import { GologsButton } from "../../../../../components/Button/Loadable";
import Dropfile from "../../../../../components/Dropfile/Dropfile";
import { TableInput } from "../../../../../components/Input/Table/Loadable";
import moment from "moment";

type IProps = {
    data: any;
    files: any;
}

export default class Review extends React.Component<IProps> {
    state = {
        data: {},
        tableHead: [
            {
                labelSlug: "field.hsCode",
                key: "hsCode"
            },
            {
                labelSlug: "field.itemName",
                key: "itemName"
            },
            {
                labelSlug: "field.qty",
                key: "qty"
            },
        ]
    }
    
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="cargoOwnerOrCustomerTaxId"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.cargoOwnerOrCustomerTaxId
                                ? this.props.data.cargoOwnerOrCustomerTaxId
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="ppjkTaxId"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.ppjkTaxId
                                ? this.props.data.ppjkTaxId
                                : "-"}
                        </div>
                    </Col>

                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="cargoOwnerOrCustomerNib"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.cargoOwnerOrCustomerNib
                                ? this.props.data.cargoOwnerOrCustomerNib
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="ppjkNib"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.ppjkNib
                                ? this.props.data.ppjkNib
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="emailNotification"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.emailNotification
                                ? this.props.data.emailNotification
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="phoneNotification"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.phoneNotification
                                ? this.props.data.phoneNotification
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="customerDetail" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="documentType"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.documentTypeLabel
                                ? this.props.data.documentTypeLabel
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="customsOffice"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.customsOfficeLabel
                                ? this.props.data.customsOfficeLabel
                                : "-"}
                        </div>
                    </Col>

                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="requestDate"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.requestDate
                                ? moment(this.props.data.requestDate).format(
                                      "DD-MM-YYYY"
                                  )
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="pibType"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.pibTypeLabel
                                ? this.props.data.pibTypeLabel
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="importType"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.importTypeLabel
                                ? this.props.data.importTypeLabel
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="paymentMethod"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.paymentMethodLabel
                                ? this.props.data.paymentMethodLabel
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="blNumber"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.blNumber
                                ? this.props.data.blNumber
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="blDate"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.blDate
                                ? moment(this.props.data.blDate).format(
                                      "DD-MM-YYYY"
                                  )
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="sender" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.senderName
                                ? this.props.data.senderName
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="address"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.senderAddress
                                ? this.props.data.senderAddress
                                : "-"}
                        </div>
                    </Col>
                </Row>


                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="seller" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.sellerName
                                ? this.props.data.sellerName
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="address"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.sellerAddress
                                ? this.props.data.sellerAddress
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="importir" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.importirName
                                ? this.props.data.importirName
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="address"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.importirAddress
                                ? this.props.data.importirAddress
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="cargoOwner" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.cargoOwnerName
                                ? this.props.data.cargoOwnerName
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="address"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.cargoOwnerAddress
                                ? this.props.data.cargoOwnerAddress
                                : "-"}
                        </div>
                    </Col>
                </Row>


                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="portOfLoading" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="code"
                            className="text-capitalize fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.portOfLoadingCode
                                ? this.props.data.portOfLoadingCode
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.portOfLoadingName
                                ? this.props.data.portOfLoadingName
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="portOfTransit" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="code"
                            className="text-capitalize fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.portOfTransitCode
                                ? this.props.data.portOfTransitCode
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.portOfTransitName
                                ? this.props.data.portOfTransitName
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="portOfDestination" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="code"
                            className="text-capitalize fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.portOfDestinationCode
                                ? this.props.data.portOfDestinationCode
                                : "-"}
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="name"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.portOfDestinationName
                                ? this.props.data.portOfDestinationName
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs="12" md="12">
                        <h5>
                            <GeneralTranslation slug="additional" />
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="registrationNumber"
                            className="text-capitalize fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.registrationNumber
                                ? this.props.data.registrationNumber
                                : "-"}
                        </div>
                    </Col>

                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="registrationDate"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.registrationDate
                                ? moment(this.props.data.registrationDate).format(
                                      "DD-MM-YYYY"
                                  )
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="moda"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.modaType
                                ? this.props.data.modaType
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="voyageNumber"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.voyageNumber
                                ? this.props.data.voyageNumber
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="voyageName"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.voyageName
                                ? this.props.data.voyageName
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="estimatedTimeArrival"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.estimatedTimeArrival
                                ? moment(this.props.data.estimatedTimeArrival).format(
                                      "DD-MM-YYYY"
                                  )
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="field.invoiceNumber"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.invoiceNumber
                                ? this.props.data.invoiceNumber
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="field.kmdTransactionNumber"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.kmdTransactionNumber
                                ? this.props.data.kmdTransactionNumber
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="field.documentNumber"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.documentNumber
                                ? this.props.data.documentNumber
                                : "-"}
                        </div>
                    </Col>
                    
                    <Col xs="12" md="6">
                        <GeneralTranslation
                            slug="field.documentDate"
                            className="fs-12px font-weight-light-bolder text-primary-gray"
                        />

                        <div className="fs-16px">
                            {this.props.data.documentDate
                                ? moment(this.props.data.documentDate).format(
                                      "DD-MM-YYYY"
                                  )
                                : "-"}
                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <div className="col-md-12">
                        <h5 className="mb-3">
                            <GeneralTranslation slug="document" />
                        </h5>
                    </div>

                    <div className="col-md-12">
                        <Row>
                            <div className="mb-16px md-mb-0px col-lg-6 col-md-12">
                                <p>
                                    <GeneralTranslation slug="packingList" />
                                </p>
                                <Dropfile
                                    hideRemoveButton={true}
                                    isPreview={true}
                                    fileName={
                                        this.props.files.packingList.fileName
                                    }
                                    file={this.props.files.packingList.file}
                                />
                            </div>

                            <div className="mb-16px md-mb-0px col-lg-6 col-md-12">
                                <p>
                                    <GeneralTranslation
                                        slug="invoice"
                                        className="text-capitalize"
                                    />
                                </p>
                                <Dropfile
                                    hideRemoveButton={true}
                                    isPreview={true}
                                    fileName={this.props.files.invoice.fileName}
                                    file={this.props.files.invoice.file}
                                />
                            </div>
                        </Row>

                        <Row className="mt-2">
                            <div className="mb-16px md-mb-0px col-lg-6 col-md-12">
                                <p>
                                    <GeneralTranslation slug="blOrAwb" />
                                </p>
                                <Dropfile
                                    hideRemoveButton={true}
                                    isPreview={true}
                                    fileName={this.props.files.bl.fileName}
                                    file={this.props.files.bl.file}
                                />
                            </div>
                        </Row>
                    </div>
                </Row>

                <Row className="mt-5">
                    <div className="col-md-12">
                        <h5 className="mb-3">
                            <GeneralTranslation slug="field.items" />
                        </h5>

                        <TableInput
                            tableHead={this.state.tableHead}
                            data={this.props.data.items}
                            isPreview={true}
                        />
                    </div>
                </Row>
            </Container>
        );
    }
}