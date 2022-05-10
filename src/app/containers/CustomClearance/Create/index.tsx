import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import GologsWizard from "../../../components/Milestone/GologsWizard";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import CustomClearance from "../../../../model/CustomClearance";
import { Triangle } from "../../../../styles/Wizard";
import { CustomerDetail } from "./Components/CustomerDetail/Loadable";
import { DocumentInformation } from "./Components/DocumentInformation/Loadable";
import { Review } from "./Components/Review/Loadable";
import { ProformaInvoice } from "./Components/ProformaInvoice/Loadable";
import { Title, Footer } from "../../../../styles/Wizard";
import CustomClearanceEndpoint from "../../../../endpoints/CustomClearance";
import DeliveryOrderEndpoint from "../../../../endpoints/DeliveryOrder";
import Storage from "../../../../endpoints/Storage";
import Email from "../../../../endpoints/Email";
import { Stepper } from "../../../components/Milestone/Stepper/Loadable";
import { PopupMessage } from "../../../components/PopupMessage/Loadable";
import { GologsButton } from "../../../components/Button/Loadable";
import { TransactionSuccessModal } from "../../../components/Modal/TransactionSuccess/Loadable";
import GologsAlert from "../../../components/Alert/GologsAlert";
import { Redirect } from "react-router-dom";

export default class CustomClearanceCreate extends React.Component {
    state = {
        data: {
            contractType: "noContract",
            cargoOwnerOrCustomerTaxId: "",
            ppjkTaxId: "",
            cargoOwnerOrCustomerNib: "",
            ppjkNib: "",
            requestDate: null,
            senderName: "",
            senderAddress: "",
            sellerName: "",
            sellerAddress: "",
            importirName: "",
            importirAddress: "",
            cargoOwnerName: "",
            cargoOwnerAddress: "",

            portOfLoadingCode: "",
            portOfLoadingName: "",
            portOfTransitCode: "",
            portOfTransitName: "",
            portOfDestinationCode: "",
            portOfDestinationName: "",

            documentType: {
                value: "",
                label: ""
            },
            customsOffice: {
                value: "",
                label: ""
            },
            pibType: {
                value: "",
                label: ""
            },
            importType: {
                value: "",
                label: ""
            },
            paymentMethod: {
                value: "",
                label: ""
            },
            blNumber: "",
            blDate: "",
            emailNotification: "",
            phoneNotification: "",
            items: []
        },
        list: {
            customsOffice: [],
            pibType: [],
            paymentMethod: [],
            importType: [],
            blNumber: []
        },
        files: {
            packingList: {
                generatedFileName: ""
            },
            invoice: {
                generatedFileName: ""
            },
            bl: {
                generatedFileName: ""
            }
        },
        invoice: {
            primarySubtotal: 0,
            secondarySubtotal: 0,
            serviceFee: 0,
            vat: 0
        },
        stepper: 0,
        wizardStep: 0,
        customerDetailStep: 0,
        submitButtonDisabled: false,
        messageVariant: "",
        isShowMessage: false,
        message: "",
        messageTitle: "",
        redirectToTransaction: false,
        titleModal: "",
        subTitleModal: "",
        transactionSuccess: false,
        displayDraftAlert: false
    };

    componentDidMount() {
        this.getCustomsOffice();
        this.getPibType();
        this.getImportType();
        this.getDocumentType();
        this.getPaymentMethod();
        this.getInvoice();
        this.getSavedServiceData();
    }

    getSavedServiceData = () => {
        let serviceData: any = Storage.getServiceData();
        let data: any = this.state.data;
        data.blNumber = serviceData.blNumber;
        if (serviceData.blDate)
            data.blDate = new Date(serviceData.blDate);
        data.emailNotification = serviceData.notifyEmail;
        this.setState({ data: data });
    };

    getInvoice = () => {
        let invoice: any = this.state.invoice;
        invoice.primarySubtotal = 1000000;
        invoice.vat = 100000;
        invoice.secondarySubtotal =
            invoice.primarySubtotal + invoice.vat;

        this.setState({ invoice: invoice });
    };

    onDropFile = (fieldName, value) => {
        let files: any = this.state.files;
        let fd: any = new FormData();
        const fileType = "LainLain";
        files[fieldName].isShowLoading = true;
        this.setState({ files: files });
        fd.append("Type", fileType);
        fd.append("File", value);
        fd.append("FileName", fieldName);
        DeliveryOrderEndpoint.uploadDocument(fd)
            .then((resp: any) => {
                let files: any = this.state.files;
                files[fieldName].file = value;
                files[fieldName].fileName = value.name;
                files[fieldName].fileType = fileType;
                files[fieldName].generatedFileName =
                    resp.data.fileName;
                files[fieldName].isShowLoading = false;
                this.setState({ files: files });
            })
            .catch(error => {
                let files: any = this.state.files;
                files[fieldName].isShowLoading = false;
                this.setState({ files: files });
            });
    };

    onDeleteFile = fieldName => {
        let files: any = this.state.files;
        files[fieldName] = {};
        this.setState({ files: files });
    };

    getCustomsOffice = async () => {
        let dt: any = [];
        let list: any = this.state.list;
        dt = await CustomClearanceEndpoint.getCustomsOffice();
        dt = dt.map(param => {
            let resp: any = {};
            resp.label = param.name;
            resp.value = param.id;

            return resp;
        });
        list.customsOffice = dt;
        this.setState({ list: list });
    };

    getPibType = async () => {
        let dt: any = [];
        let list: any = this.state.list;
        dt = await CustomClearanceEndpoint.getPibType();
        dt = dt.map(param => {
            let resp: any = {};
            resp.label = param.name;
            resp.value = param.id;

            return resp;
        });
        list.pibType = dt;
        this.setState({ list: list });
    };

                   getDocumentType = async () => {
                       let dt: any = [];
                       let list: any = this.state.list;
                       dt = await CustomClearanceEndpoint.getDocumentType();
                       dt = dt.map(param => {
                           let resp: any = {};
                           resp.label = param.name;
                           resp.value = param.id;

                           return resp;
                       });
                       list.documentType = dt;
                       this.setState({ list: list });
                   };

                   getImportType = async () => {
                       let dt: any = [];
                       let list: any = this.state.list;
                       dt = await CustomClearanceEndpoint.getImportType();
                       dt = dt.map(param => {
                           let resp: any = {};
                           resp.label = param.name;
                           resp.value = param.id;

                           return resp;
                       });
                       list.importType = dt;
                       this.setState({ list: list });
                   };
                   getPaymentMethod = async () => {
                       let dt: any = [];
                       let list: any = this.state.list;
                       dt = await CustomClearanceEndpoint.getPaymentMethod();
                       dt = dt.map(param => {
                           let resp: any = {};
                           resp.label = param.name;
                           resp.value = param.id;

                           return resp;
                       });
                       list.paymentMethod = dt;
                       this.setState({ list: list });
                   };

                   onSkipAddService = () => {
                       this.setState({ transactionSuccess: true });
                   };

                   getHeader() {
                       const { t } = useTranslation();

                       return (
                           <>
                               <Helmet>
                                   <title>
                                       {t(translations.customClearance.title)}
                                   </title>
                               </Helmet>
                               <Sidebar
                                   header-name={
                                       <GeneralTranslation slug="customClearance.title" />
                                   }
                               />
                           </>
                       );
                   }

                   handleNextCustomerDetailStep = () => {
                       let customerDetailStep: any = this.state
                           .customerDetailStep;
                       if (customerDetailStep < 1) {
                           customerDetailStep += 1;
                       }
                       this.setState({
                           customerDetailStep: customerDetailStep
                       });
                   };

                   handlePrev = () => {
                       let stepper: any = this.state.stepper;
                       let wizardStep: any = this.state.wizardStep;
                       let customerDetailStep: any = this.state
                           .customerDetailStep;

                       if (stepper > 0) {
                           stepper -= 1;
                       } else {
                           if (customerDetailStep > 0) {
                               customerDetailStep -= 1;
                           }
                       }

                       if (stepper === 1 && wizardStep === 2) {
                           stepper += 1;
                           wizardStep -= 1;
                       }

                       if (stepper === 1 && wizardStep === 1) {
                           wizardStep -= 1;
                       }

                       this.setState({ stepper: stepper });
                       this.setState({ wizardStep: wizardStep });
                       this.setState({
                           customerDetailStep: customerDetailStep
                       });
                   };

                   handleNext = () => {
                       let stepper: any = this.state.stepper;
                       let wizardStep: any = this.state.wizardStep;
                       if (stepper === 1) {
                           wizardStep = 1;
                       } else if (stepper === 2) {
                           wizardStep = 2;
                       }
                       if (stepper < 2) {
                           stepper += 1;
                       }
                       this.setState({ stepper: stepper });
                       this.setState({ wizardStep: wizardStep });
                   };

                   onDataChange = (key, value) => {
                       let data: any = this.state.data;
                       data[key] = value;
                       if (
                           key === "documentType" ||
                           key === "customsOffice" ||
                           key === "pibType" ||
                           key === "importType" ||
                           key === "paymentMethod"
                       ) {
                           data[key + "Label"] = value.label;
                       }
                       this.setState({ data: data });
                   };

                   showMessage = (messageTitle, message, variant = "") => {
                       let messageVariant: any = this.state.messageVariant;
                       if (!variant) {
                           messageVariant = "success";
                       } else {
                           messageVariant = variant;
                       }
                       this.setState({ isShowMessage: true });
                       this.setState({ message: message });
                       this.setState({ messageVariant: messageVariant });
                       this.setState({ messageTitle: messageTitle });

                       setTimeout(() => {
                           this.setState({ isShowMessage: false });
                       }, 4000);
                   };

                   showDanger = msg => {
                       this.showMessage(null, msg, "danger");
                   };

                   fetchDataByNpwp = () => {
                       this.handleNextCustomerDetailStep();
                   };

                   updateToInvoiceStatus = async (id: string) => {
                       if(id) {
                           await CustomClearanceEndpoint.updateStatus(id, 2, "Confirmation");
                           await CustomClearanceEndpoint.updateStatus(id, 3, "Proforma Invoice");
                       }
                   }

                   onItemsChange = (items)  => {
                       let data: any = this.state.data;
                       data.items = items;
                       this.setState({ data: data });
                   }

                   sendEmailNotification = async (jobNumber: string) => {
                        const blNumber = this.state.data.blNumber;
                        let emails: any = this.state.data.emailNotification.split(";");
                        emails = emails.map(param => param.trim());
                        await Email.afterSubmitCustomClearance(
                            jobNumber,
                            emails,
                            blNumber
                        );
                        await Email.afterInvoiceCustomClearance(
                            jobNumber,
                            emails,
                            blNumber
                        );
                   }

                   onSubmit = async (isDraft = false) => {
                       let args: any = {};
                       let dt: any = {};
                       let id: any = null;
                       const data = this.state.data;
                       const uploadedFiles = this.state.files;
                       let emails: any = data.emailNotification.split(";");

                       args.cargoOwnerNpwp = data.cargoOwnerOrCustomerTaxId;
                       args.ppjkNpwp = data.ppjkTaxId;
                       args.ppjkName = "-";
                       args.phone = data.phoneNotification;
                       args.documentTypeName = data.documentType.label;
                       args.customsOfficeName = data.customsOffice.label;
                       args.requestDate = data.requestDate;
                       args.pibTypeName = data.pibType.label;
                       args.importTypeName = data.importType.label;
                       args.paymentMethodName = data.paymentMethod.label;
                       args.blNumber = data.blNumber;
                       args.blDate = data.blDate;

                       args.senderName = data.senderName;
                       args.senderAddress = data.senderAddress;
                       args.sellerName = data.sellerName;
                       args.sellerAddress = data.sellerAddress;
                       args.importirName = data.importirName;
                       args.importirAddress = data.importirAddress;
                       args.cargoOwnerName = data.cargoOwnerName ? data.cargoOwnerName : "-";
                       args.cargoOwnerAddress = data.cargoOwnerAddress;

                       args.portOfLoadingCode = data.portOfLoadingCode;
                       args.portOfLoadingName = data.portOfLoadingName;
                       args.portOfTransitCode = data.portOfTransitCode;
                       args.portOfTransitName = data.portOfTransitName;
                       args.portOfDestinationCode = data.portOfDestinationCode;
                       args.portOfDestinationName = data.portOfDestinationName;

                       args.notifyEmail = emails;
                       args.items = data.items.map(param => {
                           let response: any = param;
                           response.quantity = window.parseFloat(response.qty);
                           delete response.id;

                           return response;
                       });
                       args.files = [];

                       if (uploadedFiles.packingList.generatedFileName) {
                           args.files.push({
                               documentType: "packingList",
                               fileName: uploadedFiles.packingList.generatedFileName
                           });
                       }

                       if (uploadedFiles.invoice.generatedFileName) {
                           args.files.push({
                               documentType: "invoice",
                               fileName: uploadedFiles.invoice.generatedFileName
                           });
                       }

                       if (uploadedFiles.bl.generatedFileName) {
                           args.files.push({
                               documentType: "bl",
                               fileName: uploadedFiles.bl.generatedFileName
                           });
                       }

                       this.setState({ submitButtonDisabled: true });
                       try {
                           dt = await CustomClearanceEndpoint.store(
                               args,
                               isDraft
                           );
                           const jobNumber = dt.jobNumber;
                           window.localStorage.setItem(
                               "latestCustomClearanceJobNumber",
                               jobNumber
                           );
                           if(isDraft === false) {
                               const id = await CustomClearanceEndpoint.getNewIdTransaction();
                               await this.updateToInvoiceStatus(id)
                               await this.sendEmailNotification(jobNumber);
                           }
                       } catch (e) {
                           this.setState({ submitButtonDisabled: false });
                           this.showDanger(
                               <GeneralTranslation slug="responseMessage.errorDefault" />
                           );
                           throw Error(e);
                       }

                       this.setState({ submitButtonDisabled: false });
                   };

                   saveDirectly = async () => {
                       try {
                           await this.onSubmit(false);
                       } catch (e) {}
                   };

                   saveAsDraft = async () => {
                       try {
                           await this.onSubmit(true);
                           this.setState({ displayDraftAlert: true });
                       } catch (e) {}
                   };

                   render() {
                       return (
                           <>
                               <this.getHeader />
                               <div className="gologs-container">
                                   <div className="bg-white rounded-20px px-4 py-3">
                                       <GologsWizard
                                           items={CustomClearance.statuses}
                                           rectangleWidth={11}
                                           step={this.state.wizardStep}
                                       />
                                   </div>
                                   <Triangle />
                                   <div className="rounded-20px bg-white pb-3">
                                       <Title>
                                           <GeneralTranslation slug="customClearance.createNew" />
                                       </Title>
                                       <Stepper
                                           step={this.state.stepper}
                                           items={CustomClearance.instructions}
                                       />

                                       <div className="mt-3">
                                           {this.state.wizardStep < 2 && (
                                               <>
                                                   {this.state.stepper ===
                                                       0 && (
                                                       <CustomerDetail
                                                           onDataChange={
                                                               this.onDataChange
                                                           }
                                                           btnSubmitRaised={
                                                               this
                                                                   .fetchDataByNpwp
                                                           }
                                                           data={
                                                               this.state.data
                                                           }
                                                           list={
                                                               this.state.list
                                                           }
                                                           step={
                                                               this.state
                                                                   .customerDetailStep
                                                           }
                                                       />
                                                   )}

                                                   {this.state.stepper ===
                                                       1 && (
                                                       <DocumentInformation
                                                           onDropFile={this.onDropFile}
                                                           onDeleteFile={this.onDeleteFile}
                                                           onDataChange={this.onDataChange}
                                                           onItemsChange={this.onItemsChange}
                                                           btnSubmitRaised={this.fetchDataByNpwp}
                                                           data={this.state.data}
                                                           files={this.state.files}
                                                           step={this.state.customerDetailStep}
                                                       />
                                                   )}

                                                   {this.state.stepper ===
                                                       2 && (
                                                       <Review
                                                           data={
                                                               this.state.data
                                                           }
                                                           files={
                                                               this.state.files
                                                           }
                                                       />
                                                   )}
                                               </>
                                           )}

                                           {this.state.wizardStep >= 2 && (
                                               <ProformaInvoice
                                                   data={this.state.data}
                                                   invoice={this.state.invoice}
                                               />
                                           )}
                                       </div>
                                   </div>
                               </div>
                               <Footer className="d-flex">
                                   {(this.state.stepper > 0 ||
                                       this.state.customerDetailStep > 0) && (
                                       <>
                                           <GologsButton
                                               variant="link-primary"
                                               onClick={this.handlePrev}
                                               contentByTranslation={true}
                                               translation="wizard.bottom.previous"
                                           />
                                       </>
                                   )}

                                   {this.state.stepper <= 2 &&
                                       this.state.customerDetailStep > 0 &&
                                       this.state.wizardStep < 2 && (
                                           <>
                                               <GologsButton
                                                   variant="primary"
                                                   onClick={this.handleNext}
                                                   contentByTranslation={true}
                                                   showLoading={true}
                                                   translation="wizard.bottom.nextStep"
                                               />
                                           </>
                                       )}

                                   {this.state.wizardStep == 2 && (
                                       <>
                                           <GologsButton
                                               variant="outline-primary"
                                               onClick={this.saveAsDraft}
                                               contentByTranslation={true}
                                               className="mr-3"
                                               translation="saveAsDraft"
                                               disabled={
                                                   this.state
                                                       .submitButtonDisabled
                                               }
                                           />

                                           <TransactionSuccessModal
                                               titleSlug="customClearance.success"
                                               subtitleSlug="prompt.addNewService"
                                               onSkipAddService={
                                                   this.onSkipAddService
                                               }
                                               buttonSlug="paymentProcess"
                                               buttonVariant="primary"
                                               onClick={this.saveDirectly}
                                               successTransactionUrl="/custom-clearance-request/success"
                                               serviceData={{
                                                   blNumber: this.state.data
                                                       .blNumber,
                                                   blDate: this.state.data
                                                       .blDate,
                                                   notifyEmail: this.state.data
                                                       .emailNotification
                                               }}
                                           />
                                       </>
                                   )}
                               </Footer>

                               {this.state.isShowMessage && (
                                   <GologsAlert
                                       variant={this.state.messageVariant}
                                       content={[
                                           this.state.messageTitle,
                                           this.state.messageTitle ? (
                                               <br />
                                           ) : (
                                               ""
                                           ),
                                           this.state.message
                                       ]}
                                   />
                               )}

                               {this.state.redirectToTransaction && (
                                   <Redirect
                                       to={{
                                           pathname: "/custom-clearance-request"
                                       }}
                                   />
                               )}

                               {this.state.transactionSuccess && (
                                   <Redirect
                                       to={{
                                           pathname:
                                               "/custom-clearance-request/success"
                                       }}
                                   />
                               )}

                               <PopupMessage
                                   show={this.state.displayDraftAlert}
                                   onClose={() => {
                                       this.setState({
                                           displayDraftAlert: false
                                       });
                                       window.location.href =
                                           "/custom-clearance-request?tab=draft";
                                   }}
                                   messageSlug="customClearance.draftMessage"
                               />
                           </>
                       );
                   }
               }