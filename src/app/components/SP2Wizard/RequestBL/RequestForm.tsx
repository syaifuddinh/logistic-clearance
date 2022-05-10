import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import SelectBox from "../../SelectBox/index";
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsButton } from "../../Button/Loadable";
import GologsInput from "../../Input/GologsInput";
import { HorizontalLine } from "../../Line/HorizontalLine/Loadable";

interface IProps {
    onCheckClicked?: any;
    cargoOwnerTaxId?: any;
    data?: any;
    date?: any;
    onDateChange?: any;
    onCargoOwnerTaxIdChange?: any;
    cargoOwnerName?: any;
    onCargoOwnerNameChange?: any;
    forwarderTaxId?: any;
    onForwarderTaxIdChange?: any;
    forwarderName?: any;
    onForwarderNameChange?: any;
    btnSubmitClick?:  any;
    btnSubmitRaised?:  any;
    disabledCheck?:  any;
    requestStep?:  number;
    typeTransaction?: any;
    terminalOperator?: any;
    blDateEditable?: boolean;
    blNumber?: any;
    blNumberSelected?: any;
    onTypeTransactionChange?: any;
    onTerminalOperatorChange?: any;
    onBlNumberChange?: any;
    onBlNumberSelected?: any;
};

class RequestForm extends Component<IProps> {
    state = {
        disabledCheck: true,
        disabledRequestCheck: true
    };

    constructor(props) {
        super(props)
        this.enableCheck()
        this.enableRequestCheck()
    }
    
    enableCheck() {
        let state = this.state;
        setTimeout(() => {

            if (
                this.props.cargoOwnerTaxId &&
                this.props.cargoOwnerName
            ) {
                
                state.disabledCheck = false;
            } else {
                state.disabledCheck = true;
            }
            this.setState(state);
        }, 400)
    }

    enableRequestCheck() {
        let state = this.state;
        setTimeout(() => {

            if (
                this.props.terminalOperator &&
                this.props.typeTransaction &&                       
                this.props.date &&
                this.props.blNumber
            ) {
                
                state.disabledRequestCheck = false;
            } else {
                state.disabledRequestCheck = true;
            }
            this.setState(state);
        }, 400)
    }

    render() {
    return (
        <Container fluid>
            <Form className="mt-5 col-md-12 pb-4">
                <Row className="mb-2">
                    <div>
                        <GeneralTranslation
                            slug="customerDetail"
                            className="fs-18px"
                        />
                    </div>
                </Row>
                {this.props.requestStep == 0 && (
                    <span>
                        <Row>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <GologsInput
                                    labelSlug="cargoOwnerTaxId"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"cargoOwnerTaxId"}
                                    value={this.props.cargoOwnerTaxId}
                                    onChange={async e => {
                                        await this.props.onCargoOwnerTaxIdChange(
                                            e
                                        );
                                        this.enableCheck();
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 ml-0px md-ml-15px">
                                <GologsInput
                                    labelSlug="cargoOwnerCompanyName"
                                    readonly={true}
                                    value={this.props.cargoOwnerName}
                                    onChange={e => {
                                        this.enableCheck();
                                    }}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3 d-flex align-items-end">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <GologsInput
                                    labelSlug="forwarderTaxId"
                                    placeholderByTranslation={true}
                                    translation={"forwarderTaxId"}
                                    onChange={async e => {
                                        await this.props.onForwarderTaxIdChange(
                                            e
                                        );
                                        this.enableCheck();
                                    }}
                                    value={this.props.forwarderTaxId}
                                />
                            </div>

                            <div className="w-100 md-w-37 ml-0px md-ml-15px">
                                <GologsInput
                                    labelSlug="forwarderName"
                                    readonly={true}
                                    value={this.props.forwarderName}
                                    onChange={e => {
                                        this.enableCheck();
                                    }}
                                />
                            </div>

                            <div className="w-15 md-ml-15px ml-0px md-mt-0px mt-15px">
                                <GologsButton
                                    variant="primary"
                                    onClick={this.props.btnSubmitRaised}
                                    disabled={
                                        !this.props.cargoOwnerTaxId ||
                                        !this.props.cargoOwnerName
                                    }
                                    contentByTranslation={true}
                                    translation="wizard.bottom.next"
                                />
                            </div>
                        </Row>
                    </span>
                )}

                {this.props.requestStep == 1 && (
                    <span>
                        <Row>
                            <Col
                                xs="12"
                                md="6"
                                className="md-border-right-1px border-right-0px border-muted mr-4"
                            >
                                <Row className="mb-3">
                                    <Col xs="12" md="5" className="pl-0">
                                        <GeneralTranslation
                                            slug="cargoOwnerTaxId"
                                            className="fs-12px font-weight-bold text-primary-gray"
                                        />
                                    </Col>
                                    <Col
                                        xs="12"
                                        md="7"
                                        className="md-pl-15px pl-0px"
                                    >
                                        <span className="fs-16px">
                                            {this.props.cargoOwnerTaxId}
                                        </span>
                                    </Col>
                                </Row>
                                <Row className="md-mb-0px mb-16px">
                                    <Col xs="12" md="5" className="pl-0">
                                        <GeneralTranslation
                                            slug="cargoOwnerCompanyName"
                                            className="fs-12px font-weight-bold text-primary-gray"
                                        />
                                    </Col>
                                    <Col
                                        xs="12"
                                        md="7"
                                        className="md-pl-15px pl-0px"
                                    >
                                        <span className="fs-16px">
                                            {this.props.cargoOwnerName}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs="12" md="5">
                                <Row className="mb-3">
                                    <Col xs="12" md="7" className="pl-0">
                                        <GeneralTranslation
                                            slug="forwarderTaxId"
                                            className="fs-12px font-weight-bold text-primary-gray"
                                        />
                                    </Col>
                                    <Col
                                        xs="12"
                                        md="5"
                                        className="md-pl-15px pl-0px"
                                    >
                                        <span className="fs-16px">
                                            {this.props.forwarderTaxId}
                                        </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" md="7" className="pl-0">
                                        <GeneralTranslation
                                            slug="forwarderName"
                                            className="fs-12px font-weight-bold text-primary-gray"
                                        />
                                    </Col>
                                    <Col
                                        xs="12"
                                        md="5"
                                        className="md-pl-15px pl-0px"
                                    >
                                        <span className="fs-16px">
                                            {this.props.forwarderName}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <HorizontalLine className="my-4" />
                        </Row>

                        <Row className="mb-2">
                            <div className="d-inline-block w-37">
                                <GeneralTranslation
                                    slug="SP2.formTitle"
                                    className="fs-18px"
                                />
                            </div>
                        </Row>

                        <Row>
                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <SelectBox
                                    labelSlug="terminalOperator"
                                    variant="primary"
                                    items={this.props.data.terminalOperators}
                                    value={this.props.terminalOperator}
                                    onSelectedChange={async e => {
                                        await this.props.onTerminalOperatorChange(
                                            e
                                        );
                                        this.enableRequestCheck();
                                    }}
                                    placeholderByTranslation={true}
                                    translation={"terminalOperator"}
                                />
                            </div>
                            <div className="w-100 md-w-37 ml-0px md-ml-15px">
                                <SelectBox
                                    labelSlug="typeTransaction"
                                    variant="primary"
                                    placeholderByTranslation={true}
                                    items={this.props.data.typeTransactions}
                                    onSelectedChange={e => {
                                        this.props.onTypeTransactionChange(e);
                                        this.enableRequestCheck();
                                    }}
                                    value={this.props.typeTransaction}
                                    translation={"typeTransaction"}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3 d-flex align-items-end">
                            <div className="w-100 md-w-37 mb-15px md-mb-0px">
                                <GologsInput
                                    labelSlug="blNumber"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"blNumber"}
                                    type="autocomplete"
                                    items={this.props.data.blNumbers}
                                    value={this.props.blNumber}
                                    onChange={e => {
                                        this.props.onBlNumberChange(e);
                                        this.enableRequestCheck();
                                    }}
                                />
                            </div>

                            <div className="w-100 md-w-37 ml-0px md-ml-15px">
                                <GologsInput
                                    labelSlug="blDate"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation="blDate"
                                    variant="primary"
                                    readonly={this.props.blDateEditable}
                                    type="date"
                                    value={this.props.date}
                                    onChange={e => {
                                        this.props.onDateChange(e);
                                        this.enableRequestCheck();
                                    }}
                                />
                            </div>

                            <div className="w-15 md-ml-15px ml-0px md-mt-0px mt-15px">
                                <GologsButton
                                    variant="primary"
                                    onClick={this.props.onCheckClicked}
                                    disabled={this.state.disabledRequestCheck}
                                    contentByTranslation={true}
                                    showLoading={true}
                                    translation="wizard.bottom.check"
                                />
                            </div>
                        </Row>
                    </span>
                )}
            </Form>
        </Container>
    );
    }
}

export default RequestForm;
