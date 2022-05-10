import React, { Component } from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsIcon } from "../Icon/Loadable";
import { GologsImage } from "../Image/Loadable";
import { GologsButton } from "../Button/Loadable";
import { DirectDebit } from "../Collapse/DirectDebit/Loadable";
import { VirtualAccount } from "../Collapse/VirtualAccount/Loadable";
import { ProofOfPayment } from "../Collapse/ProofOfPayment/Loadable";
import GologsInput from "../Input/GologsInput";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import NumberFormat from "react-number-format";

type IDetails = {
    name: string;
    amount: number;
};

type IProps = {
    titleSlug: string;
    dueDate: string;
    grandtotal: number;
    details: IDetails[];
    onDownloadProformaInvoice: any;
    onProceedPayment: any;
    onProofOfPaymentDrop: any;
    isShowProceedPaymentButton: boolean;
};

export default class ProformaInvoice extends Component<IProps> {
                   state = {
                       dueDate: "",
                       remainingTime: "",
                       interval: 0,
                       fileName: ""
                   };

                   handleProofOfPaymentDrop = (file, fileName) => {
                       this.setState({ fileName: fileName });
                       this.props.onProofOfPaymentDrop(file, fileName);
                   };

                   constructor(props) {
                       super(props);

                       setTimeout(() => {
                           let dueDate: any = new Date(this.props.dueDate);
                           dueDate = moment(dueDate);
                           let formattedDueDate = dueDate.format(
                               "DD MMM YYYY, HH:mm"
                           );
                           this.setState({ dueDate: formattedDueDate });
                       }, 200);
                   }

                   countRemainingTime() {
                       let dueDate: any = new Date(this.props.dueDate);
                       dueDate = moment(dueDate);
                       let now: any = moment(new Date());

                       let timeleft: number = dueDate.diff(now);

                       let hours: number = Math.floor(
                           (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                       );
                       let minutes: number = Math.floor(
                           (timeleft % (1000 * 60 * 60)) / (1000 * 60)
                       );
                       let seconds: number = Math.floor(
                           (timeleft % (1000 * 60)) / 1000
                       );
                       let remainingTime: string = "";
                       if(hours > 0) {
                           remainingTime = hours + ":" + minutes + ":" + seconds;
                       } else {
                           remainingTime = "00:00:00";
                       }
                       this.setState({ remainingTime: remainingTime });
                   }

                   componentDidMount() {
                       let i: any = setInterval(() => {
                           this.countRemainingTime();
                       }, 1000);
                       this.setState({ interval: i });
                   }
                   componentWillUnmount() {
                       clearInterval(this.state.interval);
                   }

                   render() {
                       return (
                           <>
                               <div className="mb-5 h-35px">
                                   <GeneralTranslation
                                       slug={this.props.titleSlug}
                                       className="fs-18px font-weight-light-bolder d-inline-block float-left"
                                   />

                                   <GologsButton
                                       variant="success"
                                       icon="download.svg"
                                       className="float-right"
                                       onClick={
                                           this.props.onDownloadProformaInvoice
                                       }
                                       size="small"
                                       content={
                                           <>
                                               <GeneralTranslation
                                                   slug="download"
                                                   className="mr-1"
                                               />{" "}
                                               <GeneralTranslation slug="proformaInvoice" />
                                           </>
                                       }
                                   />
                               </div>

                               <Row className="mt-5 d-flex rounded-20px bg-semi-primary">
                                   <Col className="p-4" md="8" xs={6}>
                                       <GeneralTranslation
                                           slug="completeYourPaymentBefore"
                                           className="md-fs-14px fs-11px mb-3"
                                       />
                                       <div className="md-fs-24px fs-20px">
                                           {this.state.dueDate}
                                       </div>
                                   </Col>
                                   <Col
                                       className={
                                           "p-4 rounded-20px text-white d-flex align-items-center justify-content-center " +
                                           (this.state.remainingTime ===
                                           "00:00:00"
                                               ? "bg-danger"
                                               : "bg-primary")
                                       }
                                       md="4"
                                       xs={6}
                                   >
                                       <GologsIcon
                                           width={48}
                                           height={48}
                                           name="whiteClock.svg"
                                       />
                                       <div className="ml-2">
                                           <GeneralTranslation
                                               slug="remainingTime"
                                               className="md-fs-14px fs-11px"
                                           />
                                           <div className="font-weight-light-bolder md-fs-24px fs-20px">
                                               {this.state.remainingTime}
                                           </div>
                                       </div>
                                   </Col>
                               </Row>
                               {this.state.remainingTime !== "00:00:00" && (
                                   <Row className="mt-5 d-flex">
                                       <Col xs={12} md="7">
                                           <div>
                                               <GeneralTranslation
                                                   slug="paymentMethod"
                                                   className="fs-16px text-primary-dark"
                                               />
                                           </div>

                                           <div className="mt-3">
                                               <DirectDebit />
                                           </div>

                                           <div className="mt-3">
                                               <VirtualAccount />
                                           </div>

                                           <div className="border-1 border-fourth-gray rounded-20px mt-3">
                                               <div className="border-bottom border-fourth-gray rounded-20px p-3">
                                                   <GeneralTranslation
                                                       slug="creditLimit"
                                                       className="d-block fs-18px font-weight-light-bolder text-dark"
                                                   />

                                                   <GeneralTranslation
                                                       slug="payWithCreditLimit"
                                                       className="d-block fs-16px text-dark mt-2"
                                                   />
                                               </div>
                                               <div className="mt-3 p-3">
                                                   <div className="fs-14px">
                                                       <div className="mb-2 text-capitalize">
                                                           <GeneralTranslation
                                                               slug="pleaseEnter"
                                                               className="mr-1 text-dark"
                                                           />
                                                           <GeneralTranslation
                                                               slug="contractNumber"
                                                               className="mb-2 mr-1 text-dark"
                                                           />
                                                       </div>

                                                       <GologsInput
                                                           placeholderByTranslation={
                                                               true
                                                           }
                                                           translation="contractNumber"
                                                           hidePrefix={true}
                                                       />
                                                   </div>

                                                   <div className="mt-4 fs-12px text-dark font-weight-light-bold">
                                                       <GeneralTranslation
                                                           slug="dontHave"
                                                           className="mr-1"
                                                       />
                                                       <GeneralTranslation
                                                           slug="contractNumber"
                                                           className="mr-1"
                                                       />
                                                       <span className="mr-1">
                                                           ?
                                                       </span>
                                                       <GeneralTranslation
                                                           slug="requestHere"
                                                           className="mr-1 text-primary"
                                                       />
                                                   </div>
                                               </div>
                                           </div>

                                           <div className="border-1 border-fourth-gray rounded-20px mt-3 p-3">
                                               <GeneralTranslation
                                                   slug="creditCard"
                                                   className="d-block fs-18px font-weight-light-bolder text-dark"
                                               />

                                               <div className="mt-2">
                                                   <GologsImage
                                                       name="visa.svg"
                                                       width="auto"
                                                       height={15}
                                                       className="mr-2"
                                                   />

                                                   <GologsImage
                                                       name="mastercard.svg"
                                                       width="auto"
                                                       height={15}
                                                       className="mr-2"
                                                   />
                                               </div>
                                           </div>

                                           <div className="mt-3">
                                               <ProofOfPayment
                                                   onProofOfPaymentDrop={
                                                       this
                                                           .handleProofOfPaymentDrop
                                                   }
                                               />
                                           </div>
                                       </Col>

                                       <Col xs={12} md="5">
                                           <div>
                                               <GeneralTranslation
                                                   slug="paymentDetail"
                                                   className="fs-16px text-primary-dark"
                                               />
                                           </div>

                                           <div className="border-1 border-fourth-gray rounded-20px mt-3 p-4">
                                               <div className="w-100 d-flex align-items-start">
                                                   <div className="d-inline-block w-60">
                                                       <GeneralTranslation
                                                           slug="description"
                                                           className="d-block fs-14px text-dark text-capitalize"
                                                       />

                                                       <div className="mt-4 fs-14px text-dark">
                                                           {this.props.details.map(
                                                               v => (
                                                                   <div className="mt-2">
                                                                       {v.name}
                                                                   </div>
                                                               )
                                                           )}
                                                       </div>
                                                   </div>

                                                   <div className="d-inline-block w-40 text-right">
                                                       <GeneralTranslation
                                                           slug="amount"
                                                           className="d-block fs-14px text-dark text-capitalize"
                                                       />

                                                       <div className="mt-4 fs-14px text-dark">
                                                           {this.props.details.map(
                                                               v => (
                                                                   <div className="mt-2">
                                                                       <NumberFormat
                                                                           value={
                                                                               v.amount
                                                                           }
                                                                           displayType={
                                                                               "text"
                                                                           }
                                                                           thousandSeparator={
                                                                               true
                                                                           }
                                                                           prefix={
                                                                               "Rp "
                                                                           }
                                                                       />
                                                                   </div>
                                                               )
                                                           )}
                                                       </div>
                                                   </div>
                                               </div>

                                               <div className="w-100 d-flex align-items-start">
                                                   <div className="d-inline-block w-40">
                                                       <div className="mt-4 fs-24px text-dark">
                                                           <GeneralTranslation slug="total" />
                                                       </div>
                                                   </div>

                                                   <div className="d-inline-block w-60 text-right">
                                                       <div className="mt-4 fs-24px font-weight-light-bolder text-dark">
                                                           <NumberFormat
                                                               value={
                                                                   this.props
                                                                       .grandtotal
                                                               }
                                                               displayType={
                                                                   "text"
                                                               }
                                                               thousandSeparator={
                                                                   true
                                                               }
                                                               prefix={"Rp "}
                                                           />
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>

                                           {this.props
                                               .isShowProceedPaymentButton ===
                                               true && (
                                               <div className="mt-3">
                                                   <GologsButton
                                                       variant="primary"
                                                       className="w-100"
                                                       onClick={
                                                           this.props
                                                               .onProceedPayment
                                                       }
                                                       showLoading={true}
                                                       content={
                                                           <GeneralTranslation
                                                               slug={
                                                                   !this.state
                                                                       .fileName
                                                                       ? "proceedPayment"
                                                                       : "upload"
                                                               }
                                                           />
                                                       }
                                                   />
                                               </div>
                                           )}
                                       </Col>
                                   </Row>
                               )}

                               {this.state.remainingTime === "00:00:00" && (
                                   <Row className="mt-60px">
                                       <Col xs={12} className="d-flex flex-column align-items-center">
                                           <GeneralTranslation
                                               slug="description.paymentExpired"
                                               className="d-block text-danger font-weight-light-bolder fs-24px"
                                           />
                                           <GeneralTranslation
                                               slug="instruction.retryPaymentOrChooseMethod"
                                               className="d-block mt-6px fs-18px"
                                           />
                                           <GologsButton
                                               variant="primary"
                                               contentByTranslation={true}
                                               translation="instruction.retryPayment"
                                               className="mt-56px"
                                           />
                                       </Col>
                                   </Row>
                               )}
                           </>
                       );
                   }
               }
