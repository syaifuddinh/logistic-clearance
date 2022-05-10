import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { GeneralTranslation } from "../../Translation/Loadable";
import { RedAsterisk } from "../../RedAsterisk/Loadable";
import GologsInput from "../../Input/GologsInput";
import { GologsCheckbox } from "../../Input/Checkbox/Loadable";
import GologsTable from "../../Table/GologsTable";

interface IProps {
    data?: any;
    paidThru?: any;
    onPaidThruChange?: any;
    onContainerSelected?: any;
}

class ContainerForm extends Component<IProps> {
    state = {
        table: { 
            columnDefs: [],
            columns: [],
            data: []
        }
    }

    constructor(props) {
        super(props);
        let table:any = this.state.table
        table.columnDefs.push({ title:  ""  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="mblAwbNumber" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="vesselId" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="vesselName" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="voyageNumber" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerNumber" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerSize" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerType" />  })
        table.columnDefs.push({ title:  <GeneralTranslation slug="containerStatus" />  })

        table.columns.push({data: "action", className:"text-center"})
        table.columns.push({data: "mbl", className:"text-primary-gray font-weight-light-bold"})
        table.columns.push({
            data: "vesselNumber",
            className: "text-primary-gray font-weight-light-bold md-w-100px"
        });
        table.columns.push({data: "vesselName", className:"text-primary-gray font-weight-light-bold md-w-100px"})
        table.columns.push({data: "voyageNumber", className:"text-primary-gray font-weight-light-bold"})
        table.columns.push({data: "containerNumber", className:"text-primary-gray font-weight-light-bold md-w-200px"})
        table.columns.push({data: "containerSize", className:"text-primary-gray font-weight-light-bold md-w-90px"})
        table.columns.push({
            data: "containerType",
            className: "text-primary-gray font-weight-light-bold md-w-90px"
        });
        table.columns.push({data: "statusName", className:"text-primary-gray font-weight-light-bold md-w-200px"})

        table.data = this.props.data.containers

        table.data = table.data.map((v, i) => {
            if (v.isSuccess === true) {
                v.className = "bg-semi-success";
            } else if (v.isDanger === true) {
                v.className = "bg-semi-danger";
            } else if (v.isWarning === true) {
                v.className = "bg-semi-warning";
            }

            if (!v.isSuccess && !v.isDanger && !v.isWarning) {
                v.action = (
                    <GologsCheckbox
                        variant="primary"
                        value={v.id}
                        checked={v.checked}
                        onChange={this.props.onContainerSelected}
                    />
                );
            }
            return v
        })
        this.setState({table : table});

    }
    
    render() {
        return (
            <Container fluid>
                <Form className="mt-5 col-md-12 pb-4">
                    <span>
                        <Row className="mb-3">
                            <Form.Label as={Col} sm={4}>
                            <GeneralTranslation
                                slug="selectContainer"
                                className="fs-18px"
                            />
                            </Form.Label>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={12}>
                            <GologsTable
                                theadVariant="secondary"
                                hideNumbering={true}
                                hideSearch={true}
                                columnDefs={this.state.table.columnDefs}
                                data={this.state.table.data}
                                columns={this.state.table.columns}
                                overflowX="scroll"
                                width={1250}
                                isFloatingColumn={true}
                            />
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Form.Label as={Col} sm={12} md={6}>
                                <GologsInput
                                    labelSlug="paidThru"
                                    showAsterisk={true}
                                    placeholderByTranslation={true}
                                    translation={"paidThru"}
                                    variant="primary"
                                    type="date"
                                    value={this.props.paidThru}
                                    onChange={e => {
                                        this.props.onPaidThruChange(e);
                                    }}
                                />
                            </Form.Label>
                        </Row>
                    </span>
                </Form>
            </Container>
        );
    }
}

export default ContainerForm;
