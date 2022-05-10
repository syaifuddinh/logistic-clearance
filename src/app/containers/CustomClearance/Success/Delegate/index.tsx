import React from "react";
import { Card, Alert, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/i18n";
import { Image } from "../../../../../styles/Sidebar";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../../components/Sidebar/Loadable";
import { GologsButton } from "../../../../components/Button/Loadable";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import GologsWizard from "../../../../components/Milestone/GologsWizard";
import CustomClearance from "../../../../../model/CustomClearance";
import { Redirect } from "react-router-dom";

export default class CustomClearanceDelegateSuccess extends React.Component {
    state = {
        isRedirect: false,
        isTransactionRedirect: false,
        jobNumber: ""
    }
    
    componentDidMount() {
        const jobNumber = window.localStorage.getItem("latestJobNumber")
        this.setState({jobNumber : jobNumber});
        window.localStorage.removeItem("latestJobNumber");
    }
    
    redirectToHome = () => {
        this.setState({isRedirect : true});
    }
    
    redirectToTransaction = () => {
        this.setState({isTransactionRedirect : true});
    }
    
    getContent = props => {
        const { t } = useTranslation();

        let content = (
            <div className="gologs-container">
                <Card>
                    <Card.Body>
                        <Card.Text className="p-4">
                            <Row>
                                <Col xs={6}>
                                    <div>
                                        <h2 className="font-weight-bolder">
                                            <GeneralTranslation slug="customClearance.delegate" />
                                        </h2>
                                        <h2 className="font-weight-bolder">
                                            <GeneralTranslation slug="responseMessage.successfullyPlaced" />!
                                        </h2>
                                    </div>

                                    <div className="mt-4">
                                        <Alert variant="primary">
                                            <div className="text-capitalize">
                                                <GeneralTranslation slug="jobNumber" />
                                            </div>
                                            <h5 className="font-weight-bold mt-1">
                                                {props.jobNumber}
                                            </h5>
                                        </Alert>
                                    </div>

                                    <div className="mt-5">
                                        <GeneralTranslation slug="instruction.ongoingProcess" />
                                    </div>

                                    <div className="mt-4 position-relative w-100">
                                        <GologsWizard
                                            items={
                                                CustomClearance.delegateStatuses
                                            }
                                            type="secondary"
                                            titleClassName="fs-20px"
                                            fontSizeClassName="md-fs-7px"
                                            step={0}
                                        />
                                    </div>
                                </Col>

                                <Col xs={6}>
                                    <Image
                                        style={{
                                            width: "auto",
                                            height: "60mm",
                                            zIndex: -1
                                        }}
                                        src={require("../../../../../assets/images/person-in-work.svg")}
                                    />
                                </Col>
                            </Row>
                        </Card.Text>
                        <div className="d-flex justify-content-center">
                            <GologsButton
                                className="mr-2"
                                onClick={props.onClose}
                                variant="outline-primary"
                                contentByTranslation={true}
                                translation="close"
                            />
                            <GologsButton
                                onClick={props.onViewTransaction}
                                variant="primary"
                                contentByTranslation={true}
                                translation="sidebarMenu.myTransaction"
                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );

        return (
            <>
            <>
                <Helmet>
                    <title>{t(translations.customClearance.title)}</title>
                </Helmet>
                <Sidebar
                header-name={t(translations.customClearance.title)}
                />
                {content}
            </>
            </>
        );
    };

    render() {
        return (
            <>
                <this.getContent
                    jobNumber={this.state.jobNumber}
                    onClose={this.redirectToHome}
                    onViewTransaction={this.redirectToTransaction}
                />

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
                            pathname: "/sp2-request",
                            search: "?tab=active"
                        }}
                    />
                )}
            </>
        );
    }
}
