import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { Container, Row, Col } from "react-bootstrap";
import HeaderItem from "./Components/HeaderItem";
import Request from "./Components/Request";
import Proforma from "./Components/Proforma";
import Payment from "./Components/Payment";
import Invoice from "./Components/Invoice";
import CustomTab from "./Components/CustomTab";
import DeliveryOrder  from "../../../../endpoints/DeliveryOrder";
import TransactionDelegate  from "../../../../endpoints/TransactionDelegate";
import Email  from "../../../../endpoints/Email";
import InTransit  from "../../../../endpoints/Master/InTransit";
import CargoOwner  from "../../../../endpoints/Company/CargoOwner";
import DeliveryOrderModel from "../../../../model/DeliveryOrder";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import GologsAlert from "../../../components/Alert/GologsAlert";
import { PopupMessage } from "../../../components/PopupMessage/Loadable";
import moment from "moment";
import { Redirect } from "react-router-dom";

export default class Show extends React.Component {
    state = {
        id: "",
        data: {
            jobNumber: "",
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            shippingLineEmail: "",
            notifyPeople: "",
            createdDate: "",
            createdBy: "",
            billOfLadingNumber: "",
            positionStatus: 0,
            isDelegate: false,
            deliveryOrderNotifies: [],
            deliveryOrderContainers: [],
            deliveryOrderLogs: []
        },
        containers: [],
        page: 0,
        proformaAmount: 0,
        proformaFile: null,
        proformaName: "",
        invoiceFile: null,
        invoiceName: "",
        doFile: null,
        blFile: "",
        suratKuasaFile: "",
        letterOfIndemnityFile: "",
        suratPeminjamanFile: "",
        doName: "",
        successMessage: "",
        isShowSuccessMessage: false,
        dangerMessage: "",
        isShowDangerMessage: false,
        buttonDisabled: false,
        isRedirectToHistory: false,
        showAfterReleaseModal: false,
        showUploadedProformaInvoiceModal: false,
        hasUploaded: {
            invoice: false,
            do: false,
            proformaInvoice: false
        },
        urlImage: "https://statik.tempo.co/?id=836405&width=650",
        proofOfPaymentUrl: ""
    };

    constructor(props) {
        super(props);
        const id = props.match.params.id;
        if (id) {
            this.getData(id);
        }
    }

    componentDidMount() {
        this.adjustTabByQuery();
    }

    adjustTabByQuery = () => {
        setTimeout(() => {
            let query: any = new URLSearchParams(
                window.location.search
            );
            let tab: any = query.get("tab");
            if (tab == 2) {
                this.setState({ page: 2 });
            } else if (tab == 4) {
                this.setState({ page: 4 });
            }
        }, 400);
    };

    closeUploadedProformaInvoiceModal = () => {
        this.setState({
            showUploadedProformaInvoiceModal: false
        });
    };

                   setProformaAmount = v => {
                       this.setState({ proformaAmount: v });
                   };

                   setProformaFile = v => {
                       this.setState({ proformaFile: v });
                   };

                   setProformaName = v => {
                       this.setState({ proformaName: v });
                   };

                   setInvoiceFile = v => {
                       this.setState({ invoiceFile: v });
                       if (!v) {
                           let hasUploaded: any = this.state.hasUploaded;
                           hasUploaded.invoice = false;
                           this.setState({ hasUploaded: hasUploaded });
                       }
                   };

                   setInvoiceName = v => {
                       this.setState({ invoiceName: v });
                   };

                   setDoFile = v => {
                       this.setState({ doFile: v });
                       if (!v) {
                           let hasUploaded: any = this.state.hasUploaded;
                           hasUploaded.do = false;
                           this.setState({ hasUploaded: hasUploaded });
                       }
                   };

                   updateToConfirmed = async () => {
                       try {
                           if (this.state.data.positionStatus < 2) {
                               await DeliveryOrder.updateStatus(
                                   2,
                                   "CONFIRMATION",
                                   this.state.data.jobNumber
                               );
                           }
                           this.changeState("page", this.state.page + 1);
                           this.showSuccessMessage(
                               "requestDO.confirmedMessage"
                           );
                       } catch (e) {
                           this.showDangerMessage(
                               "responseMessage.errorDefault"
                           );
                       }
                   };

    updateToDelegateProforma = async () => {
        const isDelegate = this.state.data.isDelegate;
        let id: any = this.state.id;
        if (isDelegate === true) {
            try {
                await TransactionDelegate.updateStatus(
                    id,
                    3,
                    DeliveryOrderModel.getDelegateStatusByIndex(3)
                );
                await TransactionDelegate.updateStatus(
                    id,
                    4,
                    DeliveryOrderModel.getDelegateStatusByIndex(4)
                );
            } catch (e) {}
        }
    };

    updateToProforma = async () => {
        try {
            let jobNumber: any = this.state.data.jobNumber;
            let blCode: any = this.state.data.billOfLadingNumber;
            let emails: any = [];
            if (this.state.data.customerEmail) {
                emails.push(this.state.data.customerEmail);
            }
            if (this.state.data.deliveryOrderNotifies) {
                this.state.data.deliveryOrderNotifies.forEach(
                    (param: any) => {
                        emails.push(param.email);
                    }
                );
            }

            if (this.state.data.shippingLineEmail) {
                emails.push(this.state.data.shippingLineEmail);
            }

            if (this.state.data.positionStatus < 3) {
                if (this.state.data.positionStatus == 2) {
                    await DeliveryOrder.updateStatus(
                        2,
                        "CONFIRMATION",
                        this.state.data.jobNumber
                    );
                }
                await DeliveryOrder.updateStatus(
                    3,
                    "PROPORMA_INVOICE",
                    this.state.data.jobNumber
                );
                await this.updateToDelegateProforma();
                await this.getData(this.state.id);
                this.setState({ page: 2 });
            }
            
            await this.sendProformaInvoiceNotification();
            let data: any = this.state.data;
            data.positionStatus = 2;
            this.setState({ data: data });
            this.setState({
                showUploadedProformaInvoiceModal: true
            });
        } catch (e) {
            this.showDangerMessage(
                "responseMessage.errorDefault"
            );
        }
    };
    
    sendProformaInvoiceNotification = async () => {
        let jobNumber: any = this.state.data.jobNumber;
        let blCode: any = this.state.data.billOfLadingNumber;
        let emails: any = [];
        let method: any = "";
        if (this.state.data.customerEmail) {
            emails.push(this.state.data.customerEmail);
        }
        if (this.state.data.deliveryOrderNotifies) {
            this.state.data.deliveryOrderNotifies.forEach((param: any) => {
                emails.push(param.email);
            });
        }
        if (this.state.data.shippingLineEmail) {
            emails.push(this.state.data.shippingLineEmail);
        }
        if(this.state.data.isDelegate === true) {
            method = "afterInvoiceDelegate";
        } else {
            method = "afterInvoice";
        }
        try {
            await Email[method](jobNumber, emails, blCode);
        } catch(e) {
            let jobCreatedDate: any = "";
            let serverMessage: string = e.message;
            let message: string =
                "System can't send email notification after Shipping Line submit Proforma Invoice";
            message += " - " + serverMessage;
            jobCreatedDate = new Date(this.state.data.createdDate);
            InTransit.store({
                service: "DO",
                status: "Proforma Invoice",
                jobNumber: jobNumber,
                jobCreatedDate: jobCreatedDate,
                errorMessage: message
            });
        }
    };
    
    hideDocumentModal = () => {};

    updateToDelegatePayment = async () => {
        const isDelegate = this.state.data.isDelegate;
        let id: any = this.state.id;
        if (isDelegate === true) {
            try {
                await TransactionDelegate.updateStatus(
                    id,
                    5,
                    DeliveryOrderModel.getDelegateStatusByIndex(5)
                );
            } catch (e) {}
        }
    };
    
    updateToPayment = async () => {
        try {
            let jobNumber: any = this.state.data.jobNumber;
            let blCode: any = this.state.data.billOfLadingNumber;
            let emails: any = [];
            if (this.state.data.customerEmail) {
                emails.push(this.state.data.customerEmail);
            }
            if (this.state.data.notifyPeople) {
                emails.push(this.state.data.notifyPeople);
            }

            if (this.state.data.positionStatus < 4) {
                await DeliveryOrder.updateStatus(
                    4,
                    "PAYMENT_CONFIRMATION",
                    this.state.data.jobNumber
                );
            }
            await this.updateToDelegatePayment();
            await Email.afterPayment(jobNumber, emails, blCode);
            await this.getData(this.state.id);
            this.showSuccessMessage(
                "responseMessage.paymentSubmited"
            );
        } catch (e) {
            this.showDangerMessage(
                "responseMessage.errorDefault"
            );
        }
    };

    updateToDelegateRelease = async () => {
        const isDelegate = this.state.data.isDelegate;
        let id: any = this.state.id;
        if (isDelegate === true) {
            try {
                await TransactionDelegate.updateStatus(
                    id,
                    6,
                    DeliveryOrderModel.getDelegateStatusByIndex(6)
                );
            } catch (e) {}
        }
    };
    
    updateToRelease = async () => {
        try {
            if (this.state.data.positionStatus < 5) {
                await DeliveryOrder.updateStatus(
                    5,
                    "DO_RELEASE",
                    this.state.data.jobNumber
                );
                await this.getData(this.state.id);
            }
            await this.updateToDelegateRelease();
            this.sendReleaseNotification();
            this.setState({ showAfterReleaseModal: true });
        } catch (e) {
            this.showDangerMessage(
                "responseMessage.errorDefault"
            );
        }
    };

    sendReleaseNotification = async () => {
        let jobNumber: any = this.state.data.jobNumber;
        let blCode: any = this.state.data.billOfLadingNumber;
        let emails: any = [];
        let method: string = "";
        if (this.state.data.customerEmail) {
            emails.push(this.state.data.customerEmail);
        }

        if (this.state.data.deliveryOrderNotifies) {
            this.state.data.deliveryOrderNotifies.forEach((param: any) => {
                emails.push(param.email);
            });
        }
        try {
            if (this.state.data.isDelegate === true) {
                const cargoOwnerName = this.state.data.createdBy;
                const cargoOwner = await CargoOwner.showByName(cargoOwnerName);
                if (cargoOwner) {
                    emails.push(cargoOwner.companyEmail);
                }
                method = "afterDOReleaseDelegate";
            } else {
                method = "afterDORelease";
            }
            await Email[method](jobNumber, emails, blCode);
        } catch(e) {
            
        }
    };

    redirectToHistory = () => {
        this.setState({ showAfterReleaseModal: false });
        this.setState({ isRedirectToHistory: true });
    };

                   updateToRejected = async () => {
                       try {
                           let dt: any = await DeliveryOrder.updateStatus(
                               this.state.data.positionStatus,
                               "REJECTED",
                               this.state.data.jobNumber
                           );
                           this.showSuccessMessage("requestDO.rejectedMessage");
                       } catch (e) {
                           this.showDangerMessage(
                               "responseMessage.errorDefault"
                           );
                       }
                   };

                   showSuccessMessage = translation => {
                       this.changeState("isShowSuccessMessage", true);
                       this.changeState(
                           "successMessage",
                           <GeneralTranslation slug={translation} />
                       );
                       setTimeout(() => {
                           this.changeState("isShowSuccessMessage", false);
                       }, 4000);
                   };

                   showDangerMessage = translation => {
                       this.changeState("isShowDangerMessage", true);
                       this.changeState(
                           "dangerMessage",
                           <GeneralTranslation slug={translation} />
                       );
                       setTimeout(() => {
                           this.changeState("isShowDangerMessage", false);
                       }, 4000);
                   };

                   setDoName = v => {
                       this.setState({ doName: v });
                   };

                   componentWillMount() {}

                   getData = async id => {
                       let dataId = id;
                       dataId = dataId.replace(/(.+)[?].+/, "$1");
                       this.changeState("id", dataId);
                       await DeliveryOrder.show(dataId)
                           .then(resp => {
                               let hasUploaded: any = this.state.hasUploaded;
                               let dt: any = resp.data.deliveryOrder;
                               let page: number = 1;
                               this.changeState("data", dt);
                               if (dt.positionStatus <= 2) {
                                   page = 2;
                               } else if (dt.positionStatus >= 5) {
                                   page = 4;
                               } else {
                                   page = dt.positionStatus;
                               }

                               this.changeState("page", page);
                               this.changeState(
                                   "proformaAmount",
                                   dt.proformaInvoiceAmount
                               );

                               let containers: any = this.state.containers;
                               containers = dt.deliveryOrderContainers.map(
                                   v => {
                                       let r: any = {};
                                       r.containerNumber = v.containerNo;
                                       r.sealNumber = v.sealNo;
                                       r.sizeType = v.containerSize;
                                       r.containerType = v.containerType;
                                       r.grossWeight = v.grossWeight;
                                       r.jenisMuat = v.containerType;
                                       return r;
                                   }
                               );
                               this.changeState("containers", containers);

                               let attachments: any =
                                   dt.deliveryOrderAttachments;
                               let blData: any = attachments.find(
                                   x => x.documentName == "BL"
                               );
                               if (blData) {
                                   this.changeState("blFile", blData.fileName);
                               }

                               let suratKuasaData: any = attachments.find(
                                   x => x.documentName == "SuratKuasa"
                               );
                               if (suratKuasaData) {
                                   this.changeState(
                                       "suratKuasaFile",
                                       suratKuasaData.fileName
                                   );
                               }

                               let letterOfIndemnityData: any = attachments.find(
                                   x => x.documentName == "LetterOfIndemnity"
                               );
                               if (letterOfIndemnityData) {
                                   this.changeState(
                                       "letterOfIndemnityFile",
                                       letterOfIndemnityData.fileName
                                   );
                               }

                               let suratPeminjamanData: any = attachments.find(
                                   x =>
                                       x.documentName ==
                                       "SuratPeminjamanKontainer"
                               );
                               if (suratPeminjamanData) {
                                   this.changeState(
                                       "suratPeminjamanFile",
                                       suratPeminjamanData.fileName
                                   );
                               }

                               let doData: any = attachments.find(
                                   x => x.documentName == "DO"
                               );
                               if (doData) {
                                   this.changeState("doFile", doData.fileName);
                                   this.changeState("doName", "DO.pdf");
                                   hasUploaded.do = true;
                               }

                               let proformaInvoiceData: any = attachments.find(
                                   x => x.documentName == "ProformaInvoice"
                               );
                               if (proformaInvoiceData) {
                                   this.changeState(
                                       "proformaFile",
                                       proformaInvoiceData.fileName
                                   );
                                   this.changeState(
                                       "proformaName",
                                       "Proforma Invoice.pdf"
                                   );
                                   hasUploaded.proformaInvoice = true;
                               }

                               // Get proof of payment document
                               let proofOfPayment: any = attachments.find(
                                   x => x.documentName == "ProofOfPayment"
                               );
                               if (proofOfPayment) {
                                   this.changeState(
                                       "proofOfPaymentUrl",
                                       proofOfPayment.fileName
                                   );
                               }
                               // =================================================

                               let invoiceData: any = attachments.find(
                                   x =>
                                       x.documentName == "invoice" ||
                                       x.documentName == "Invoice"
                               );
                               if (invoiceData) {
                                   this.changeState(
                                       "invoiceFile",
                                       invoiceData.fileName
                                   );
                                   this.changeState(
                                       "invoiceName",
                                       "Invoice.pdf"
                                   );
                                   hasUploaded.invoice = true;
                               }
                               this.setState({ hasUploaded: hasUploaded });
                           })
                           .catch(error => {
                               this.changeState("page", 1);
                           });
                   };

                   changeState = (key, value) => {
                       let state = this.state;
                       state[key] = value;
                       this.setState(state);
                   };

                   onPageChanged = page => {
                       return () => {
                           this.changeState("page", page);
                       };
                   };

                   getContent = props => {
                       const { t } = useTranslation();
                       const [
                           descriptionProgress,
                           setDescriptionProgress
                       ] = useState([
                           {
                               id: 1,
                               value: t(
                                   translations.entities.general.confirmRequest
                               )
                           },
                           {
                               id: 2,
                               value: t(
                                   translations.entities.general
                                       .uploadProformaInvoice
                               )
                           },
                           {
                               id: 3,
                               value: t(
                                   translations.entities.general
                                       .confirmCustomerPayment
                               )
                           },
                           {
                               id: 4,
                               value: t(
                                   translations.entities.general.uploadDoInvoice
                               )
                           }
                       ]);

                       const [dateProgress, setDateProgress] = useState([
                           {
                               id: 1,
                               value: ""
                           },
                           {
                               id: 2,
                               value: ""
                           },
                           {
                               id: 3,
                               value: ""
                           },
                           {
                               id: 4,
                               value: "aaaa"
                           }
                       ]);

                       const [progress, setProgress] = useState([
                           {
                               id: 1,
                               value: t(
                                   translations.entities.general.confirmRequest
                               )
                           },
                           {
                               id: 2,
                               value: t(
                                   translations.entities.general
                                       .uploadProformaInvoice
                               )
                           },
                           {
                               id: 3,
                               value: t(
                                   translations.entities.general
                                       .confirmCustomerPayment
                               )
                           },
                           {
                               id: 4,
                               value: t(
                                   translations.entities.general.uploadDoInvoice
                               )
                           }
                       ]);

                       const setActive = idxPage => {
                           let r = "";
                           if (idxPage == props.page) {
                               r = "bg-white";
                           }
                           return r;
                       };

                       const getProgress = idxPage => {
                           let r = "";
                           let id: number = 0;

                           id = dateProgress[idxPage - 1].id;
                           if (id == 1) {
                               r = props.data.createdDate;
                           } else if (id == 2) {
                               let obj: any = props.data.deliveryOrderLogs.find(
                                   x =>
                                       x.activity
                                           .toLowerCase()
                                           .search("update position status") >
                                           -1 && x.positionStatus == 3
                               );

                               if (obj) {
                                   r = obj.modifiedDate;
                               } else {
                                   obj = props.data.deliveryOrderLogs.find(
                                       x =>
                                           x.activity
                                               .toLowerCase()
                                               .search(
                                                   "update position status"
                                               ) > -1 && x.positionStatus == 2
                                   );

                                   if (obj) {
                                       r = obj.modifiedDate;
                                   }
                               }
                           } else if (id == 3) {
                               let obj: any = props.data.deliveryOrderLogs.find(
                                   x =>
                                       x.activity
                                           .toLowerCase()
                                           .search("update position status") >
                                           -1 && x.positionStatus == 4
                               );

                               if (obj) {
                                   r = obj.modifiedDate;
                               }
                           } else if (id == 4) {
                               let obj: any = props.data.deliveryOrderLogs.find(
                                   x =>
                                       x.activity
                                           .toLowerCase()
                                           .search("update position status") >
                                           -1 && x.positionStatus == 5
                               );

                               if (obj) {
                                   r = obj.modifiedDate;
                               }
                           }

                           if (r) {
                               r = moment(r).format("DD/MM/YY HH:mm:ss");
                           } else {
                               r = descriptionProgress[idxPage - 1].value;
                           }

                           return r;
                       };

                       let content;
                       content = (
                           <div className="gologs-container">
                               <Container>
                                   <div className="bg-white row rounded py-3 px-3 shadow-sm d-flex align-items-start flex-wrap mr-15px">
                                       <div className="d-inline-block w-100 pr-2 md-w-20">
                                           <div className="d-flex align-items-start flex-wrap">
                                               <div className="d-inline-block w-100 md-w-35">
                                                   <div className="overflow-hidden w-35px h-35px rounded-circle mr-2">
                                                       <img
                                                           src="https://cdn.lifehack.org/wp-content/uploads/2014/03/shutterstock_97566446.jpg"
                                                           style={{
                                                               width: "auto"
                                                           }}
                                                           className="h-35px"
                                                       />
                                                   </div>
                                               </div>
                                               <div className="d-inline-block w-100 md-w-65">
                                                   <HeaderItem
                                                       title={
                                                           <GeneralTranslation slug="customer" />
                                                       }
                                                       description={
                                                           this.state.data
                                                               .customerName
                                                       }
                                                   />
                                               </div>
                                           </div>
                                       </div>

                                       <div className="d-inline-block w-100 pr-2 md-w-30">
                                           <HeaderItem
                                               title={
                                                   <GeneralTranslation slug="jobNumber" />
                                               }
                                               description={
                                                   this.state.data.jobNumber
                                               }
                                           />
                                       </div>

                                       <div className="d-inline-block w-100 pr-2 md-w-15">
                                           <HeaderItem
                                               title={
                                                   <GeneralTranslation slug="submitedDateAndTime" />
                                               }
                                               description={
                                                   this.state.data.createdDate
                                               }
                                           />
                                       </div>

                                       <div className="d-inline-block w-100 pr-2 md-w-10">
                                           <HeaderItem
                                               title={
                                                   <GeneralTranslation slug="phone" />
                                               }
                                               description={
                                                   this.state.data.customerPhone
                                               }
                                           />
                                       </div>

                                       <div className="d-inline-block w-100 pr-2 md-w-15">
                                           <HeaderItem
                                               title={
                                                   <GeneralTranslation slug="email" />
                                               }
                                               description={
                                                   this.state.data.customerEmail
                                               }
                                           />
                                       </div>

                                       <div className="d-inline-block w-100 md-w-5">
                                           <HeaderItem
                                               title={
                                                   <GeneralTranslation slug="service" />
                                               }
                                               description="DO"
                                           />
                                       </div>
                                   </div>

                                   <Row className="rounded pt-2 mt-2 w-100">
                                       <Col xs="12" md="3" className="pl-0px">
                                           <CustomTab
                                               onClick={props.onPageChanged(1)}
                                               index={1}
                                               className={setActive(1)}
                                               title={t(
                                                   translations.wizard.top
                                                       .requestForm
                                               )}
                                               description={getProgress(1)}
                                               allowed={
                                                   props.data.positionStatus >=
                                                   1
                                               }
                                           />
                                       </Col>
                                       <Col xs="12" md="3">
                                           <CustomTab
                                               onClick={props.onPageChanged(2)}
                                               index={2}
                                               className={setActive(2)}
                                               title={t(
                                                   translations.wizard.top
                                                       .proformaInvoice
                                               )}
                                               description={getProgress(2)}
                                               allowed={
                                                   props.data.positionStatus >=
                                                   1
                                               }
                                           />
                                       </Col>
                                       <Col xs="12" md="3">
                                           <CustomTab
                                               onClick={props.onPageChanged(3)}
                                               index={3}
                                               className={setActive(3)}
                                               title={t(
                                                   translations.wizard.top
                                                       .payment
                                               )}
                                               description={getProgress(3)}
                                               allowed={
                                                   props.data.positionStatus >=
                                                   3
                                               }
                                           />
                                       </Col>
                                       <Col xs="12" md="3" className="pr-0px">
                                           <CustomTab
                                               onClick={props.onPageChanged(4)}
                                               index={4}
                                               className={setActive(4)}
                                               title="DO & Invoice"
                                               description={getProgress(4)}
                                               allowed={
                                                   props.data.positionStatus >=
                                                   4
                                               }
                                           />
                                       </Col>
                                   </Row>

                                   <Row className="w-100">
                                       {props.page == 1 && (
                                           <Request
                                               data={this.state.data}
                                               containers={this.state.containers}
                                               blFile={this.state.blFile}
                                               suratKuasaFile={this.state.suratKuasaFile}
                                               letterOfIndemnityFile={
                                                   this.state
                                                       .letterOfIndemnityFile
                                               }
                                               suratPeminjamanFile={
                                                   this.state
                                                       .suratPeminjamanFile
                                               }
                                               onSubmit={this.updateToConfirmed}
                                               onReject={this.updateToRejected}
                                               showActionButton={
                                                   this.state.data
                                                       .positionStatus < 5
                                               }
                                           />
                                       )}
                                       {props.page == 2 && (
                                           <Proforma
                                               onSubmit={this.updateToProforma}
                                               deliveryOrderId={this.state.id}
                                               jobNumber={this.state.data.jobNumber}
                                               blNumber={this.state.data.billOfLadingNumber}
                                               proformaAmount={this.state.proformaAmount}
                                               proformaFile={this.state.proformaFile}
                                               proformaName={this.state.proformaName}
                                               setProformaAmount={this.setProformaAmount}
                                               setProformaFile={this.setProformaFile}
                                               setProformaName={this.setProformaName}
                                               showSubmitButton={
                                                   this.state.data
                                                       .isDelegate === false
                                                       ? this.state.data
                                                             .positionStatus < 2
                                                       : this.state.data
                                                             .positionStatus < 3
                                               }
                                               isHideRemoveFileButton={
                                                   this.state.data
                                                       .isDelegate === false
                                                       ? this.state.data
                                                             .positionStatus >=
                                                         2
                                                       : this.state.data
                                                             .positionStatus >=
                                                         3
                                               }
                                           />
                                       )}
                                       {props.page == 3 && (
                                           <Payment
                                               onSubmit={this.updateToPayment}
                                               showSubmitButton={
                                                   this.state.data
                                                       .isDelegate === false
                                                   ? this.state.data
                                                       .positionStatus < 5
                                                   : this.state.data
                                                       .positionStatus < 6
                                               }
                                               urlImage={this.state.urlImage}
                                               proofOfPaymentUrl={this.state.proofOfPaymentUrl}
                                           />
                                       )}
                                       {props.page == 4 && (
                                           <Invoice
                                               deliveryOrderId={this.state.id}
                                               jobNumber={this.state.data.jobNumber}
                                               blNumber={this.state.data.billOfLadingNumber}
                                               invoiceFile={this.state.invoiceFile}
                                               invoiceName={this.state.invoiceName}
                                               doFile={this.state.doFile}
                                               doName={this.state.doName}
                                               hasUploaded={this.state.hasUploaded}
                                               setInvoiceFile={this.setInvoiceFile}
                                               setInvoiceName={this.setInvoiceName}
                                               setDoFile={this.setDoFile}
                                               setDoName={this.setDoName}
                                               onSubmit={this.updateToRelease}
                                               showUploadButton={
                                                   this.state.data
                                                       .isDelegate === false
                                                   ? this.state.data
                                                       .positionStatus < 5
                                                   : this.state.data
                                                       .positionStatus < 6
                                               }
                                               isHideRemoveFileButton={
                                                   this.state.data
                                                       .isDelegate === false
                                                   ? this.state.data
                                                       .positionStatus >= 5
                                                   : this.state.data
                                                       .positionStatus >= 6
                                               }
                                           />
                                       )}
                                   </Row>
                               </Container>
                           </div>
                       );
                       // }

                       return (
                           <>
                               <Helmet>
                                   <title>{t(translations.home.title)}</title>
                               </Helmet>
                               <Sidebar showBackwardButton={true} />
                               {content}
                           </>
                       );
                   };

                   render() {
                       return (
                           <>
                               {this.state.page && (
                                   <this.getContent
                                       data={this.state.data}
                                       page={this.state.page}
                                       onPageChanged={this.onPageChanged}
                                   />
                               )}

                               {this.state.isRedirectToHistory && (
                                   <Redirect
                                       to={{
                                           pathname: "/order",
                                           search: "?tab=history"
                                       }}
                                   />
                               )}

                               {this.state.isShowSuccessMessage && (
                                   <GologsAlert
                                       variant="success"
                                       content={this.state.successMessage}
                                   />
                               )}

                               {this.state.isShowDangerMessage && (
                                   <GologsAlert
                                       variant="danger"
                                       content={this.state.dangerMessage}
                                   />
                               )}

                               <PopupMessage
                                   show={this.state.showAfterReleaseModal}
                                   onClose={this.redirectToHistory}
                                   messageSlug="requestDO.releasedMessage"
                               />

                               <PopupMessage
                                   show={this.state.showUploadedProformaInvoiceModal}
                                   onClose={this.closeUploadedProformaInvoiceModal}
                                   messageSlug="responseMessage.proformaInvoiceSubmited"
                               />
                           </>
                       );
                   }
               }