import React, { Component } from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsButton } from "../Button/Loadable";
import { Modal } from "react-bootstrap";

type IProps = {
    show: boolean;
    onClose: any;
    messageSlug: string;
};

export default class PopupMessage extends Component<IProps> {
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onClose}
                backdrop="static"
                keyboard={false}
                className="rounded-24px"
            >
                <Modal.Body>
                    <div className="d-flex flex-column px-3 py-2">
                        <div className="fs-32px font-weight-bold mb-4 w-100 text-center justify-content-center d-flex">
                            <GeneralTranslation
                                slug={this.props.messageSlug}
                                className="text-center d-inline-block"
                            />
                        </div>

                        <div className="mt-3 d-flex justify-content-center">
                            <GologsButton
                                onClick={this.props.onClose}
                                content="OK"
                                textTransform="uppercase"
                                variant="primary"
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
