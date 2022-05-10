import React, { Component } from "react";
import { GeneralTranslation } from "../../Translation/Loadable";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AddServiceButton } from "../../Button/AddService/Loadable";
import { GologsButton } from "../../Button/Loadable";

type IProps = {
    titleSlug: any;
    subtitleSlug: any;
    onSkipAddService: any;
    onClick: any;
    buttonSlug: string;
    buttonVariant: string;
    successTransactionUrl: string;
    serviceData: any;
};

export default class TransactionSuccessModal extends Component<IProps> {
    state = {
        showModal: false
    }

    handleCloseModal = () => {
        this.setState({showModal: false});
        this.props.onSkipAddService();
    }
    
    onClick = async () => {
        try {
            await this.props.onClick();
            this.setState({showModal: true});
        } catch(e) {

        }
    }

    render() {
        return (
            <>
                <GologsButton
                    variant={this.props.buttonVariant}
                    onClick={this.onClick}
                    contentByTranslation={true}
                    translation={this.props.buttonSlug}
                    showLoading={true}
                />

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
                        <div className="d-flex flex-column p-5 align-items-center">
                            <h1 className="font-weight-more-bolder text-capitalize text-center">
                                <GeneralTranslation
                                    slug={this.props.titleSlug}
                                />
                            </h1>
                            <p className="mt-4">
                                <GeneralTranslation
                                    slug={this.props.subtitleSlug}
                                />
                            </p>

                            <AddServiceButton
                                onCloseUrl={this.props.successTransactionUrl}
                                serviceData={this.props.serviceData}
                            />
                            <Button
                                variant="link"
                                onClick={this.props.onSkipAddService}
                                style={{ borderRadius: "14mm" }}
                                className="mt-4 p-3 font-weight-bold w-50 text-dark"
                            >
                                <GeneralTranslation slug="instruction.skipForNow" />
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
