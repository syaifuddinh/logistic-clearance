import React, { Component } from "react";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";
import SelectBox from "../../../../components/SelectBox/index";
import { GologsTextarea } from "../../../../components/Input/Textarea/Loadable";
import { GologsButton } from "../../../../components/Button/Loadable";

type IProps = {
    label: any;
};

export default class RejectModal extends Component<IProps> {

    state = {
        isShow : false,
        data : { 
            reasons : []
        }
    }

    showModal = () => {
        this.setState({isShow : true})
    }

    hideModal = () => {
        this.setState({isShow : false})
    }

    componentDidMount() {
        let data:any = this.state.data
        data.reasons.push({
            label: "Kesalahan teknis",
            value: "Kesalahan teknis"
        });

        this.setState({data : data})
    }
    
    handleClose () {

    }
    
    render() {
        return (
            <>
                <span className="d-inline-block" onClick={this.showModal}>
                    { this.props.label }
                </span>
                <Modal
                    show={this.state.isShow}
                    onHide={this.hideModal}
                    backdrop="static"
                    keyboard={false}
                    className="rounded-24px"
                >
                    <Modal.Body>
                        <div className="d-flex flex-column px-3 py-2">
                            <div className="fs-18px font-weight-bold mb-4">
                                <GeneralTranslation slug="cancelDraft" />
                            </div>

                            <div>
                                <GeneralTranslation
                                    slug="reasonForCancelDraft"
                                    className="mb-2 d-block"
                                />

                                <SelectBox
                                    items={this.state.data.reasons}
                                    variant="primary"
                                    placeholderByTranslation={true}
                                    translation="reasonForCancelDraft"
                                />
                            </div>

                            <div className="mt-3">
                                <GeneralTranslation
                                    slug="reasonForCancelDraft"
                                    className="mb-2 d-block"
                                />

                                <GologsTextarea variant="primary" />
                            </div>

                            <div className="mt-3 d-flex justify-content-end">
                                <GologsButton
                                    contentByTranslation={true}
                                    variant="link-primary"
                                    translation="cancel"
                                    onClick={this.hideModal}
                                    />

                                <GologsButton
                                    onClick={this.hideModal}
                                    contentByTranslation={true}
                                    textTransform="uppercase"
                                    variant="primary"
                                    translation="done"
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}