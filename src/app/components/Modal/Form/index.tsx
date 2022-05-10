import React, { Component } from "react";
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsButton } from "../../Button/Loadable";
import { Modal } from "react-bootstrap"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/free-solid-svg-icons";
import GologsAlert from "../../Alert/GologsAlert";

type IProps = {
    onConfirm: any;
    button: any;
    content: any;
    confirmSlug?: string;
    titleSlug?: string;
    isUseErrorDefault?: boolean;
};

export default class FormModal extends Component<IProps> {
    state = {
        showModal: false,
        disabled: {
            confirm: false
        },
        alert: {
            danger: false
        }
    };

    showErrorMessage = () => {
        this.setState({
            alert: {
                danger: true
            }
        });
        setInterval(() => {
            this.setState({
                alert: {
                    danger: false
                }
            });
        }, 4000);
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false})
    };
    
    handleOpenModal = () => {
        this.setState({showModal: true})
    };

    componentDidMount() {
        if (!this.props.button) {
            this.setState({showModal: true});
        }
    }

    onConfirm = async () => {
        this.setState({disabled: {
            confirm: true
        }})
        try {
            await this.props.onConfirm();
            this.handleCloseModal();
        } catch(e) {
            if (this.props.isUseErrorDefault === true) {
                this.showErrorMessage();
            }
        }
        this.setState({disabled: {
            confirm: false
        }})
        
    }
    
    render() {
        return (
            <>
                <div className="d-inline-block" onClick={this.handleOpenModal}>
                    {this.props.button}
                </div>
                <Modal
                    show={this.state.showModal}
                    onHide={this.handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                    className="md-max-w-1050px"
                >
                    <Modal.Body>
                        <div
                            className="fs-15px float-right"
                            onClick={this.handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </div>

                        <div className="pt-5 px-5 pb-3">
                            {this.props.titleSlug && (
                                <div className="text-center fs-21px font-weight-light-bolder font-poppins text-capitalize">
                                    <GeneralTranslation slug={this.props.titleSlug} />
                                </div>
                            )}

                            {this.props.content}

                            <div className="d-flex justify-content-end">
                                <GologsButton
                                    onClick={this.handleCloseModal}
                                    variant="link-primary"
                                    size="small"
                                    contentByTranslation={true}
                                    translation="cancel"
                                    className="mr-2"
                                />

                                <GologsButton
                                    onClick={this.onConfirm}
                                    variant="primary"
                                    size="small"
                                    contentByTranslation={true}
                                    disabled={this.state.disabled.confirm}
                                    translation={
                                        this.props.confirmSlug
                                            ? this.props.confirmSlug
                                            : "save"
                                    }
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                {this.state.alert.danger && (
                    <GologsAlert
                        variant="danger"
                        slug="responseMessage.errorDefault"
                    />
                )}
            </>
        );
    }
}
