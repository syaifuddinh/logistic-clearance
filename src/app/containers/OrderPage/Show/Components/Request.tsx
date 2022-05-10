import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import HeaderItem from "./HeaderItem";
import GologsTable from "../../../../components/Table/GologsTable";
import { translations } from "../../../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import Dropfile from "../../../../components/Dropfile/Dropfile";
import { GologsButton } from "../../../../components/Button/Loadable";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";

interface Props {
    data?: any;
    containers?: any;
    blFile?: string;
    suratKuasaFile?: string;
    letterOfIndemnityFile?: string;
    suratPeminjamanFile?: string;
    showActionButton?: boolean;
    showNotifyPeopleOnBottom?: boolean;
    onSubmit?:any;
    onReject?:any;
};

export default function Request(props: Props) {
    const { t } = useTranslation();

    const [blFileName, setBlFileName] = useState("BL.pdf");
    const [letterIndemnityFileName, setLetterIndemnityFileName] = useState("Letter Indemnity.pdf");
    const [suratKontainerFileName, setSuratKontainerFileName] = useState("Surat Peminjaman Kontainer.pdf");
    const [suratKuasaFileName, setSuratKuasaFileName] = useState("Surat Kuasa.pdf");

    const [blFileShowLoading, setBlFileShowLoading] = useState(false);
    const [
        letterIndemnityFileShowLoading,
        setLetterIndemnityFileShowLoading
    ] = useState(false);
    const [
        suratKontainerFileShowLoading,
        setSuratKontainerFileShowLoading
    ] = useState(false);


    const columnDefs = [
        { title: t(translations.entities.general.containerNumber) },
        { title: t(translations.entities.general.sealNumber) },
        { title: t(translations.entities.general.sizeType) },
        { title: t(translations.entities.general.containerType) },
        { title: t(translations.entities.general.loadType) }
    ];

    const columns = [
        { data: "containerNumber" },
        { data: "sealNumber" },
        { data: "sizeType" },
        { data: "containerType" },
        { data: "jenisMuat" }
    ];

    return (
        <>
            <div className="w-100">
                <Col xs="12" className="bg-white p-4">
                    <Row className="border-bottom">
                        <Col md="6">
                            <h6 className="font-weight-semi-bolder">
                                {props.data.shippingLineName}
                            </h6>
                        </Col>
                        <Col md="6">
                            <Row>
                                <Col md="6">
                                    <h6 className="font-weight-bold">
                                        Delivery Order
                                    </h6>
                                    <h6>
                                        {props.data.deliveryOrderNumber
                                            ? props.data.deliveryOrderNumber
                                            : "-"}
                                    </h6>
                                </Col>
                                <Col md="6">
                                    <h6 className="font-weight-bold">
                                        {t(
                                            translations.entities.general
                                                .blNumber
                                        )}
                                    </h6>
                                    <h6>{props.data.billOfLadingNumber}</h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col
                            md="6"
                            className="md-md-border-right-1px border-right-0px-1px md-border-right-1px border-right-0px-0px"
                        >
                            <div
                                className="py-4 md-border-bottom-1px border-bottom-0px mx-2"
                                style={{ height: "42mm" }}
                            >
                                <HeaderItem
                                    offset={2}
                                    title={t(
                                        translations.entities.general
                                            .shipperExporter
                                    )}
                                    description={props.data.shipper}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div
                                className="md-border-bottom-1px border-bottom-0px mx-1"
                                style={{ height: "42mm" }}
                            >
                                <Row className="py-2 ">
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .doNumber
                                            )}
                                            description={
                                                props.data.deliveryOrderNumber
                                                    ? props.data
                                                          .deliveryOrderNumber
                                                    : "-"
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .doExpiredDate
                                            )}
                                            description={
                                                props.data.doExpiredDate
                                                    ? props.data.doExpiredDate
                                                    : "-"
                                            }
                                        />
                                    </Col>
                                </Row>

                                <Row className="py-2">
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .vessel
                                            )}
                                            description={props.data.vessel}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .voyageNumber
                                            )}
                                            description={
                                                props.data.voyageNumber
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            md="6"
                            className="md-border-right-1px border-right-0px"
                        >
                            <div
                                className="py-4 md-border-bottom-1px border-bottom-0px mx-2"
                                style={{ height: "42mm" }}
                            >
                                <HeaderItem
                                    offset={2}
                                    title={t(
                                        translations.entities.general.consignee
                                    )}
                                    description={props.data.consignee}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div
                                className="md-border-bottom-1px border-bottom-0px mx-1"
                                style={{ height: "42mm" }}
                            >
                                <Row className="py-2 ">
                                    <Col md="12">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .portOfLoading
                                            )}
                                            description={
                                                props.data.portOfLoading
                                            }
                                        />
                                    </Col>
                                </Row>

                                <Row className="py-2">
                                    <Col md="12">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .portOfDischarge
                                            )}
                                            description={
                                                props.data.portOfDischarge
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
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
                                    title={t(
                                        translations.entities.general
                                            .notifyParty
                                    )}
                                    description={props.data.notifyPartyName ? props.data.notifyPartyName : "-"}
                                />
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="mx-1" style={{ height: "42mm" }}>
                                <Row className="py-2 ">
                                    <Col md="12">
                                        <HeaderItem
                                            offset={2}
                                            title={t(
                                                translations.entities.general
                                                    .portOfDelivery
                                            )}
                                            description={
                                                props.data.portOfDischarge
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <h5 className="mb-3">
                                {t(
                                    translations.entities.general
                                        .containerInformation
                                )}
                            </h5>

                            <GologsTable
                                hideSearch={true}
                                hideNumbering={true}
                                columnDefs={columnDefs}
                                data={props.containers}
                                columns={columns}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <h5 className="mb-3">
                                {t(translations.entities.general.document)}
                            </h5>
                        </Col>
                        <Col xs="12">
                            <Row>
                                <Col
                                    xs="12"
                                    lg="6"
                                    className="mb-16px md-mb-0px"
                                >
                                    <p>
                                        {t(
                                            translations.entities.general
                                                .mblHblFile
                                        )}
                                    </p>
                                    <Dropfile
                                        hideRemoveButton={true}
                                        showLoading={blFileShowLoading}
                                        isPreview={true}
                                        fileName={
                                            props.blFile ? blFileName : null
                                        }
                                        file={props.blFile}
                                    />
                                </Col>
                                <Col xs="12" lg="6">
                                    <p>
                                        {t(
                                            translations.entities.general
                                                .letterOfIndemnityFile
                                        )}
                                    </p>
                                    <Dropfile
                                        hideRemoveButton={true}
                                        showLoading={
                                            letterIndemnityFileShowLoading
                                        }
                                        isPreview={true}
                                        fileName={
                                            props.letterOfIndemnityFile
                                                ? letterIndemnityFileName
                                                : null
                                        }
                                        file={props.letterOfIndemnityFile}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col
                                    xs="12"
                                    lg="6"
                                    className="mb-16px md-mb-0px"
                                >
                                    <p>
                                        {t(
                                            translations.entities.general
                                                .suratPeminjamanKontainerFile
                                        )}
                                    </p>
                                    <Dropfile
                                        hideRemoveButton={true}
                                        showLoading={
                                            suratKontainerFileShowLoading
                                        }
                                        isPreview={true}
                                        fileName={
                                            props.suratPeminjamanFile
                                                ? suratKontainerFileName
                                                : null
                                        }
                                        file={props.suratPeminjamanFile}
                                    />
                                </Col>
                                <Col xs="12" lg="6">
                                    <p>
                                        {t(
                                            translations.entities.general
                                                .suratKuasaFile
                                        )}
                                    </p>
                                    <Dropfile
                                        hideRemoveButton={true}
                                        isPreview={true}
                                        fileName={
                                            props.suratKuasaFile
                                                ? suratKuasaFileName
                                                : null
                                        }
                                        file={props.suratKuasaFile}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {props.showNotifyPeopleOnBottom && (
                        <Row className="mt-5">
                            <Col xs="12">
                                <h5>
                                    <GeneralTranslation slug="inviteAndNotifyPeople" />
                                </h5>

                                <div className="fs-16px mt-3">
                                    {props.data.notifyPeople}
                                </div>
                            </Col>
                        </Row>
                    )}
                </Col>

                {props.showActionButton && (
                    <div className="my-4 pb-5 d-flex justify-content-end">
                        <GologsButton
                            content={<GeneralTranslation slug="reject" />}
                            variant="outline-secondary"
                            className="mr-2"
                            onClick={props.onReject}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
