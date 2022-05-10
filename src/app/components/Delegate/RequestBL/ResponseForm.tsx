import React, { Component } from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { Message, MessageTitle } from "../../../../styles/Result";

interface IProps {
  notifyEmailChange?: any;
  notifyEmailValue?: any;
  data?: any;
  SLName?: any;
  jobStatus?: any;
}

class ResponseForm extends Component<IProps> {
  ItemContainer = (props: IProps) => {
    return (
      <Form className="col-md-12">
        <Row>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.container_no : ""}
              readOnly
            />
          </Form.Label>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.noSeal : ""}
              readOnly
            />
          </Form.Label>
          <Form.Label column sm={3}>
            <input
              className="form-control"
              value={props.data ? props.data.container_size : ""}
              readOnly
            />
          </Form.Label>
          <Form.Label column sm={3}>
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
        <Form className="col-md-12">
          <Form.Row className="mt-3">
            <Message error={this.props.jobStatus}>
              <MessageTitle>
                {this.props.jobStatus === true ? "Job Not Found" : "Job Found"}
              </MessageTitle>
            </Message>
          </Form.Row>
          <Form.Row className="mt-3">
            <Form.Group as={Col} sm={4}>
              <Form.Label>{"Shipping Line"}</Form.Label>
              <Form.Control
                type="text"
                value={this.props.SLName ? this.props.SLName : ""}
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={6}>
              <Form.Label>{"B/L Number"}</Form.Label>
              <Form.Control
                type="text"
                value={
                  this.props.data && this.props.data[0]
                    ? this.props.data[0].bl_no
                    : ""
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <Form.Label>{"Notify Party"}</Form.Label>
              <Form.Control
                type="text"
                value={
                  this.props.data && this.props.data[0]
                    ? this.props.data[0].notify_penerima
                    : ""
                }
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={6}>
              <Form.Row>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>{"Vessel"}</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      this.props.data && this.props.data[0]
                        ? this.props.data[0].nama_sarana_pengangkut
                        : ""
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>{"Voyage Number"}</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      this.props.data && this.props.data[0]
                        ? this.props.data[0].no_voyage
                        : ""
                    }
                  />
                </Form.Group>
              </Form.Row>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <Form.Label>{"Consignee"}</Form.Label>
              <Form.Control
                type="text"
                value={
                  this.props.data && this.props.data[0]
                    ? this.props.data[0].consignee_pemilik
                    : ""
                }
              />
            </Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={6}>
              <Form.Label>{"Port of Loading"}</Form.Label>
              <Form.Control
                type="text"
                value={
                  this.props.data && this.props.data[0]
                    ? this.props.data[0].pelabuhan_muat
                    : ""
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}></Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={6}>
              <Form.Label>{"Port Of Discharge"}</Form.Label>
              <Form.Control
                type="text"
                value={
                  this.props.data && this.props.data[0]
                    ? this.props.data[0].pelabuhan_bongkar
                    : ""
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}></Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={6}>
              <Form.Label>{"Place of Delivery"}</Form.Label>
              <Form.Control
                type="text"
                value={
                  this.props.data && this.props.data[0]
                    ? this.props.data[0].pelabuhan_bongkar
                    : ""
                }
              />
            </Form.Group>
          </Form.Row>
        </Form>
        <Form className="mt-5 col-md-12">
          <Row>
            <Form.Label column sm={3}>
              {"Container No"}
            </Form.Label>
            <Form.Label column sm={3}>
              {"Seal No"}
            </Form.Label>
            <Form.Label column sm={3}>
              {"Size Type"}
            </Form.Label>
            <Form.Label column sm={3}>
              {"Container Type"}
            </Form.Label>
          </Row>
        </Form>
        {/* <this.Containers data={this.props.data} /> */}
        {this.props.data.map((key, i) => (
          <Form className="col-md-12">
            <Row>
              <Form.Label column sm={3}>
                <input
                  className="form-control"
                  value={key.container_no}
                  readOnly
                />
              </Form.Label>
              <Form.Label column sm={3}>
                <input className="form-control" value={key.noSeal} readOnly />
              </Form.Label>
              <Form.Label column sm={3}>
                <input
                  className="form-control"
                  value={key.container_size}
                  readOnly
                />
              </Form.Label>
              <Form.Label column sm={3}>
                <input
                  className="form-control"
                  value={key.container_type}
                  readOnly
                />
              </Form.Label>
            </Row>
          </Form>
        ))}
        <Form className="mt-5 mb-5 col-md-12">
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <Form.Label>Invite and Notify People</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.props.notifyEmailChange}
                value={this.props.notifyEmailValue}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default ResponseForm;
