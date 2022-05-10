import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Image } from "../../../../styles/Sidebar";
import { Button, Container, Row, Col } from "react-bootstrap";

export default function RegistrationSuccessPage(props) {
    let history = useHistory();
    const { t } = useTranslation();

    return (
    <>
        <Container
            className="d-flex justify-content-center"
        >
        <div className="bg-gradient-primary w-100 h-100 position-fixed"></div>
        <Row
            className="p-5 w-100 h-100 position-absolute"
            style={{
                background: "linear-gradient(180deg, #7E7CFB 0%, #7456FD 100%)"
            }}
        >
            <Col className="bg-light p-5 m-3 rounded-medium">
            <Row>
                <Col xs="6" className="d-none d-md-block">
                <Image
                    style={{ height: "auto" }}
                    className="w-100"
                    src={require("../../../../assets/images/sapiens.svg")}
                />
                </Col>
                <Col xs="12" md="4">
                <h2 className="font-weight-bolder text-dark mt-5">
                    Registration
                    <br />
                    Success
                </h2>
                <p>
                    Great, you have successfully <br />
                    registrated a Go-Logs account.
                    <br /> Please check your email to activate <br /> your
                    account.
                </p>
                <div className="mt-5">
                    <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => history.push("/login")}
                    >
                    Login
                    </Button>
                    <br />
                    <Button
                    variant="outline-primary"
                    className="w-100 mt-2"
                    onClick={() => history.push("/")}
                    >
                    Home
                    </Button>
                </div>
                </Col>
            </Row>
            </Col>
        </Row>
        </Container>
    </>
    );
}
