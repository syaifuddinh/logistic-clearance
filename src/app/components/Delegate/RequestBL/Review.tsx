import React, { Component } from "react";
import { Form, Col, Row, Alert } from "react-bootstrap";
import { TitleView, TextView, TextLarge } from "../../../../styles/Wizard";
import Dropfile from "../../Dropfile/Dropfile";

interface IProps {
  data?: any;
}

export default class Review extends Component<IProps> {
  state = {
    blFile: null,
    suratKuasaFile: null,
    suratKontainerFile: null,
    letterIndemnityFile: null
  };

  constructor(props) {
    super(props);
    const cargoOwnerDo = window.localStorage.getItem("cargoOwnerDo");
    if (cargoOwnerDo) {
      const params = JSON.parse(cargoOwnerDo);

      this.changeState("suratKuasaFile", params.suratKuasaFile);
      this.changeState("blFile", params.blFile);
      this.changeState("suratKontainerFile", params.suratKontainerFile);
      this.changeState("letterIndemnityFile", params.letterIndemnityFile);
    }
  }

  changeState = (key, value) => {
    let state = this.state;
    state[key] = value;
    this.setState(state);
  };

  LabelContainer = () => {
    return (
      <Form className="mt-5 col-md-12">
        <Row>
          <Form.Label column sm={3}>
            Container No
          </Form.Label>
          <Form.Label column sm={3}>
            Seal No
          </Form.Label>
          <Form.Label column sm={3}>
            Size Type
          </Form.Label>
          <Form.Label column sm={3}>
            Container Type
          </Form.Label>
        </Row>
      </Form>
    );
  };

  ItemContainer = (props: IProps) => {
    return (
      <Form className="col-md-12">
        <Row>
          <Form.Label column sm={3}>
            {props.data ? props.data.container_no : ""}{" "}
          </Form.Label>
          <Form.Label column sm={3}>
            {props.data ? props.data.noSeal : ""}
          </Form.Label>
          <Form.Label column sm={3}>
            {props.data ? props.data.container_size : ""}
          </Form.Label>
          <Form.Label column sm={3}>
            {props.data ? props.data.container_type : ""}
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
      <>
        <Form className="col-md-12 mt-5 ml-3">
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <TitleView>Shipping Line</TitleView>
              <TextView>{this.props.data.SLName}</TextView>
            </Form.Group>
            <Form.Group as={Col} sm={4}>
              <TitleView>Shipping Line Email</TitleView>
              <TextView>{this.props.data.email}</TextView>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <TitleView>Review Request</TitleView>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <TextLarge>-</TextLarge>
            </Form.Group>
            <Form.Group as={Col} sm={4}>
              <TextLarge>Delivery Order</TextLarge>
            </Form.Group>
            <Form.Group as={Col} sm={3}>
              <TextLarge>BL No.</TextLarge>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4} />
            <Form.Group as={Col} sm={4} />
            <Form.Group as={Col} sm={3}>
              <TextLarge>{this.props.data.blNumber}</TextLarge>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={11}>
              <hr />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <TitleView>Shipper/Exporter</TitleView>
              <TextView>-</TextView>
              <hr />
            </Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={4}>
              <Form.Row>
                <Form.Group as={Col} sm={6}>
                  <TitleView>Vessel</TitleView>
                  <TextView>
                    {this.props.data.dataContainers[0]
                      ? this.props.data.dataContainers[0].notify_penerima
                      : ""}
                  </TextView>
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                  <TitleView>Voyage Number</TitleView>
                  <TextView>
                    {this.props.data.dataContainers[0]
                      ? this.props.data.dataContainers[0].no_voyage
                      : ""}
                  </TextView>
                </Form.Group>
              </Form.Row>
              <hr />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <TitleView>Consignee</TitleView>
              <TextView>
                {this.props.data.dataContainers[0]
                  ? this.props.data.dataContainers[0].consignee_pemilik
                  : ""}
              </TextView>
            </Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={4}>
              <TitleView>Port of Loading</TitleView>
              <TextView>
                {this.props.data.dataContainers[0]
                  ? this.props.data.dataContainers[0].pelabuhan_muat
                  : ""}
              </TextView>
              <hr />
              <TitleView>Port of Discharge</TitleView>
              <TextView>
                {this.props.data.dataContainers[0]
                  ? this.props.data.dataContainers[0].pelabuhan_bongkar
                  : ""}
              </TextView>
            </Form.Group>
          </Form.Row>
          <Form.Group as={Col} sm={11}>
            <hr />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} sm={4}>
              <TitleView>Notify Party</TitleView>
              <TextView>
                {/* {this.props.data.dataContainers[0]
                  ? this.props.data.dataContainers[0].notify_penerima
                  : ""} */}
                {this.props.data.notifyEmail}
              </TextView>
            </Form.Group>
            <Form.Group as={Col} sm={2} />
            <Form.Group as={Col} sm={4}>
              <TitleView>Place of Delivery</TitleView>
              <TextView>
                {this.props.data.dataContainers[0]
                  ? this.props.data.dataContainers[0].pelabuhan_bongkar
                  : ""}
              </TextView>
            </Form.Group>
          </Form.Row>

          <Form className="col-md-12">
            <h4 className="mt-3 mb-3">Upload Document</h4>
            <Form.Row>
              <Form.Group as={Col} sm={4}>
                <Form.Label>MBL/HBL File</Form.Label>
                <Dropfile
                  hideRemoveButton={true}
                  isPreview={true}
                  fileName={this.state.blFile}
                />
              </Form.Group>
              <Form.Group as={Col} sm={2} />
              <Form.Group as={Col} sm={4}>
                <Form.Label>Letter of Indemnity</Form.Label>
                <Dropfile
                  hideRemoveButton={true}
                  isPreview={true}
                  fileName={this.state.letterIndemnityFile}
                />
              </Form.Group>
              <Form.Group as={Col} sm={1} />
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm={4}>
                <Form.Label>Surat Peminjaman Kontainer File</Form.Label>
                <Dropfile
                  fileName={this.state.suratKontainerFile}
                  hideRemoveButton={true}
                  isPreview={true}
                />
              </Form.Group>
              <Form.Group as={Col} sm={2} />
              <Form.Group as={Col} sm={4}>
                <Form.Label>Surat Kuasa File</Form.Label>
                <Dropfile
                  fileName={this.state.suratKuasaFile}
                  hideRemoveButton={true}
                  isPreview={true}
                />
              </Form.Group>
              <Form.Group as={Col} sm={1} />
            </Form.Row>
          </Form>

          <Form.Row>
            <Form className="mt-5 col-md-12">
              <Row>
                <Form.Label column sm={3}>
                  Container No
                </Form.Label>
                <Form.Label column sm={3}>
                  Seal No
                </Form.Label>
                <Form.Label column sm={3}>
                  Size Type
                </Form.Label>
                <Form.Label column sm={3}>
                  Container Type
                </Form.Label>
              </Row>
            </Form>
            <Form.Group as={Col} sm={11}>
              <hr />
            </Form.Group>
            {/* <this.Containers data={this.props.data.dataContainers} /> */}
            {this.props.data.dataContainers.map((key, i) => (
              <Form className="col-md-12">
                <Row>
                  <Form.Label column sm={3}>
                    {key.container_no}
                  </Form.Label>
                  <Form.Label column sm={3}>
                    {key.noSeal}
                  </Form.Label>
                  <Form.Label column sm={3}>
                    {key.container_size}
                  </Form.Label>
                  <Form.Label column sm={3}>
                    {key.container_type}
                  </Form.Label>
                </Row>
              </Form>
            ))}
          </Form.Row>
          <br />
        </Form>
      </>
    );
  }
}
