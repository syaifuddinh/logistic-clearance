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
                            ? "masterData.modules.edit"
                            : "masterData.modules.add"
                    }
                    confirmSlug={this.props.id ? "save" : "add"}
                    button={this.props.button}
                    onConfirm={this.onSubmit}
                    isUseErrorDefault={true}
                    content={
                        <>
                            <Row className="mt-5">
                                <Col xs="12" md="12">
                                    <Row>
                                        <Col sm="12" md="12">
                                            <Form.Group>
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="modulesCode"
                                                    value={
                                                        this.props.data
                                                            .moduleCode
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "moduleCode",
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
                                                    translation="modulesName"
                                                    value={
                                                        this.props.data
                                                            .moduleName
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "moduleName",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
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
