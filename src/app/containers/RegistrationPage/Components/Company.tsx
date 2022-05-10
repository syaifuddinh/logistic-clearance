import React from "react";
import { Form, Col } from "react-bootstrap";

export default function Company(props) {
    return (
        <>
            <div>
                <Form.Group>
                    <Form.Label>NIB or Import Registration Number</Form.Label>
                    <Form.Control
                        placeholder="13 digit number"
                        value={props.valueNib}
                        onChange={props.onChangeNib}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        placeholder="Enter your company name"
                        value={props.valueCn}
                        onChange={props.onChangeCn}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Company Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter your company address"
                        value={props.valueCa}
                        onChange={props.onChangeCa}
                    />
                </Form.Group>

                <Form.Row>
                    <Col xs="12" sm="6">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            value={props.valueCity}
                            onChange={props.onChangeCity}
                        />
                    </Col>

                    <Col xs="12" sm="6">
                        <Form.Label>State / Province</Form.Label>
                        <Form.Control
                            value={props.valueState}
                            onChange={props.onChangeState}
                        />
                    </Col>
                </Form.Row>

                <Form.Row className="mt-2">
                    <Col xs="12" sm="6">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            as="select"
                            value={props.valueCountry}
                            onChange={props.onChangeCountry}
                        >
                            <option value=""></option>
                            <option value="1">Indonesia</option>
                            <option value="2">China</option>
                        </Form.Control>
                    </Col>

                    <Col xs="12" sm="6">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            placeholder="Enter postal code"
                            value={props.valuePostalCode}
                            onChange={props.onChangePostalCode}
                        />
                    </Col>
                </Form.Row>

                <Form.Row className="mt-2">
                    <Col xs="12" sm="6">
                        <Form.Label>Company Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={props.valueCompanyType}
                            onChange={props.onChangeCompanyType}
                        >
                            <option value=""></option>
                            <option value="CargoOwner">Cargo Owner</option>
                            <option value="ShippingLine">Shipping Line</option>
                            <option value="Forwarder">Forwarder / PPJK</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
            </div>
        </>
    );
}
