import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { Message, MessageTitle } from "../../../../styles/Result";
import { GeneralTranslation } from "../../Translation/Loadable";
import GologsInput from "../../Input/GologsInput";
import SelectBox from "../../SelectBox/index";
import { EmailSeparatedSemicolon } from "../../Label/EmailSeparatedSemicolon/Loadable";

interface IProps {
    data?: any;
    sppbNumber?: any;
    onSppbNumberChange?: any;
    pibNumber?: any;
    onPibNumberChange?: any;
    doNumber?: any;
    onDoNumberChange?: any;
    pibDate?: any;
    onPibDateChange?: any;
    sppbDate?: any;
    onSppbDateChange?: any;
    doDate?: any;
    onDoDateChange?: any;
    isDocumentFound: boolean;
    documentType?:any;
    onDocumentTypeChange?:any;
    notifyEmails?:any;
    onNotifyEmailsChange?:any;
};

class ResponseForm extends Component<IProps> {
    state = {
        disabledCheck: true,
        disabledRequestCheck: true
    };

    render() {
        return (
            <Container fluid>
                <Form className="mt-5 col-md-12 pb-4">
                    <span>
                        <Row className="mb-3">
                            <div className="w-100">
                                {this.props.isDocumentFound === true ? (
                                    <Message>
                                        <MessageTitle className="text-white font-weight-bold">
                                            <GeneralTranslation slug="successMessage.found" />
                                        </MessageTitle>
                                    </Message>
                                ) : (
                                    <Message error={true}>
                                        <MessageTitle className="text-white font-weight-bold">
                                            <GeneralTranslation slug="responseMessage.dataNotFound" />
                                        </MessageTitle>
                                    </Message>
                                )}
                            </div>
                        </Row>

                        <Row className="mb-3">
                            <div className="d-inline-block w-37">
                                <GeneralTranslation
                                    slug="documentType"
                                    className="fs-18px"
                                />
                            </div>
                        </Row>

                        <Row className="mt-3">
                            <div className="d-inline-block md-w-37 w-100">
                                <SelectBox
                                    labelSlug="documentType"
                                    variant="primary"
                                    placeholderByTranslation={true}
                                    items={this.props.data.documentTypes}
                                    onSelectedChange={async e => {
                                        this.props.onDocumentTypeChange(e);
                                    }}
                                    value={this.props.documentType}
                                    translation={"documentType"}
                                />
                            </div>
                            <div className="d-inline-block md-w-37 w-100" />
                        </Row>

                        <Row className="mt-3">
                            <div className="d-inline-block md-w-37 w-100 mb-15px md-mb-15px">
                                <GologsInput
                                    value={this.props.sppbNumber}
                                    labelSlug="sppbNumber"
                                    showAsterisk={true}
                                    onChange={this.props.onSppbNumberChange}
                                />
                            </div>
                            <div className="d-inline-block md-w-37 w-100 md-ml-15px ml-0px">
                                <GologsInput
                                    type={"date"}
                                    variant="primary"
                                    value={this.props.sppbDate}
                                    labelSlug="sppbDate"
                                    showAsterisk={true}
                                    onChange={this.props.onSppbDateChange}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3">
                            <div className="d-inline-block md-w-37 w-100  mb-15px md-mb-15px">
                                <GologsInput
                                    labelSlug="pibNumber"
                                    showAsterisk={true}
                                    value={this.props.pibNumber}
                                    onChange={this.props.onPibNumberChange}
                                />
                            </div>
                            <div className="d-inline-block md-w-37 w-100 md-ml-15px ml-0px">
                                <GologsInput
                                    labelSlug="pibDate"
                                    showAsterisk={true}
                                    value={this.props.pibDate}
                                    type="date"
                                    onChange={this.props.onPibDateChange}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3">
                            <div className="d-inline-block md-w-37 w-100  mb-15px md-mb-15px">
                                <GologsInput
                                    labelSlug="doNumber"
                                    showAsterisk={true}
                                    value={this.props.doNumber}
                                    onChange={this.props.onDoNumberChange}
                                />
                            </div>
                            <div className="d-inline-block md-w-37 w-100 md-ml-15px ml-0px">
                                <GologsInput
                                    labelSlug="doExpiredDate"
                                    showAsterisk={true}
                                    value={this.props.doDate}
                                    type={"date"}
                                    variant="primary"
                                    onChange={this.props.onDoDateChange}
                                />
                            </div>
                        </Row>

                        <Row className="mt-3">
                            <div className="d-inline-block md-w-37 w-100  mb-15px md-mb-15px">
                                <GologsInput
                                    labelSlug="inviteAndNotifyPeople"
                                    value={this.props.notifyEmails}
                                    onChange={this.props.onNotifyEmailsChange}
                                />
                                <EmailSeparatedSemicolon />
                            </div>
                        </Row>
                    </span>
                </Form>
            </Container>
        );
    }
}

export default ResponseForm;
