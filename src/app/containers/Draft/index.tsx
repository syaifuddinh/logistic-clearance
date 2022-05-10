import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../components/Sidebar/Loadable";
import { Container, Row, Col, Card } from "react-bootstrap";
import GologsTable from "../../components/Table/GologsTable";

export default function Draft() {
    const getDetailBtn = () => (
        <div className="text-center">
            <a href="#" className="text-primary font-weight-bold">
                Continue
            </a>&nbsp;
            <a href="#" className="text-danger font-weight-bold">
                Cancel
            </a>
        </div>
    );
    const columnDefs = [
        { title: "Services" },
        { title: "Created Date" },
        { title: "Action" }
    ];

    const columns = [
        { data: "services" },
        { data: "createdDate" },
        { data: "action", className: "text-center" }
    ];

    const data = [
        {
            services: "DO Online",
            createdDate: "21/11/2020 16:11",
            action: getDetailBtn()
        },
        {
            services: "TMS",
            createdDate: "21/11/2020 16:11",
            action: getDetailBtn()
        },
        {
            services: "SP2",
            createdDate: "21/11/2020 16:11",
            action: getDetailBtn()
        }
    ];

    let content = (
        <Container>
            <Row className="mt-3">
                <Col className="mb-3">
                    <Card>
                        <Card.Body>
                            <div className="mt-3">
                                <GologsTable
                                    columnDefs={columnDefs}
                                    data={data}
                                    columns={columns}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
    return (
        <>
            <Helmet>
                <title>{"Draft"}</title>
            </Helmet>
            <Sidebar header-name={"Draft"} />
            <div className="gologs-container">{content}</div>
        </>
    );
}
