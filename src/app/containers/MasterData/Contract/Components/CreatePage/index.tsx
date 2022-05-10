import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import GologsInput from "../../../../../components/Input/GologsInput";
import GologsAlert from "../../../../../components/Alert/GologsAlert";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { FormModal } from "../../../../../components/Modal/Form/Loadable";
import { CargoOwnerInput } from "../../../../../components/Input/CargoOwner/Loadable";
import { ForwarderInput } from "../../../../../components/Input/Forwarder/Loadable";
import { ServiceInput } from "../../../../../components/Input/Service/Loadable";

type IProps = {
    button: any;
    data: any;
    onDataChange: any;
    option: any;
    onOptionChange: any;
    onSubmit: any;
    id?: any;
};

export default class CreatePage extends React.Component<IProps> {
    state = {
        alert: {
            success: false,
            danger: false
        }
    };

    onSubmit = async () => {
        this.setState({disabled: {
            submit: true
        }})
        
        try {
            if (this.props.id) {
                await this.props.onSubmit(this.props.id);
            } else {
                await this.props.onSubmit();
            }
            this.setState({alert: {
                success: true
            }})
            setInterval(() => {
                this.setState({alert: {
                    success: false
                }})
            }, 4000);
        } catch(e) {
            this.setState({alert: {
                danger: true
            }})
            setInterval(() => {
                this.setState({alert: {
                    danger: false
                }})
            }, 4000);
            
        }
        this.setState({disabled: {
            submit: false
        }})
    }
    
    render() {
        return (
            <>
                <FormModal
                    titleSlug={
                        this.props.id
                            ? "masterData.contract.edit"
                            : "masterData.contract.add"
                    }
                    confirmSlug={this.props.id ? "save" : "add"}
                    button={this.props.button}
                    onConfirm={this.onSubmit}
                    isUseErrorDefault={true}
                    content={
                        <>
                            <Row className="mt-3">
                                <Col sm="12" md="6">
                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="contractNumber"
                                            value={
                                                this.props.data.contractNumber
                                            }
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "contractNumber",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <ForwarderInput
                                            translation="firstParty"
                                            value={this.props.option.forwarder}
                                            onChange={e => {
                                                this.props.onOptionChange(
                                                    "forwarder",
                                                    e
                                                );
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="forwarderOrPpjkEmail"
                                            value={this.props.data.emailPPJK}
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "emailPPJK",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <CargoOwnerInput
                                            translation="secondParty"
                                            value={this.props.option.cargoOwner}
                                            onChange={e => {
                                                this.props.onOptionChange(
                                                    "cargoOwner",
                                                    e
                                                );
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <ServiceInput
                                            showAsterisk={true}
                                            value={this.props.option.services}
                                            onChange={e => {
                                                this.props.onOptionChange(
                                                    "services",
                                                    e
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col sm="12" md="6">
                                    <Form.Group>
                                        <GeneralTranslation slug="contractPeriod" />

                                        <Row className="mt-2">
                                            <Col xs="12" md="6">
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="from"
                                                    variant="primary"
                                                    type="date"
                                                    value={
                                                        this.props.data
                                                            .startDate
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "startDate",
                                                            e
                                                        );
                                                    }}
                                                />
                                            </Col>

                                            <Col xs="12" md="6">
                                                <GologsInput
                                                    placeholderByTranslation={
                                                        true
                                                    }
                                                    translation="to"
                                                    variant="primary"
                                                    type="date"
                                                    value={
                                                        this.props.data.endDate
                                                    }
                                                    onChange={e => {
                                                        this.props.onDataChange(
                                                            "endDate",
                                                            e
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <GologsInput
                                            placeholderByTranslation={true}
                                            translation="billingPeriod"
                                            value={
                                                this.props.data.billingPeriod
                                            }
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "billingPeriod",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <GologsInput
                                            type="number"
                                            placeholderByTranslation={true}
                                            translation="priceRate"
                                            value={this.props.data.priceRate}
                                            onChange={e => {
                                                this.props.onDataChange(
                                                    "priceRate",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    }
                />

                {this.state.alert.success && (
                    <GologsAlert
                        variant="success"
                        slug="responseMessage.submitSuccess"
                    />
                )}
            </>
        );
    }
}
