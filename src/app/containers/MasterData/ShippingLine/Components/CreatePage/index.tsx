import React from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import { GologsButton } from "../../../../../components/Button/Loadable";
import GologsInput from "../../../../../components/Input/GologsInput";
import GologsAlert from "../../../../../components/Alert/GologsAlert";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { FormModal } from "../../../../../components/Modal/Form/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Dropfile from "../../../../../components/Dropfile/Dropfile";

type IProps = {
    button: any;
    file: any;
    data: any;
    onFileDrop: any;
    onFileDelete: any;
    onDataChange: any;
    onSubmit: any;
    id?: any;
};

export default class CreatePage extends React.Component<IProps> {
    state = {
        alert: {
            success: false,
            danger: false
        }
    };

    onSubmit = async () => {
        this.setState({disabled: {
            submit: true
        }})
        
        try {
            if (this.props.id) {
                await this.props.onSubmit(this.props.id);
            } else {
                await this.props.onSubmit();
            }
            this.setState({alert: {
                success: true
            }})
            setInterval(() => {
                this.setState({alert: {
                    success: false
                }})
            }, 4000);
        } catch(e) {
            this.setState({alert: {
                danger: true
            }})
            setInterval(() => {
                this.setState({alert: {
                    danger: false
                }})
            }, 4000);
            
        }
        this.setState({disabled: {
            submit: false
        }})
    }
    
    render() {
        return (
            <>
                <FormModal
                    titleSlug={
                        this.props.id
                            ? "masterData.shippingLine.edit"
                            : "masterData.shippingLine.add"
                    }
                    confirmSlug={this.props.id ? "save" : "add"}
                    button={this.props.button}
                    onConfirm={this.onSubmit}
                    isUseErrorDefault={true}
                    content={
                        <>
                            <Row className="mt-5">
                                <Col xs="12" md="6">
                                    <Row>
                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="shippingLineCode"
                                                    value={
                                                        this.props.data
                                                            .shippingLineCode
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "shippingLineCode",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="shippingLineName"
                                                    value={
                                                        this.props.data
                                                            .shippingLineName
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "shippingLineName",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="address"
                                                    value={
                                                        this.props.data
                                                            .shippingLineAddress
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "shippingLineAddress",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="email"
                                                    value={
                                                        this.props.data
                                                            .shippingLineEmail
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "shippingLineEmail",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="phoneNumber"
                                                    value={
                                                        this.props.data
                                                            .shippingLinePhone
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "shippingLinePhone",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="picName"
                                                    value={
                                                        this.props.data
                                                            .shippingLinePICName
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "shippingLinePICName",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col xs="12" md="6">
                                    <Row>
                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GeneralTranslation slug="contractPeriod" />

                                                <Row className="mt-2">
                                                    <Col xs="12" md="6">
                                                        <GologsInput
                                                            placeholderByTranslation={
                                                                true
                                                            }
                                                            translation="from"
                                                            value={
                                                                this.props.data
                                                                    .contractPeriodFrom
                                                            }
                                                            onChange={e => {
                                                                this.props.onDataChange(
                                                                    "contractPeriodFrom",
                                                                    e
                                                                );
                                                            }}
                                                            type="date"
                                                            variant="primary"
                                                            />
                                                    </Col>

                                                    <Col xs="12" md="6">
                                                        <GologsInput
                                                            placeholderByTranslation={
                                                                true
                                                            }
                                                            translation="to"
                                                            type="date"
                                                            variant="primary"
                                                            value={
                                                                this.props.data
                                                                .contractPeriodTo
                                                            }
                                                            onChange={e => {
                                                                this.props.onDataChange(
                                                                    "contractPeriodTo",
                                                                    e
                                                                );
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Col>

                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GeneralTranslation slug="attachment" />
                                                
                                                <div className="mt-2">
                                                    <Dropfile
                                                        onDrop={e => {
                                                            this.props.onFileDrop(
                                                                "attachment",
                                                                e[0]
                                                            );
                                                        }}
                                                        onDelete={e => {
                                                            this.props.onFileDelete(
                                                                "attachment"
                                                            );
                                                        }}
                                                        showLoading={
                                                            this.props.file.attachment
                                                                .isShowLoading
                                                        }
                                                        file={
                                                            this.props.file.attachment
                                                                .file
                                                        }
                                                        fileName={
                                                            this.props.file.attachment
                                                                .fileName
                                                        }
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    }
                />

                {this.state.alert.success && (
                    <GologsAlert
                        variant="success"
                        slug="responseMessage.submitSuccess"
                    />
                )}
            </>
        );
    }
}
