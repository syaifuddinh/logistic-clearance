import React from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button } from "react-bootstrap";

import { translations } from "../../../../../locales/i18n";
import { Sidebar } from "../../../../components/Sidebar/Loadable";
import Breadcrumb from "../../../../components/Breadcrumb/Breadcrumb";

export default function Show(props) {
    // const auth = useAuth();
    const { t } = useTranslation();
    const breadcrumbs = [
        {
            name: t(translations.sidebarMenu.masterData)
        },
        {
            name: t(translations.sidebarMenu.port)
        },
        {
            name: "Detail"
        }
    ];

    const back = () => {
        window.history.back();
    };

    // async function handleLogoutClick(event) {
    //   if (auth === null) return;
    //   await auth.signOut();
    //   await auth.userManager?.signoutCallback();
    // }

    // if (auth === null || auth.userData === null) {
    //   content = <Ellipsis />;
    // } else {
    let content;
    if (props.location.search.length > 0) {
        content = <Redirect to={"/"} />;
    } else {
    content = (
        <div className="gologs-container">
            <Container>
                <Row className="bg-white">
                    <Col className="px-3 pt-4  d-flex justify-content-between align-items-center">
                        <div className="d-inline-block">
                        <h4 className="font-weight-bold d-inline-block mb-0">
                            {t(translations.sidebarMenu.port)}
                        </h4>

                        <Breadcrumb items={breadcrumbs} />
                        </div>
                    </Col>
                </Row>

                <Row className="bg-white mt-3">
                    <Col className="px-3 p-4">
                        <Row className="w-100">
                            <Col sm="12" md="3">
                                <span className="font-weight-bold text-capitalize">
                                {t(translations.entities.general.portCode)}
                                </span>
                            </Col>
                            <Col sm="12" md="8">
                                TPS
                            </Col>
                        </Row>

                        <Row className="w-100">
                            <Col sm="12" md="3">
                                <span className="font-weight-bold text-capitalize">
                                {t(translations.entities.general.portName)}
                                </span>
                            </Col>
                            <Col sm="12" md="8">
                                Tanjung Perak
                            </Col>
                        </Row>

                        <Row className="w-100">
                            <Col sm="12" md="3">
                                <span className="font-weight-bold text-capitalize">
                                {t(translations.entities.general.country)}
                                </span>
                            </Col>
                            <Col sm="12" md="8">
                                Indonesia
                            </Col>
                        </Row>

                        <Row className="w-100">
                            <Col sm="12" md="3">
                                <span className="font-weight-bold text-capitalize">
                                {t(translations.entities.general.city)}
                                </span>
                            </Col>
                            <Col sm="12" md="8">
                                Surabaya
                            </Col>
                        </Row>

                        <Button
                            onClick={back}
                            variant="warning"
                            className="mt-3 rounded-large font-weight-bold px-3"
                        >
                        {t(translations.entities.general.back)}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
    // }
    }

    return (
    <>
        <Helmet>
            <title>{t(translations.home.title)}</title>
        </Helmet>
        <Sidebar header-name={t(translations.sidebarMenu.port)} />
        {content}
    </>
    );
}
