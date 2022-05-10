import React from "react";
import { Row, Col } from "react-bootstrap";
import { GologsButton } from "../../../../components/Button/Loadable";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import { PreviewImage } from "../../../../components/PreviewImage/Loadable";
import RejectModal from "./RejectModal";

type IProps = {
    onSubmit: any;
    showSubmitButton: boolean;
    urlImage: string;
    proofOfPaymentUrl: string;
};

export default function Payment(props: IProps) {
    return (
        <>
            <div className="w-100">
                <div className="bg-white p-3">
                    <Row>
                        <Col xs="12" md="5">
                            <small>
                                <GeneralTranslation slug="paymentMethod" />
                            </small>
                            <div className="mt-3">BANK BCA (dicek manual)</div>
                            <div className="mt-1">
                                <img
                                    src={props.urlImage}
                                    style={{ width: "20mm", height: "auto" }}
                                    alt="Proof of payment"
                                />
                            </div>
                        </Col>
                        <Col xs="12" md="7">
                            <small>
                                <GeneralTranslation slug="proofOfPayment" />
                            </small>
                            <div className="mt-1">
                                <PreviewImage
                                    url={props.proofOfPaymentUrl}
                                    alt="Proof Of Payment"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

                {props.showSubmitButton === true && (
                    <div className="my-4 pb-5 d-flex justify-content-end">
                        <RejectModal
                            label={
                                <GologsButton
                                    content={
                                        <GeneralTranslation slug="reject" />
                                    }
                                    variant="outline-danger"
                                />
                            }
                        />
                        <GologsButton
                            content={
                                <GeneralTranslation slug="instruction.approve" />
                            }
                            variant="secondary"
                            onClick={props.onSubmit}
                            className="ml-1 float-right"
                        />
                    </div>
                )}
            </div>
        </>
    );
}
