import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  Title,
  RowX,
  Column,
  Item,
  ItemTitle,
  ButtonX,
  Footer,
  ButtonO
} from "../../../styles/Wizard";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import MShippingLine from "../../../endpoints/ShippingLine";
import MDeliveryOrder from "../../../endpoints/DeliveryOrder";
import { RegExpKey } from "../../../lib/Constants";
import {
  Container,
  CircleInner,
  CircleOuter,
  Rectangle,
  CMark
} from "../../../styles/WizardBottom";

import iCheck from "../../../assets/icons/check.svg";
import ResponseForm from "./RequestBL/ResponseForm";
import Review from "./RequestBL/Review";
import SupportingDocuments from "./RequestBL/SupportingDocuments";
import RequestForm from "./RequestBL/RequestForm";

type MyState = {
    mShippingLine?: any;
    selectedSL?: any;
    showResult?: any;
    reqBLNo?: any;
    reqBLDate?: any;
    blNumber?: any;
    blDate?: any;
    posNumber?: any;
    showToast?: any;
    jobFound?: any;
    email?: any;
    reqEmail?: any;
    reqSL?: any;
    SL?: any;
    SLName?: any;
    reqEmailMessage?: any;
    reqFieldMessage?: any;
    dataContainers?: any;
    btnSubmitClicked?: any;
    stepper?: any;
    fileNames?: any;
    notifyEmail?: any;
    showModal?: any;
    titleModal?: any;
    subTitleModal?: any;
};

export default class RequestBL extends Component<MyState> {
    state: MyState = {
        mShippingLine: [],
        dataContainers: [],
        selectedSL: "Select Shipping Line",
        showResult: false,
        reqBLNo: false,
        reqBLDate: false,
        reqEmail: false,
        reqSL: false,
        showToast: false,
        jobFound: false,
        blNumber: "",
        blDate: "",
        posNumber: "",
        email: "",
        reqEmailMessage: "",
        SLName: "",
        btnSubmitClicked: false,
        stepper: 0,
        fileNames: "",
        notifyEmail: "",
        showModal: false,
        titleModal: "",
        subTitleModal: ""
    };

    componentDidMount() {
        try { 
            MShippingLine.getAll().then(data => {
                let mShippingLine:any  = data.data.shippingLines;
                mShippingLine = mShippingLine.map((v) => {
                    let r:any = {};
                    r.label = v.shippingLineName;
                    r.value = v.shippingLineName;
                    
                    return r;
                })
                this.setState({ mShippingLine: mShippingLine });
            });
            window.localStorage.removeItem("cargoOwnerDo");
        } catch (e) {
            
        }
    }

    onSelectedChange = e => {
        this.setState({
            selectedSL: e,
            SLName: e.shippingLineName
        });
    };

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };

  onDateChange = (date, e) => {
    this.setState({ blDate: date });
  };

  onBLChange = e => {
    this.setState({ blNumber: e.target.value });
  };

  onSubmit = () => {
    var pattern = new RegExp(RegExpKey);
    if (!this.state.email) {
      this.setState({ reqEmailMessage: "this field is required" });
    } else if (!pattern.test(this.state.email)) {
      this.setState({ reqEmailMessage: "email is not valid" });
    } else {
      this.setState({ reqEmailMessage: "" });
    }

    this.setState({
      reqBLNo: !this.state.blNumber,
      reqBLDate: !this.state.blDate,
      reqEmail: !this.state.email || !pattern.test(this.state.email),
      reqSL: this.state.selectedSL === "Select Shipping Line"
    });

    if (
      this.state.blNumber &&
      this.state.blDate &&
      this.state.selectedSL &&
      this.state.email
    ) {
      let blNumber = this.state.blNumber;
      let blDate = moment(this.state.blDate).format("YYYYMMDD");
      let posNumber = this.state.posNumber;
      MDeliveryOrder.getBL(blNumber, blDate, posNumber)
        .then(data => {
          this.setState({
            showResult: true,
            dataContainers: data.data.containers,
            showToast: data.data.containers.length > 0 ? true : false
          });
        })
        .catch(error => {
          this.setState({
            showResult: true,
            dataContainer: [],
            showToast: false
          });
        });
      this.setState({ btnSubmitClicked: true });
    } else {
      this.setState({ btnSubmitClicked: false });
      this.setState({ reqFieldMessage: "this field is required" });
    }
  };

  skip = () => {
    window.location.href = "create-do-request";
  };

  handlePrev = () => {
    this.setState({ stepper: this.state.stepper - 1 });
  };

  handleNext = () => {
    this.setState({ stepper: this.state.stepper + 1 });
  };

  handleCloseModal = () => this.setState({ showModal: false });
  handleShowModal = () => this.setState({ showModal: true });

  onJobSubmit = () => {
    let authUser = localStorage.getItem("authUser");
    let jsonData: any = {};
    let containers: any = [];

    if (authUser) {
      jsonData = JSON.parse(authUser);
    }
    if (this.state.dataContainers) {
      this.state.dataContainers.forEach(item => {
        let container: any = {
          containerType: item.container_type,
          containerNo: item.container_no,
          sealNo: item.noSeal,
          containerSize: parseInt(item.container_size),
          grossWeight: 0,
          depoName: "",
          phoneNumber: ""
        };
        containers.push(container);
      });
    }

    let data = {
      username: jsonData.person.email,
      saveAsDraft: false,
      submited: true,
      deliveryOrder: {
        deliveryOrderType: "DIRECT",
        billOfLadingNumber: this.state.blNumber,
        billOfLadingDate: moment(this.state.blDate).toISOString(),
        shippingLineName: this.state.SLName,
        shippingLineEmail: this.state.email,
        vessel: this.state.dataContainers[0].nama_sarana_pengangkut,
        voyageNumber: this.state.dataContainers[0].no_voyage,
        consignee: this.state.dataContainers[0].consignee_pemilik,
        portOfLoading: this.state.dataContainers[0].pelabuhan_muat,
        portOfDischarge: this.state.dataContainers[0].pelabuhan_bongkar,
        portOfDelivery: this.state.dataContainers[0].pelabuhan_akhir,
        notifyPartyName: this.state.dataContainers[0].notify_penerima,
        notifyPartyAdress: "-"
      },
      containers: containers,
      documents: [
        {
          type: "",
          fileName: ""
        }
      ],
      notifyParties: [
        {
          emailAddress: this.state.notifyEmail
        }
      ]
    };

    MDeliveryOrder.submit(data)
      .then(data => {
        this.setState({
          titleModal: "Request DO Success!",
          subTitleModal: "Would you like to add new services?"
        });
        this.setState({ showModal: true });
      })
      .catch(error => {
        this.setState({
          titleModal: "Request DO Failed!",
          subTitleModal: error.response.data
        });
        this.setState({ showModal: true });
      });
  };

  handleChangeEmail = e => {};

  onNotifyEmailChange = e => {
    this.setState({ notifyEmail: e.target.value });
  };

  C1Mark = this.state.stepper >= 1 ? true : false;
  C2Mark = this.state.stepper >= 2 ? true : false;
  C3Mark = this.state.stepper >= 3 ? true : false;

  render() {
    return (
      <>
        <Container>
          <Title>{"Create New DO Request"}</Title>
          <RowX>
            <Column>
              <Item>
                <Rectangle show={false} />
                <CircleOuter active={true}>
                  <CMark src={iCheck} show={this.state.stepper >= 1} />
                  <CircleInner show={!(this.state.stepper >= 1)} />
                </CircleOuter>
                <Rectangle show={true} active={this.state.stepper >= 1} />
              </Item>
              <ItemTitle>{"Contract Number"}</ItemTitle>
            </Column>
            <Column>
              <Item>
                <Rectangle show={true} active={this.state.stepper >= 1} />
                <CircleOuter active={this.state.stepper >= 1}>
                  <CMark src={iCheck} show={this.state.stepper >= 2} />
                  <CircleInner show={!(this.state.stepper >= 2)} />
                </CircleOuter>
                <Rectangle show={true} active={this.state.stepper >= 2} />
              </Item>
              <ItemTitle>{"Upload Document"}</ItemTitle>
            </Column>
            <Column>
              <Item>
                <Rectangle show={true} active={this.state.stepper >= 2} />
                <CircleOuter active={this.state.stepper >= 2}>
                  <CMark src={iCheck} show={this.state.stepper >= 3} />
                  <CircleInner show={!(this.state.stepper >= 3)} />
                </CircleOuter>
                <Rectangle show={false} />
              </Item>
              <ItemTitle>{"Review Request"}</ItemTitle>
            </Column>
          </RowX>
          {this.state.stepper === 0 ? (
            <>
              <RequestForm
                selectedItems={this.state.mShippingLine}
                selectedValue={this.state.selectedSL}
                selectedChange={this.onSelectedChange}
                selectedError={this.state.reqSL}
                selectedErrorMessage={this.state.reqFieldMessage}
                emailValue={this.state.email}
                emailError={this.state.reqEmail}
                emailChange={this.onEmailChange}
                emailErrorMessage={this.state.reqEmailMessage}
                blNoValue={this.state.blNumber}
                blNoError={this.state.reqBLNo}
                blNoChange={this.onBLChange}
                blNoErrorMessage={this.state.reqFieldMessage}
                blDateError={this.state.reqBLDate}
                blDateValue={this.state.blDate}
                blDateChange={this.onDateChange}
                blDateErrorMessage={this.state.reqFieldMessage}
                btnSubmitRaised={this.onSubmit}
                btnSubmitClick={this.state.btnSubmitClicked}
              />

              {this.state.showResult ? (
                <ResponseForm
                  jobStatus={!this.state.showToast}
                  SLName={this.state.SLName}
                  data={this.state.dataContainers}
                  notifyEmailChange={this.onNotifyEmailChange}
                  notifyEmailValue={this.state.notifyEmail}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {this.state.stepper === 1 ? (
            <SupportingDocuments />
          ) : (
            ""
          )}
          {this.state.stepper === 2 ? <Review data={this.state} /> : ""}
          <Modal
            show={this.state.showModal}
            onHide={this.handleCloseModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <div className="d-flex flex-column p-5 align-items-center">
                <h1 className="font-weight-bold text-uppercase">
                  {this.state.titleModal}
                </h1>
                <p className="mt-4">{this.state.titleModal}</p>

                <Button
                  variant="secondary"
                  onClick={this.handleCloseModal}
                  style={{ borderRadius: "14mm" }}
                  className="mt-4 p-3 font-weight-bold w-50"
                >
                  {"Add Services"}
                </Button>
                <Button
                  variant="link"
                  onClick={this.skip}
                  style={{ borderRadius: "14mm" }}
                  className="mt-4 p-3 font-weight-bold w-50 text-dark"
                >
                  {"Skip for Now"}
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </Container>
        {this.state.showResult ? (
          <Footer>
            <ButtonO
              show={this.state.stepper > 0 && this.state.stepper <= 2}
              onClick={this.handlePrev}
            >
              {"Previous"}
            </ButtonO>
            <ButtonX
              show={this.state.stepper >= 0 && this.state.stepper < 2}
              onClick={this.handleNext}
            >
              {"Next"}
            </ButtonX>
            <ButtonX show={this.state.stepper === 2} onClick={this.onJobSubmit}>
              {"Submit"}
            </ButtonX>
          </Footer>
        ) : (
          ""
        )}
      </>
    );
  }
}
