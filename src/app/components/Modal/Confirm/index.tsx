import React, { Component } from "react";
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsIcon } from "../../Icon/Loadable";
import { GologsButton } from "../../Button/Loadable";
import { Modal } from "react-bootstrap"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimes
} from "@fortawesome/free-solid-svg-icons";

type IProps = {
    onConfirm: any;
    button: any;
};

export default class ConfirmModal extends Component<IProps> {
    state = {
        showModal: false,
        disabled: {
            confirm: false
        }
    };

    handleCloseModal = () => {
        this.setState({showModal: false})
    };
    
    handleOpenModal = () => {
        this.setState({showModal: true})
    };

    onConfirm = async () => {
        this.setState({disabled: {
            confirm: true
        }})
        try {
            await this.props.onConfirm();
            this.handleCloseModal();
        } catch(e) {
            
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
                >
                    <Modal.Body>
                        <div
                            className="fs-15px float-right"
                            onClick={this.handleCloseModal}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <div className="w-100 p-5">
                            <div className="fs-32px font-weight-light-bolder text-center">
                                <GeneralTranslation slug="prompt.confirm" />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
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
                                translation="yes"
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
