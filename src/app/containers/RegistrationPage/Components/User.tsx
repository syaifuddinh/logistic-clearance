/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Form, Col } from "react-bootstrap";

export default function User(props) {
  return (
    <>
      <div>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            placeholder="Enter your full name"
            value={props.valueName}
            onChange={props.onChangeName}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            placeholder="Enter job title"
            value={props.valueJobTitle}
            onChange={props.onChangeJobTitle}
          />
        </Form.Group>

        <Form.Row>
          <Col xs="12" sm="6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={props.valueEmail}
              onChange={props.onChangeEmail}
            />
          </Col>

          <Col xs="12" sm="6">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder="Enter phone number"
              value={props.valuePhoneNumber}
              onChange={props.onChangePhoneNumber}
            />
          </Col>
        </Form.Row>

        <Form.Group className="mt-4">
          <Form.Check inline /> By checking this, I agree{" "}
          <a href="#" className="text-primary">
            Term and Condition{" "}
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary">
            {" "}
            Privacy Policy
          </a>
        </Form.Group>
      </div>
    </>
  );
}
