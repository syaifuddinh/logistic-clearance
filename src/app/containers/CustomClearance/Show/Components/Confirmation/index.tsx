import React, { Component } from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { GologsImage } from "../../../../../components/Image/Loadable";
import { CustomerServiceInfo } from "../../../../../components/CustomerServiceInfo/Loadable";
import { Row, Col } from "react-bootstrap";


type IProps = {
    primaryEmail?: string;
    secondaryEmail?: string;
};

export default class Confirmation extends Component<IProps> {
    state = {
        username : ""
    }

    componentDidMount() {
        let username: any = "";
        let jsonData: any = {};
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
            jsonData = JSON.parse(authUser);
            window.console.log(jsonData)
            username = jsonData.person.fullName;
        }

        this.setState({username : username});
    }
    
    render() {
        return (
            <>
                <GeneralTranslation
                    slug="statusConfirmation"
                    className="fs-18px font-weight-light-bolder"
                />

                <Row>
                    <Col xs={12} md={7} className="pt-5">
                        <div className="fs-14px">
                            <div>
                                <GeneralTranslation
                                    slug="hi"
                                    className="mr-1"
                                />
                                {this.state.username},
                            </div>
                            <div>
                                <GeneralTranslation
                                    slug="customClearance.confirmationMessage"
                                    className="mr-1"
                                />
                                <span className="text-second-secondary mr-1">
                                    {this.props.primaryEmail}
                                </span>
                                {this.props.secondaryEmail && (
                                    <>
                                        <GeneralTranslation
                                            slug="and"
                                            className="mr-1"
                                        />
                                        <span className="text-second-secondary">
                                            {this.props.secondaryEmail}
                                        </span>
                                    </>
                                )}
                                .
                                <GeneralTranslation
                                    slug="pleaseKindlyCheckIt"
                                    className="ml-1"
                                />
                            </div>
                        </div>
                    </Col>

                    <Col xs={5} className="d-none d-md-block">
                        <GologsImage
                            name="doConfirmed.svg"
                            height={241}
                            width="auto"
                        />
                    </Col>
                </Row>

                <Row className="fs-14px mt-15px md-mt-0px">
                    <Col xs={12}>
                        <CustomerServiceInfo />
                    </Col>
                </Row>
            </>
        );  
    }
}