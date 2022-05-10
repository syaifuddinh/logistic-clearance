import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { translations } from "../../../../../locales/i18n";

import EventEmitter from "../../../../components/Event/EventEmitter";
import Dropzone from "react-dropzone";

import { ReactDropzoneStyles } from "../../../../../styles/Wizard";

export default function CreatePage(props) {
    // const auth = useAuth();
    const { t } = useTranslation();

    const hideCreatePage = () => {
        EventEmitter.dispatch("hideCreatePage", 1);
    };

    const handleDrop = () => {};
    // if (auth === null || auth.userData === null) {
    //   content = <Ellipsis />;
    // } else {
    const content = (
        <Container className="w-100 p-5">
            <Row className="bg-white">
                <Col className="p-5 bg-white">
                    <Row>
                        <Col>
                            <h3>{t(translations.entities.general.addNew)} Container</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="6">
                            <Form.Group>
                                <Form.Control
                                    placeholder={t(translations.entities.general.containerCode)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    placeholder={t(translations.entities.general.Type)}
                                />
                            </Form.Group>

                            <Row>
                            <Col xs="6">
                                <Form.Group>
                                    <Form.Control
                                        placeholder={t(translations.entities.general.size)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs="6">
                                <Form.Group>
                                    <Form.Control
                                        placeholder={t(translations.entities.general.maxWeight)}
                                    />
                                </Form.Group>
                            </Col>
                            </Row>

                            <Form.Group>
                                <Form.Control
                                    placeholder={t(translations.entities.general.email)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    placeholder={t(translations.entities.general.owner)}
                                />
                            </Form.Group>
                        </Col>

                        <Col sm="12" md="6">
                            <ReactDropzoneStyles />
                            <Form.Group className="mt-4">
                                <Form.Label>
                                    {t(translations.entities.general.attachment)}
                                </Form.Label>
                            </Form.Group>
                            <Dropzone onDrop={handleDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>Drag'n'drop files, or click to select files</p>
                                </div>
                            )}
                            </Dropzone>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="float-right">
                                <Button
                                    onClick={hideCreatePage}
                                    variant="link"
                                    className="mr-2 px-5 rounded-large"
                                >
                                    {t(translations.entities.general.cancel)}
                                </Button>
                                <Button variant="primary" className="px-5 rounded-large">
                                    Add
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
    // }

    return <>{content}</>;
}
