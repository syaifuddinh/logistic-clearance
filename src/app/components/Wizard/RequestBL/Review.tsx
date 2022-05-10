import React, { Component } from "react";
import HeaderItem from "./HeaderItem";
import { Form, Col, Row } from "react-bootstrap";
import { TitleView, TextView } from "../../../../styles/Wizard";
import Dropfile from "../../Dropfile/Dropfile";
import GologsTable from "../../Table/GologsTable";
import { GeneralTranslation } from "../../Translation/Loadable";
import { RedAsterisk } from "../../RedAsterisk/Loadable";
import Gologs from "../../../../model/Gologs";

interface IProps {
    data?: any;
}

export default class Review extends Component<IProps> {
    state = {
        blFile: null,
        suratKuasaFile: null,
        suratKontainerFile: null,
        letterIndemnityFile: null,
        blFileDocument: null,
        suratKuasaFileDocument: null,
        suratKontainerFileDocument: null,
        letterIndemnityFileDocument: null,
        containerColumnDefs: [
            {
                title: (
                    <GeneralTranslation slug="containerNumber" />
                )
            },
            {
                title: <GeneralTranslation slug="sealNumber" />
            },
            {
                title: <GeneralTranslation slug="sizeType" />
            },
            {
                title: (
                    <GeneralTranslation slug="containerType" />
                )
            },
            {
                title: (
                    <GeneralTranslation slug="loadType" />
                )
            }
        ],
        containerColumns: [
            { data: "containerNumber" },
            { data: "sealNumber" },
            { data: "sizeType" },
            { data: "containerType" },
            { data: "jenisMuat" }
        ]
    };

    constructor(props) {
        super(props);
        const cargoOwnerDo = window.localStorage.getItem(
            "cargoOwnerDo"
        );
        if (cargoOwnerDo) {
            const params = JSON.parse(cargoOwnerDo);

            this.changeState(
                "suratKuasaFile",
                params.suratKuasaFile
            );
            this.changeState("blFile", params.blFile);
            this.changeState(
                "suratKontainerFile",
                params.suratKontainerFile
            );
            this.changeState(
                "letterIndemnityFile",
                params.letterIndemnityFile
            );

            this.changeState(
                "suratKuasaFileDocument",
                params.suratKuasaFileDocument
            );
            this.changeState(
                "blFileDocument",
                params.blFileDocument
            );
            this.changeState(
                "suratKontainerFileDocument",
                params.suratKontainerFileDocument
            );
            this.changeState(
                "letterIndemnityFileDocument",
                params.letterIndemnityFileDocument
            );
        }
    }

    changeState = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    };

    LabelContainer = () => {
        return (
            <Form className="mt-5 col-md-12">
                <Row>
                    <Form.Label column sm={3}>
                        Container No
                    </Form.Label>
                    <Form.Label column sm={3}>
                        Seal No
                    </Form.Label>
                    <Form.Label column sm={3}>
                        Size Type
                    </Form.Label>
                    <Form.Label column sm={3}>
                        Container Type
                    </Form.Label>
                </Row>
            </Form>
        );
    };

    ItemContainer = (props: IProps) => {
        return (
            <Form className="col-md-12">
                <Row>
                    <Form.Label column sm={3}>
                        {this.props.data
                            ? props.data.container_no
                            : ""}{" "}
                    </Form.Label>
                    <Form.Label column sm={3}>
                        {this.props.data
                            ? props.data.noSeal
                            : ""}
                    </Form.Label>
                    <Form.Label column sm={3}>
                        {this.props.data
                            ? props.data.container_size
                            : ""}
                    </Form.Label>
                    <Form.Label column sm={3}>
                        {this.props.data
                            ? props.data.container_type
                            : ""}
                    </Form.Label>
                </Row>
            </Form>
        );
    };

    Containers = (props: IProps) =>
        props.data
            ? props.data.map((key, i) => (
                    <this.ItemContainer key={i} data={key} />
                ))
            : "";

    render() {
        return (
            <>
                <Form className="col-md-12 mt-5 ml-3">
                    <Form.Row className="ml-2">
                        <Form.Group as={Col} sm={12}>
                            <h5>
                                <GeneralTranslation slug="shippingLine" />
                            </h5>
                            <div className="row ml-0px">
                                <div className="md-w-400px mr-10px w-100 md-mb-0px mb-10px">
                                    <TitleView>
                                        <GeneralTranslation slug="shippingLine" />
                                    </TitleView>
                                    <TextView>
                                        {this.props.data.SLName}
                                    </TextView>
                                </div>

                                <div className="md-w-300px w-100">
                                    <TitleView>
                                        <GeneralTranslation slug="wizard.bottom.shippingLineEmail" />
                                    </TitleView>
                                    <TextView>
                                        {this.props.data.email}
                                    </TextView>
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} sm={2} />
                    </Form.Row>

                    <Form.Row className="ml-2">
                        <Form.Group as={Col} sm={4}>
                            <h5>
                                <GeneralTranslation slug="wizard.bottom.reviewRequest" />
                            </h5>
                        </Form.Group>
                    </Form.Row>

                    <Row className="border-bottom ml-1 mr-5">
                        <Col md="6">
                            <h6 className="font-weight-bold">
                                {this.props.data.SLName}
                            </h6>
                        </Col>
                        <Col md="6">
                            <Row>
                                <Col lg="6">
                                    <h6 className="font-weight-bold">
                                        Delivery Order
                                    </h6>
                                    <h6>
                                        -
                                    </h6>
                                </Col>
                                <Col lg="6">
                                    <h6 className="font-weight-bold">
                                        <GeneralTranslation slug="blNumber" />
                                    </h6>
                                    <h6>
                                        {
                                            this.props.data
                                                .blNumber
                                        }
                                    </h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-3  ml-1 mr-5">
                        <Col
                            md="6"
                            className="md-border-right-1px border-right-0px"
                        >
                            <div className="py-4 border-bottom mx-2 h-169p md-h-159px">
                                <HeaderItem
                                    offset={2}
                                    title={
                                        <GeneralTranslation slug="shipperExporter" />
                                    }
                                    description={
                                        this.props.data.shipper
                                    }
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="border-bottom ml-1 mr-5 h-169p md-h-159px">
                                <Row className="py-2 ">
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="doNumber" />
                                            }
                                            description={
                                                this.props.data
                                                    .deliveryOrderNumber ? this.props.data
                                                    .deliveryOrderNumber : "-" 
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="doExpiredDate" />
                                            }
                                            description="-"
                                        />
                                    </Col>
                                </Row>

                                <Row className="py-2">
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="vessel" />
                                            }
                                            description={
                                                this.props.data
                                                    .vessel
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="voyageNumber" />
                                            }
                                            description={
                                                this.props.data
                                                    .voyageNumber
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row className=" ml-1 mr-5">
                        <Col
                            md="6"
                            className="md-border-right-1px border-right-0px"
                        >
                            <div
                                className="py-4 border-bottom mx-2"
                                style={{ height: "42mm" }}
                            >
                                <HeaderItem
                                    offset={2}
                                    title={
                                        <GeneralTranslation slug="consignee" />
                                    }
                                    description={
                                        this.props.data.consignee
                                    }
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div
                                className="border-bottom  ml-1 mr-5"
                                style={{ height: "42mm" }}
                            >
                                <Row className="py-2 ">
                                    <Col md="12">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="portOfLoading" />
                                            }
                                            description={
                                                this.props.data
                                                    .portOfLoading
                                            }
                                        />
                                    </Col>
                                </Row>

                                <Row className="py-2">
                                    <Col md="12">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="portOfDischarge" />
                                            }
                                            description={
                                                this.props.data
                                                    .portOfDischarge
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row className=" ml-1 mr-5">
                        <Col
                            md="6"
                            className="md-border-right-1px border-right-0px"
                        >
                            <div
                                className="py-4 mx-2"
                                style={{ height: "42mm" }}
                            >
                                <HeaderItem
                                    offset={2}
                                    title={
                                        <GeneralTranslation slug="notifyParty" />
                                    }
                                    description={
                                        this.props.data.notifyParty ? this.props.data.notifyParty : "-"
                                    }
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div
                                className=" ml-1 mr-5"
                                style={{ height: "42mm" }}
                            >
                                <Row className="py-2 ">
                                    <Col md="12">
                                        <HeaderItem
                                            offset={2}
                                            title={
                                                <GeneralTranslation slug="portOfDelivery" />
                                            }
                                            description={
                                                this.props.data
                                                    .portOfDischarge
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Form className="col-md-12">
                        <h6 className="mt-3 mb-3">
                            <GeneralTranslation slug="containerInformation" />
                        </h6>
                        <div className="pr-5">
                            <GologsTable
                                hideSearch={true}
                                hideNumbering={true}
                                columnColor="grey"
                                columnDefs={
                                    this.state
                                        .containerColumnDefs
                                }
                                data={
                                    this.props.data
                                        .dataContainers
                                }
                                columns={
                                    this.state.containerColumns
                                }
                            />
                        </div>
                    </Form>

                    <Form className="col-md-12">
                        <h5 className="mt-3 mb-3">
                            <GeneralTranslation slug="document" />
                        </h5>
                        <Form.Row>
                            <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                className="md-pr-15px"
                            >
                                <Form.Label>
                                    MBL/HBL File
                                    <RedAsterisk />
                                </Form.Label>
                                <Dropfile
                                    hideRemoveButton={true}
                                    isPreview={true}
                                    fileName={Gologs.renameFile(
                                        this.props.data
                                            .blFileDocumentName
                                    )}
                                    file={
                                        this.props.data
                                            .blFileDocument
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                className="md-pl-15px"
                            >
                                <Form.Label>
                                    Letter of Indemnity
                                </Form.Label>
                                <Dropfile
                                    hideRemoveButton={true}
                                    isPreview={true}
                                    fileName={Gologs.renameFile(
                                        this.props.data
                                            .letterIndemnityFileDocumentName
                                    )}
                                    file={
                                        this.props.data
                                            .letterIndemnityFileDocument
                                    }
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="mt-3">
                            <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                className="md-pr-15px"
                            >
                                <Form.Label>
                                    Surat Peminjaman Kontainer
                                    File
                                </Form.Label>
                                <Dropfile
                                    fileName={Gologs.renameFile(
                                        this.props.data
                                            .suratKontainerFileDocumentName
                                    )}
                                    file={
                                        this.props.data
                                            .suratKontainerFileDocument
                                    }
                                    hideRemoveButton={true}
                                    isPreview={true}
                                />
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                className="md-pl-15px"
                            >
                                <Form.Label>
                                    Surat Kuasa File
                                </Form.Label>
                                <Dropfile
                                    fileName={Gologs.renameFile(
                                        this.props.data
                                            .suratKuasaFileDocumentName
                                    )}
                                    file={
                                        this.props.data
                                            .suratKuasaFileDocument
                                    }
                                    hideRemoveButton={true}
                                    isPreview={true}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>

                    <Form.Row className="ml-3 mt-3">
                        <Form.Group as={Col} sm={6}>
                            <h5>
                                <GeneralTranslation slug="inviteAndNotifyPeople" />
                            </h5>
                            <TitleView>
                                <GeneralTranslation slug="emailAddress" />
                            </TitleView>
                            <TextView>
                                {this.props.data.notifyEmail}
                            </TextView>
                        </Form.Group>
                        <Form.Group as={Col} sm={2} />
                    </Form.Row>
                </Form>
            </>
        );
    }
}
