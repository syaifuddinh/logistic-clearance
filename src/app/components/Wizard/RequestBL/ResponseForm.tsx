import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { Message, MessageTitle } from "../../../../styles/Result";
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsButton } from "../../Button/Loadable";
import { EmailSeparatedSemicolon } from "../../Label/EmailSeparatedSemicolon/Loadable";
import GologsInput from "../../Input/GologsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    addContainer?: any;
    removeContainer?: any;
    onBlDataChange?: any;
    onBlDataFocused?: any;
    onContainerDataChange?: any;
    notifyEmailChange?: any;
    notifyEmailValue?: any;
    data?: any;
    SLName?: any;
    jobStatus?: any;
    state?: any;
    list?: any;
}

class ResponseForm extends Component<IProps> {
    ItemContainer = (props: IProps) => {
        return (
            <Form className="col-lg-12">
            <Row>
                <Form.Label column lg={3}>
                <input
                    className="form-control"
                    value={props.data ? props.data.container_no : ""}
                    readOnly
                />
                </Form.Label>
                <Form.Label column lg={3}>
                <input
                    className="form-control"
                    value={props.data ? props.data.noSeal : ""}
                    readOnly
                />
                </Form.Label>
                <Form.Label column lg={3}>
                <input
                    className="form-control"
                    value={props.data ? props.data.container_size : ""}
                    readOnly
                />
                </Form.Label>
                <Form.Label column lg={3}>
                <input
                    className="form-control"
                    value={props.data ? props.data.container_type : ""}
                    readOnly
                />
                </Form.Label>
            </Row>
            </Form>
        );
        };

        Containers = (props: IProps) =>
        props.data
            ? props.data.map((key, i) => <this.ItemContainer key={i} data={key} />)
            : "";

        render() {
        return (
            <Container fluid>
                <Form className="col-lg-12">
                    <Form.Row className="mt-3">
                        <Message error={this.props.jobStatus}>
                            <MessageTitle className="text-white">
                                {this.props.jobStatus === true ? (
                                    <GeneralTranslation slug="wizard.bottom.result.notFoundStatus" />
                                ) : (
                                    <GeneralTranslation slug="wizard.bottom.result.foundStatus" />
                                )}
                            </MessageTitle>
                        </Message>
                    </Form.Row>
                    <Form.Row className="mt-3">
                        <Form.Group as={Col} xs={12} lg={4}>
                            <GologsInput
                                labelSlug="shippingLine"
                                variant="secondary"
                                value={
                                    this.props.SLName ? this.props.SLName : ""
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} lg={2} />
                        <Form.Group as={Col} lg={6}>
                            <GologsInput
                                labelSlug="blNumber"
                                variant="secondary"
                                value={
                                    this.props.state
                                        ? this.props.state.blNumber
                                        : ""
                                }
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} lg={4}>
                            <GologsInput
                                labelSlug="notifyParty"
                                variant="secondary"
                                value={
                                    this.props.state
                                        ? this.props.state.notifyParty
                                        : ""
                                }
                                onFocus={e => {
                                    this.props.onBlDataFocused("notifyParty");
                                }}
                                onChange={e => {
                                    this.props.onBlDataChange(
                                        "notifyParty",
                                        e.target.value
                                    );
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} lg={2} />
                        <Form.Group as={Col} lg={6}>
                            <Form.Row>
                                <Form.Group as={Col} lg={6}>
                                    <GologsInput
                                        labelSlug="vessel"
                                        variant="secondary"
                                        value={
                                            this.props.state
                                                ? this.props.state.vessel
                                                : ""
                                        }
                                        onFocus={e => {
                                            this.props.onBlDataFocused(
                                                "vessel"
                                            );
                                        }}
                                        onChange={e => {
                                            this.props.onBlDataChange(
                                                "vessel",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} lg={6}>
                                    <GologsInput
                                        labelSlug="voyageNumber"
                                        variant="secondary"
                                        value={
                                            this.props.state
                                                ? this.props.state.voyageNumber
                                                : ""
                                        }
                                        onFocus={e => {
                                            this.props.onBlDataFocused(
                                                "voyageNumber"
                                            );
                                        }}
                                        onChange={e => {
                                            this.props.onBlDataChange(
                                                "voyageNumber",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} lg={4}>
                            <Form.Label>
                                <GeneralTranslation slug="consignee" />
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={
                                    this.props.state
                                        ? this.props.state.consignee
                                        : ""
                                }
                            />
                        </Form.Group>
                        <Form.Group as={Col} lg={2} />
                        <Form.Group as={Col} lg={6}>
                            <Form.Label>
                                <GeneralTranslation slug="portOfLoading" />
                            </Form.Label>
                            <GologsInput
                                type="autocomplete"
                                variant="primary"
                                items={this.props.list.ports}
                                value={
                                    this.props.state
                                        ? this.props.state.portOfLoading
                                        : ""
                                }
                                onFocus={e => {
                                    this.props.onBlDataFocused("portOfLoading");
                                }}
                                onChange={e => {
                                    this.props.onBlDataChange(
                                        "portOfLoading",
                                        e.target.value
                                    );
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} lg={4}>
                            <Form.Label>
                                <GeneralTranslation slug="shipperExporter" />
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={
                                    this.props.state
                                        ? this.props.state.shipper
                                        : ""
                                }
                                onFocus={e => {
                                    this.props.onBlDataFocused("shipper");
                                }}
                                onChange={e => {
                                    this.props.onBlDataChange(
                                        "shipper",
                                        e.target.value
                                    );
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} lg={2} />
                        <Form.Group as={Col} lg={6}>
                            <Form.Label>
                                <GeneralTranslation slug="portOfDischarge" />
                            </Form.Label>
                            <GologsInput
                                type="autocomplete"
                                variant="primary"
                                items={this.props.list.ports}
                                value={
                                    this.props.state
                                        ? this.props.state.portOfDischarge
                                        : ""
                                }
                                onFocus={e => {
                                    this.props.onBlDataFocused(
                                        "portOfDischarge"
                                    );
                                }}
                                onChange={e => {
                                    this.props.onBlDataChange(
                                        "portOfDischarge",
                                        e.target.value
                                    );
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} lg={4}></Form.Group>
                        <Form.Group as={Col} lg={2} />
                        <Form.Group as={Col} lg={6}>
                            <Form.Label>
                                <GeneralTranslation slug="portOfDelivery" />
                            </Form.Label>
                            <GologsInput
                                type="autocomplete"
                                variant="primary"
                                items={this.props.list.ports}
                                value={
                                    this.props.state
                                        ? this.props.state.portOfDelivery
                                        : ""
                                }
                                onFocus={e => {
                                    this.props.onBlDataFocused(
                                        "portOfDelivery"
                                    );
                                }}
                                onChange={e => {
                                    this.props.onBlDataChange(
                                        "portOfDelivery",
                                        e.target.value
                                    );
                                }}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>

                <Row className="mt-4">
                    {this.props.jobStatus === true && (
                        <div className="col-md-12 d-flex justify-content-end">
                            <GologsButton
                                size="small"
                                variant="secondary"
                                onClick={this.props.addContainer}
                                content={
                                    <>
                                        <GeneralTranslation
                                            slug="add"
                                            className="mr-1"
                                        />
                                        <GeneralTranslation slug="container" />
                                    </>
                                }
                            />
                        </div>
                    )}
                </Row>
                <Form className="mt-2 col-lg-12">
                    <Row>
                        <Form.Label column lg={2}>
                            {"Container No"}
                        </Form.Label>
                        <Form.Label column lg={2}>
                            {"Seal No"}
                        </Form.Label>
                        <Form.Label column lg={2}>
                            {"Size Type"}
                        </Form.Label>
                        <Form.Label column lg={4}>
                            {"Container Type"}
                        </Form.Label>
                        <Form.Label
                            column
                            lg={this.props.jobStatus === true ? 1 : 2}
                        >
                            {"Load Type"}
                        </Form.Label>
                        {this.props.jobStatus === true && (
                            <Form.Label column lg={1}></Form.Label>
                        )}
                    </Row>
                </Form>
                <hr />
                {/* <this.Containers data={this.props.data} /> */}
                {this.props.data.map((key, i) => (
                    <Form className="col-lg-12">
                        <Row>
                            <Form.Label column lg={2}>
                                <input
                                    className="form-control"
                                    value={key.containerNumber}
                                    readOnly={!key.editable}
                                    onChange={e => {
                                        this.props.onContainerDataChange(
                                            key.id,
                                            "containerNumber",
                                            e.target.value
                                        );
                                    }}
                                />
                            </Form.Label>
                            <Form.Label column lg={2}>
                                <input
                                    className="form-control"
                                    value={key.sealNumber}
                                    readOnly={!key.editable}
                                    onChange={e => {
                                        this.props.onContainerDataChange(
                                            key.id,
                                            "sealNumber",
                                            e.target.value
                                        );
                                    }}
                                />
                            </Form.Label>
                            <Form.Label column lg={2}>
                                <GologsInput
                                    type="autocomplete"
                                    variant="primary"
                                    items={this.props.list.containerSizes}
                                    value={key.sizeType}
                                    readonly={!key.editable}
                                    onChange={e => {
                                        this.props.onContainerDataChange(
                                            key.id,
                                            "sizeType",
                                            e.target.value
                                        );
                                    }}
                                />
                            </Form.Label>
                            <Form.Label column lg={4}>
                                <GologsInput
                                    type="autocomplete"
                                    variant="primary"
                                    items={this.props.list.containerTypes}
                                    value={key.containerType}
                                    readonly={!key.editable}
                                    onChange={e => {
                                        this.props.onContainerDataChange(
                                            key.id,
                                            "containerType",
                                            e.target.value
                                        );
                                    }}
                                />
                            </Form.Label>
                            <Form.Label
                                column
                                lg={this.props.jobStatus === true ? 1 : 2}
                            >
                                <input
                                    className="form-control"
                                    value={key.jenisMuat}
                                    readOnly={!key.editable}
                                    onChange={e => {
                                        this.props.onContainerDataChange(
                                            key.id,
                                            "jenisMuat",
                                            e.target.value
                                        );
                                    }}
                                />
                            </Form.Label>
                            {this.props.jobStatus === true && (
                                <Form.Label column lg={1}>
                                    <GologsButton
                                        size="tiny"
                                        variant="danger"
                                        onClick={() => {
                                            this.props.removeContainer(key.id);
                                        }}
                                        content={
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </>
                                        }
                                    />
                                </Form.Label>
                            )}
                        </Row>
                    </Form>
                ))}
                <Form className="mt-5 mb-5 col-lg-12">
                    <Form.Row>
                        <Form.Group as={Col} lg={4}>
                            <Form.Label>
                                <GeneralTranslation slug="inviteAndNotifyPeople" />
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={this.props.notifyEmailChange}
                                value={this.props.notifyEmailValue}
                            />
                            <EmailSeparatedSemicolon />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        );
    }
}

export default ResponseForm;
