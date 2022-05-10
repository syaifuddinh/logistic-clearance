import React from "react";
import { Row, Col } from "react-bootstrap";
import { GologsButton } from "../../../../components/Button/Loadable";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";

type IProps = {
    onSubmit: any;
};

export default function Payment(props: IProps) {
    return (
        <>
            <div>
                <div className="bg-white p-3">
                    <Row>
                        <Col xs="12" md="5">
                            <small>
                                <GeneralTranslation slug="paymentMethod" />
                            </small>
                            <div className="mt-3">BANK BCA (dicek manual)</div>
                            <div className="mt-1">
                                <img
                                    src="https://statik.tempo.co/?id=836405&width=650"
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
                                <img
                                    src="https://1.bp.blogspot.com/-s-zZoSvAwn8/XoGGsoMoLLI/AAAAAAAALhk/PUYVWsRGeKQEC9LFiz7qzDvJm8OWOvBWgCNcBGAsYHQ/s1600/TEST.jpg"
                                    className="rounded w-100"
                                    alt="Proof of payment"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="my-4 pb-5">
                    <GologsButton
                        content={<GeneralTranslation slug="submit" />}
                        variant="secondary"
                        onClick={props.onSubmit}
                        className="float-right"
                    />
                </div>
            </div>
        </>
    );
}
