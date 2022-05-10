import React from "react";
import { Card, Alert, Row, Col } from "react-bootstrap";
import { Image } from "../../../styles/Sidebar";
import GologsWizard from "../../components/Milestone/GologsWizard";
import { GologsButton } from "../../components/Button/Loadable";
import { GeneralTranslation } from "../../components/Translation/Loadable";
import { Redirect } from "react-router-dom";

type IProps = {
    titleSlug: string;
    statusStep: number;
    jobNumberKey: string;
    transactionRedirectLink: string;
    serviceStatuses: any[];
}

export default class SuccessTransactionPanel extends React.Component<IProps> {
    state = {
        isRedirect: false,
        isTransactionRedirect: false,
        jobNumber: ""
    };

    componentDidMount() {
        const jobNumber = window.localStorage.getItem(this.props.jobNumberKey);
        if (jobNumber) {
            this.setState({ jobNumber: jobNumber });
            window.localStorage.removeItem(this.props.jobNumberKey);
        } else {
        }
    }

    redirectToHome = () => {
        this.setState({ isRedirect: true });
    };

    redirectToTransaction = () => {
        this.setState({ isTransactionRedirect: true });
    };

    render() {
        return (
            <>
                <div className="gologs-container">
                    <Card>
                        <Card.Body>
                            <Card.Text className="p-4">
                                <Row>
                                    <Col xs={6}>
                                        <div>
                                            <h2 className="font-weight-bolder">
                                                <GeneralTranslation slug={this.props.titleSlug} />
                                            </h2>
                                            <h2 className="font-weight-bolder">
                                                <GeneralTranslation slug="responseMessage.successfullyPlaced" />
                                            </h2>
                                        </div>

                                        <div className="mt-4">
                                            <Alert variant="primary">
                                                <div className="text-capitalize">
                                                    <GeneralTranslation slug="jobNumber" />
                                                </div>
                                                <h5 className="font-weight-bold mt-1">
                                                    {this.state.jobNumber}
                                                </h5>
                                            </Alert>
                                        </div>

                                        <div className="mt-5">
                                            <GeneralTranslation slug="instruction.ongoingProcess" />
                                        </div>

                                        <div className="mt-4 position-relative w-100">
                                            <GologsWizard
                                                items={
                                                    this.props.serviceStatuses
                                                }
                                                type="secondary"
                                                titleClassName="fs-20px"
                                                fontSizeClassName="md-fs-7px"
                                                step={this.props.statusStep}
                                            />
                                        </div>
                                    </Col>

                                    <Col xs={6}>
                                        <Image
                                            style={{
                                                width: "auto",
                                                height: "70mm",
                                                zIndex: -1
                                            }}
                                            src={require("../../../assets/images/person-in-work.svg")}
                                        />
                                    </Col>
                                </Row>
                            </Card.Text>
                            <div className="d-flex justify-content-center">
                                <GologsButton
                                    className="mr-2"
                                    onClick={this.redirectToHome}
                                    variant="outline-primary"
                                    contentByTranslation={true}
                                    translation="close"
                                />
                                <GologsButton
                                    onClick={this.redirectToTransaction}
                                    variant="primary"
                                    contentByTranslation={true}
                                    translation="sidebarMenu.myTransaction"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                {this.state.isRedirect && (
                    <Redirect
                        to={{
                            pathname: "/home"
                        }}
                    />
                )}

                {this.state.isTransactionRedirect && (
                    <Redirect
                        to={{
                            pathname: this.props.transactionRedirectLink,
                            search: "?tab=active"
                        }}
                    />
                )}
            </>
        );
    }
}
