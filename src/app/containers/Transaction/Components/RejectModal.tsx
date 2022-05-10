import React, { Component } from "react";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { Modal } from "react-bootstrap";
import SelectBox from "../../../components/SelectBox/index";
import { GologsTextarea } from "../../../components/Input/Textarea/Loadable";
import { GologsButton } from "../../../components/Button/Loadable";
import { PopupMessage } from "../../../components/PopupMessage/Loadable";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";

type IProps = {
    label: any;
    id: any;
    onSubmit: any;
};

export default class RejectModal extends Component<IProps> {
state = {
        isShow: false,
        isShowSuccessModal: false,
        list: { 
            reasons: []
        },
        data: { 
            reason: {
                value: "",
                label: ""
            },
            anotherReason: ""
        }
    }

    onSubmit = async () => {
        let reason: string = ""; 
        let id: any = this.props.id; 
        if (this.state.data.reason.value === "etc") reason = this.state.data
                                                        .anotherReason;
        else reason = this.state.data.reason.label;                                                        
        try {
            await DeliveryOrder.cancelTransaction(id, reason);
            this.hideModal();
            this.setState({ isShowSuccessModal: true });
            this.props.onSubmit();
        } catch (e) {
            
        }
    }

    showModal = () => {
        this.setState({isShow: true})
    }

    hideModal = () => {
        this.setState({isShow: false})
    }

    onDataChange = (key, value) => {
        let data: any = this.state.data;
        data[key] = value;
        this.setState({data: data});
    }

    componentDidMount() {
        let list:any = this.state.list
        list.reasons.push({
            label: "Kesalahan teknis",
            value: "Kesalahan teknis"
        });
        list.reasons.push({
            label: "Etc",
            value: "etc"
        });

        this.setState({list : list})
    }
    
    handleClose () {

    }
    
    render() {
        return (
            <>
                <span className="d-inline-block" onClick={this.showModal}>
                    {this.props.label}
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
                                    items={this.state.list.reasons}
                                    value={this.state.data.reason}
                                    onSelectedChange={e => {
                                        this.onDataChange("reason", e);
                                    }}
                                    variant="primary"
                                    placeholderByTranslation={true}
                                    translation="reasonForCancelDraft"
                                />
                            </div>

                            {this.state.data.reason.value === "etc" && (
                                <div className="mt-3">
                                    <GeneralTranslation
                                        slug="description"
                                        className="mb-2 d-block text-capitalize"
                                    />

                                    <GologsTextarea
                                        variant="primary"
                                        value={this.state.data.anotherReason}
                                        onChange={e => {
                                            this.onDataChange(
                                                "anotherReason",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>
                            )}

                            <div className="mt-3 d-flex justify-content-end">
                                <GologsButton
                                    contentByTranslation={true}
                                    variant="link-primary"
                                    translation="cancel"
                                    onClick={this.hideModal}
                                />

                                <GologsButton
                                    onClick={this.onSubmit}
                                    showLoading={true}
                                    contentByTranslation={true}
                                    textTransform="uppercase"
                                    variant="primary"
                                    translation="done"
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <PopupMessage
                    show={this.state.isShowSuccessModal}
                    onClose={() => {
                        this.setState({ isShowSuccessModal: false });
                    }}
                    messageSlug="responseMessage.successfullyCancelled"
                />
            </>
        );
    }
}