import React from "react";

import { Redirect } from "react-router-dom";
import ServiceType from "../../../model/ServiceType";
import { Image } from "../../../styles/Sidebar";
import { SecondaryHeader } from "../../components/Header/Secondary/Loadable";
import { Container, Row, Col, Card } from "react-bootstrap";

export default class ServiceTypePage extends React.Component {
    state = {
        serviceTypes: [],
        isRedirect: false
    };

    componentWillMount() {
        const serviceTypes = ServiceType.index;
        this.setState({serviceTypes : serviceTypes});
    }

    selectServiceType = (slug) => {
        return () => {
            ServiceType.setChosen(slug)
            this.setState({isRedirect : true});
        }
    }

    render() {

        return (
            <div>
                { this.state.isRedirect && (
                    <Redirect
                        to={{
                        pathname: "/home"
                        }}
                    />
                ) }
                <SecondaryHeader />
                <Container className="px-30px md-px-87px" fluid>
                    <Row className="mt-5 pt-5">
                        <Col sm={12} className="mt-5">
                            <div className="font-weight-bolder md-fs-32px fs-28px">Please select a module</div>
                        </Col>
                    </Row>
                    <div className="d-none d-md-block h-50px"></div>
                    <div className="d-block d-md-none h-20px"></div>
                    <Row>
                    { this.state.serviceTypes.map((x:any, i:number) => {
                        return (
                          <Col
                            sm={12}
                            md={6}
                          >
                            <Card 
                                className="p-25px md-p-50px mb-30px shadow hover hover-primary" 
                                onClick={this.selectServiceType(x.slug)}
                            >
                                <div className="d-flex">
                                    <div className="mr-4 d-inline-block">
                                        <Image
                                        style={{ width: "auto", height: "100px" }}
                                        className="position-relative"
                                        src={x.image}
                                        />
                                    </div>
                                    <div className="d-inline-block pr-4">
                                        <div className="text-primary font-weight-light-bolder md-fs-24px md-fs-20px text-capitalize">
                                        {x.name ? x.name : ""}
                                        </div>
                                        <div className="fs-11px md-fs-16px">{x.description}</div>
                                    </div>
                                </div>
                            </Card>
                          </Col>
                        );
                    }) }
                    </Row>
                </Container>
            </div>
        );
    }
}
