import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import {
  Input,
  Icon,
  MessageInput,
  DatePickerWrapperStyles
} from "../../../../styles/Wizard";
import SelectBox from "../../SelectBox/index";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Button } from "react-bootstrap";

interface IProps {
  selectedItems?: any;
  selectedChange?: any;
  selectedError?: any;
  selectedValue?: any;
  selectedErrorMessage?: any;
  emailError?: any;
  emailValue?: any;
  emailChange?: any;
  emailErrorMessage?: any;
  blNoError?: any;
  blNoValue?: any;
  blNoChange?: any;
  blNoErrorMessage?: any;
  blDateError?: any;
  blDateValue?: any;
  blDateChange?: any;
  blDateErrorMessage?: any;
  btnSubmitClick?: any;
  btnSubmitRaised?: any;
}

class RequestForm extends Component<IProps> {
  state = {
    disabledCheck: true
  };

  enableCheck() {
    let state = this.state;
    if (
      this.props.selectedValue &&
      this.props.emailValue &&
      this.props.blNoValue &&
      this.props.blDateValue
    ) {
      if (this.props.emailValue) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.props.emailValue)) {
          state.disabledCheck = false;
        }
      }
    } else {
      state.disabledCheck = true;
    }
    this.setState(state);
  }

  render() {
    return (
        <Container fluid>
            <Form className="mt-5 col-md-12">
                <Row>
                    <Form.Label as={Col} sm={4}>
                        Contract Number
                    </Form.Label>
                    <Form.Label as={Col} sm={4}>
                        Select FF/PPJK
                    </Form.Label>
                    <Form.Label as={Col} sm={4}>
                        Select Service
                    </Form.Label>
                </Row>
                <Row className="mt-3">
                    <Form.Label as={Col} sm={4}>
                        <Input
                            placeholder={"Please fill contract number"}
                            value={this.props.emailValue}
                            error={this.props.emailError}
                            onChange={e => {
                                this.props.emailChange(e);
                                this.enableCheck();
                            }}
                        />
                        <MessageInput show={this.props.emailError}>
                            {this.props.emailErrorMessage} *
                        </MessageInput>
                    </Form.Label>
                    <Form.Label as={Col} sm={4}>
                        <SelectBox
                            items={this.props.selectedItems}
                            variant="primary"
                            onSelectedChange={e => {
                                this.props.selectedChange(e);
                                this.enableCheck();
                            }}
                            error={this.props.selectedError}
                            placeholder={"Select Freight Forwarder / PPJK"}
                            value={this.props.selectedValue}
                        />
                        <MessageInput show={this.props.selectedError}>
                            {this.props.selectedErrorMessage} *
                        </MessageInput>
                    </Form.Label>
                    <Form.Label as={Col} sm={4}>
                        <SelectBox
                            items={this.props.selectedItems}
                            variant="primary"
                            onSelectedChange={e => {
                                this.props.selectedChange(e);
                                this.enableCheck();
                            }}
                            error={this.props.selectedError}
                            value={"Select Service"}
                        />
                        <MessageInput show={this.props.selectedError}>
                            {this.props.selectedErrorMessage} *
                        </MessageInput>
                    </Form.Label>{" "}
                </Row>
            </Form>
        </Container>
    );
  }
}

export default RequestForm;
