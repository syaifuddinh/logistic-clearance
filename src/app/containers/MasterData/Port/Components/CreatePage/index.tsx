import React from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import { GologsButton } from "../../../../../components/Button/Loadable";
import GologsInput from "../../../../../components/Input/GologsInput";
import GologsAlert from "../../../../../components/Alert/GologsAlert";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { FormModal } from "../../../../../components/Modal/Form/Loadable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type IProps = {
    button: any;
    data: any;
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
                            ? "masterData.port.edit"
                            : "masterData.port.add"
                    }
                    confirmSlug={this.props.id ? "save" : "add"}
                    button={this.props.button}
                    onConfirm={this.onSubmit}
                    isUseErrorDefault={true}
                    content={
                        <>
                            <Row className="mt-3">
                                <Col sm="12" md="12">
                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="portCode"
                                            value={this.props.data.portCode}
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "portCode",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="12" md="12">
                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="portName"
                                            value={this.props.data.portName}
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "portName",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="12" md="12">
                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="country"
                                            value={this.props.data.country}
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "country",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm="12" md="12">
                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="city"
                                            value={this.props.data.city}
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "city",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>
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
