import React, { Component } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { MessageInput } from "../../../../styles/Wizard";
import SelectBox from "../../SelectBox/index";
import GologsInput from "../../Input/GologsInput";
import { GologsButton } from "../../Button/Loadable";

interface IProps {
    list: any;
    selectedItems?: any;
    selectedChange?: any;
    selectedError?: any;
    selectedValue?: any;
    selectedErrorMessage?: any;
    emailError?: any;
    emailValue: string;
    emailChange?: any;
    emailErrorMessage?: any;
    posNumberChange?: any;
    posNumberValue?: any;
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
};

class RequestForm extends Component<IProps> {
    state = {
        disabledCheck: true
    };

    enableCheck() {
        setTimeout(() => {
            let state = this.state;
            let emailValue = this.props.emailValue.trim();
            let blNoValue = this.props.blNoValue.trim();
            
            if (
                this.props.selectedValue &&
                this.props.selectedValue != "Select Shipping Line" &&
                emailValue &&
                blNoValue &&
                this.props.blDateValue &&
                this.props.posNumberValue
            ) {
                if (emailValue) {
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(emailValue)) {
                        state.disabledCheck = false;
                    } else {
                        state.disabledCheck = true;
                    }
                }
            } else {
                state.disabledCheck = true;
            }
            this.setState(state);
        }, 150)
    }

    constructor(props) {
        super(props);
        this.enableCheck();
    }

    render() {
        return (
            <Container fluid>
                <Form className="mt-5 col-md-12">
                    <Row>
                        <div className="w-100 md-w-47 mb-15px md-mb-0px">
                            <SelectBox
                                labelSlug="shippingLine"
                                showAsterisk={true}
                                variant="primary"
                                placeholder="Select Shipping Line"
                                items={this.props.selectedItems}
                                onSelectedChange={e => {
                                    this.props.selectedChange(e);
                                    setTimeout(() => {
                                        this.enableCheck();
                                    }, 300);
                                }}
                                error={this.props.selectedError}
                                value={this.props.selectedValue}
                            />
                            <MessageInput show={this.props.selectedError}>
                                {this.props.selectedErrorMessage} *
                            </MessageInput>
                        </div>

                        <div className="w-100 md-w-47 ml-0px md-ml-15px">
                            <GologsInput
                                labelSlug="wizard.bottom.shippingLineEmail"
                                showAsterisk={true}
                                placeholderByTranslation={true}
                                translation="wizard.bottom.shippingLineEmail"
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
                        </div>
                    </Row>

                    <Row className="mt-3 d-flex align-items-end">
                        <div
                            className="w-100 md-w-47 mb-15px md-mb-0px blNumberField"
                            onClick={() => {
                                this.enableCheck();
                            }}
                        >
                            <GologsInput
                                labelSlug="blNumber"
                                showAsterisk={true}
                                type="autocomplete"
                                items={this.props.list.blNumbers}
                                placeholderByTranslation={true}
                                translation="blNumber"
                                onChange={e => {
                                    this.props.blNoChange(e);
                                    this.enableCheck();
                                }}
                                value={this.props.blNoValue}
                                error={this.props.blNoError}
                            />
                            <MessageInput show={this.props.blNoError}>
                                {this.props.blNoErrorMessage} *
                            </MessageInput>
                        </div>

                        <div className="w-100 md-w-47 ml-0px md-ml-15px">
                            <GologsInput
                                labelSlug="blDate"
                                showAsterisk={true}
                                placeholderByTranslation={true}
                                translation={"blDate"}
                                variant="primary"
                                type="date"
                                value={this.props.blDateValue}
                                onChange={e => {
                                    this.props.blDateChange(e);
                                    setTimeout(() => {
                                        this.enableCheck();
                                    }, 300);
                                }}
                            />

                            <MessageInput show={this.props.blDateError}>
                                {this.props.blDateErrorMessage} *
                            </MessageInput>
                        </div>
                    </Row>

                    <Row className="mt-3 d-flex align-items-end">
                        <div className="w-100 md-w-47  mb-15px md-mb-0px">
                            <GologsInput
                                labelSlug="posNumber"
                                showAsterisk={true}
                                placeholderByTranslation={true}
                                translation="posNumber"
                                onChange={e => {
                                    this.props.posNumberChange(e);
                                    this.enableCheck();
                                }}
                                value={this.props.posNumberValue}
                            />
                        </div>

                        <div className="w-15 md-ml-15px ml-0px md-mt-0px mt-15px">
                            <GologsButton
                                variant="primary"
                                onClick={this.props.btnSubmitRaised}
                                contentByTranslation={true}
                                disabled={this.state.disabledCheck}
                                showLoading={true}
                                translation="check"
                            />
                        </div>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default RequestForm;
