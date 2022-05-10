import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Image } from "../../../../styles/Sidebar";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import RegularCard from "../../../components/SummaryCard/RegularCard";

export default class UserProfile extends React.Component {
    state = {}

    constructor(props) {
        super(props);
    }
    
    
    componentDidMount() {
        
    }
   
    
    getContent = props => {
        const { t } = useTranslation();
            
        let content = (
            <div className="gologs-container">
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Col xs="12" md="6">
                                    <RegularCard />
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );

        return (
            <>
            <>
                <Helmet>
                <title>Add Service</title>
                </Helmet>
                <Sidebar
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
            />
          </>
        );
    }
}
