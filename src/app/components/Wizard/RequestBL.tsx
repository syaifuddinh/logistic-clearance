/* eslint-disable no-console */
import TopWizard from "./Top";
import { Triangle } from "../../../styles/Wizard";
import React, { Component } from "react";
import { Title, Footer } from "../../../styles/Wizard";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import MShippingLine from "../../../endpoints/ShippingLine";
import MDeliveryOrder from "../../../endpoints/DeliveryOrder";
import TransactionDelegate from "../../../endpoints/TransactionDelegate";
import SP2 from "../../../endpoints/SP2";
import InTransit from "../../../endpoints/Master/InTransit";
import DeliveryOrder from "../../../model/DeliveryOrder";
import User from "../../../model/User";
import { RegExpKey } from "../../../lib/Constants";
import ResponseForm from "./RequestBL/ResponseForm";
import Review from "./RequestBL/Review";
import SupportingDocuments from "./RequestBL/SupportingDocuments";
import RequestForm from "./RequestBL/RequestForm";
import { Redirect } from "react-router-dom";
import GologsAlert from "../Alert/GologsAlert";
import { Stepper } from "../Milestone/Stepper/Loadable";
import { PopupMessage } from "../PopupMessage/Loadable";
import { TransactionSuccessModal } from "../Modal/TransactionSuccess/Loadable";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsButton } from "../Button/Loadable";
import { Anchor } from "../Anchor/Loadable";
import Email from "../../../endpoints/Email";
import Port from "../../../endpoints/Master/Port";
import ContainerSize from "../../../endpoints/Master/ContainerSize";
import ContainerType from "../../../endpoints/Master/ContainerType";
import CargoOwner from "../../../endpoints/Company/CargoOwner";
import Storage from "../../../endpoints/Storage";

type MyState = {
    id?:any;
    mShippingLine?: any;
    selectedSL?: any;
    showResult?:false;
    reqBLNo?: any;
    reqBLDate?: any;
    blNumber?: any;
    blDate?: any;
    posNumber?: any;
    showToast?: any;
    jobFound?: any;
    email: string;
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
    titleModal?: any;
    subTitleModal?: any;
    vessel?: string;
    voyageNumber?: string;
    portOfLoading?: string;
    portOfDischarge?: string;
    portOfDelivery?: string;
    notifyParty?: string;
    consignee?: string;
    shipper?: string;
    doSuccess?:boolean;
    isAddService?:boolean;
    submitButtonDisabled?:boolean;
    displayDraftAlert?:boolean;
    redirectToTransaction?:boolean;
    nextDisabled?:boolean;
    blFileDocument?:any;
    suratKuasaFileDocument?:any;
    suratKontainerFileDocument?:any;
    letterIndemnityFileDocument?:any;
    blFileDocumentName?: any;
    suratKuasaFileDocumentName?: any;
    suratKontainerFileDocumentName?: any;
    letterIndemnityFileDocumentName?: any;
    instructions?: any;
    dangerMessage?: any;
    isShowDangerMessage?: any;
    saved?: any;
    list?: any;
    delegateData?: any;
    isDelegate?: boolean;
    createdBy?: any;
};

export default class RequestBL extends Component<MyState> {
    state: MyState = {
        createdBy: "",
        mShippingLine: [],
        dataContainers: [],
        delegateData: {},
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
        titleModal: "",
        subTitleModal: "",
        voyageNumber: "-",
        portOfLoading: "-",
        portOfDischarge: "-",
        portOfDelivery: "-",
        notifyParty: "-",
        consignee: "-",
        shipper: "-",
        vessel: "-",
        doSuccess: false,
        isAddService: false,
        submitButtonDisabled: false,
        redirectToTransaction: false,
        displayDraftAlert: false,
        nextDisabled: false,
        blFileDocument: null,
        suratKuasaFileDocument: null,
        suratKontainerFileDocument: null,
        letterIndemnityFileDocument: null,
        blFileDocumentName: null,
        suratKuasaFileDocumentName: null,
        suratKontainerFileDocumentName: null,
        letterIndemnityFileDocumentName: null,
        dangerMessage: "",
        isShowDangerMessage: false,
        instructions: [],
        list: {
            ports: [],
            blNumbers: [],
            containerTypes: [],
            containerSizes: []
        },
        saved: {
            blNumber: "",
            blDate: "",
            posNumber: ""
        },
        isDelegate: false
    };

    getPorts = async () => {
        let list: any = this.state.list;
        list.ports = [];
        try {
            list.ports = await Port.list();
            list.ports = list.ports.data;
            list.ports = list.ports.map(param => {
                let resp: any = {};
                resp.label =
                    param.portCode + " - " + param.portName;
                resp.value = param.portCode;

                return resp;
            });

            this.setState({ list: list });
        } catch (e) {}
    };

    getContainerSizes = async () => {
        let list: any = this.state.list;
        list.containerSizes = [];
        try {
            list.containerSizes = await ContainerSize.list();
            list.containerSizes = list.containerSizes.data;
            list.containerSizes = list.containerSizes.map(
                param => {
                    let resp: any = {};
                    resp.label = param.name;
                    resp.value = param.name;

                    return resp;
                }
            );

            this.setState({ list: list });
        } catch (e) {}
    };

    getContainerTypes = async () => {
        let list: any = this.state.list;
        list.containerTypes = [];
        try {
            list.containerTypes = await ContainerType.list();
            list.containerTypes = list.containerTypes.data;
            list.containerTypes = list.containerTypes.map(
                param => {
                    let resp: any = {};
                    resp.label = param.name;
                    resp.value = param.name;

                    return resp;
                }
            );

            this.setState({ list: list });
        } catch (e) {}
    };

    getBlNumbers = async () => {
        let list: any = this.state.list;
        let npwp: string = "";
        npwp = User.getNPWP();
        if (npwp) {
            list.blNumbers = [];
            try {
                list.blNumbers = await SP2.BLNumbers(npwp);
                list.blNumbers = list.blNumbers.filter(
                    param => param.bl_date
                );
                list.blNumbers = list.blNumbers.map(param => {
                    let resp: any = {};
                    resp.label = param.bl_no;
                    resp.value = param.bl_no;
                    resp.date = param.bl_date;

                    return resp;
                });

                this.setState({ list: list });
            } catch (e) {
                let message: string =
                    "System can't fetch suggestion list of BL Number - ";
                message += e.toString();
                InTransit.store({
                    service: "DO",
                    errorMessage: message    
                });
            }
        } else {
            InTransit.store({
                service: "DO",
                errorMessage:
                    "System can't fetch suggestion list of BL Number since NPWP was empty in user's data"
            });
        }
    };

    resetBlData = () => {
        let blNumber: any = this.state.blNumber;
        let posNumber: any = this.state.posNumber;
        let blDate: any = this.state.blDate;
        let saved: any = this.state.saved;
        if(blNumber) {
            blNumber = blNumber.trim();
        }
        if(posNumber) {
            posNumber = posNumber.trim();
        }

        if (
            saved.blNumber != blNumber ||
            saved.posNumber != posNumber ||
            saved.blDate != blDate
        ) {
            if (this.state.showToast == true) {
                this.setState({
                    showResult: false,
                    dataContainer: [],
                    dataContainers: []
                });
                this.setState({ portOfLoading: "-" });
                this.setState({
                    portOfDischarge: "-"
                });
                this.setState({
                    portOfDelivery: "-"
                });
                this.setState({ voyageNumber: "-" });
                this.setState({ vessel: "-" });
                this.setState({ notifyParty: "-" });
                this.setState({ shipper: "-" });
            }
        }
    };

    showDangerMessage = translation => {
        this.setState({ isShowDangerMessage: true });
        this.setState({
            dangerMessage: (
                <GeneralTranslation slug={translation} />
            )
        });
        setTimeout(() => {
            this.setState({ isShowDangerMessage: false });
        }, 4000);
    };

                   onContainerDataChange = (id, key, value) => {
                       let dataContainers: any = this.state.dataContainers;
                       let containerIndex: any = {};
                       containerIndex = dataContainers.findIndex(
                           param => param.id === id
                       );
                       if (containerIndex > -1) {
                           dataContainers[containerIndex][key] = value;
                       }
                       this.setState({ dataContainers: dataContainers });
                       this.handleNextDisabled();
                   };

                   addContainer = () => {
                       let dataContainers: any = this.state.dataContainers;
                       let id: any = Math.round(Math.random() * 99999999);
                       dataContainers.push({
                           id: id,
                           editable: true,
                           containerNumber: "",
                           grossWeight: "",
                           sealNumber: "",
                           sizeType: "",
                           containerType: "",
                           jenisMuat: ""
                       });

                       this.setState({ dataContainers: dataContainers });
                       this.handleNextDisabled();
                   };

                   removeContainer = id => {
                       let dataContainers: any = this.state.dataContainers;
                       dataContainers = dataContainers.filter(
                           param => param.id != id
                       );

                       this.setState({ dataContainers: dataContainers });
                       this.handleNextDisabled();
                   };

                   handleDeleteBL = () => {
                       this.setBlFileDocument(null, null);
                   };

                   handleDeleteSuratKuasa = () => {
                       this.setState({
                           suratKuasaFileDocumentName: null,
                           suratKuasaFileDocument: null
                       });
                   };

                   handleDeleteSuratKontainer = () => {
                       this.setState({
                           suratKontainerFileDocumentName: null,
                           suratKontainerFileDocument: null
                       });
                   };

                   handleDeleteLetterIndemnity = () => {
                       this.setState({
                           letterIndemnityFileDocumentName: null,
                           letterIndemnityFileDocument: null
                       });
                   };

                   getDelegateData = async (id) => {
                       const companyType = User.getCompanyType();
                       let delegateData: any = this.state.delegateData;
                       if(companyType === "Forwarder") {
                            try {
                                delegateData = await TransactionDelegate.show(id);
                                this.setState({isDelegate: true});
                                if(!this.state.notifyEmail) {
                                    this.setState({
                                        notifyEmail: delegateData.notifyEmails.join(";")
                                    });
                                }
                                if (!this.state.blFileDocument) {
                                    this.setState({
                                        blFileDocument: delegateData.blDocument
                                    });
                                    this.setState({
                                        blFileDocumentName: "BL.pdf"
                                    });
                                }
                                this.setState({
                                    delegateData: delegateData
                                });
                            } catch (e) {}
                       } 
                   }
                   
                   getData = id => {
                       const companyType = User.getCompanyType();
                       if(companyType !== "Forwarder") {
                           this.setState({ stepper: 2 });
                        } else {
                           this.setState({ stepper: 0 });
                       }
                       MDeliveryOrder.show(id)
                           .then(resp => {
                               const dt = resp.data.deliveryOrder;
                               let containers: any = dt.deliveryOrderContainers;
                               let notifyEmail: string = "";
                               let notifyEmails: any = dt.deliveryOrderNotifies;
                               notifyEmails = notifyEmails.map(
                                   param => param.email
                               );
                               notifyEmail = notifyEmails.join(";");
                               this.setState({ email: dt.shippingLineEmail });
                               this.setState({
                                   blNumber: dt.billOfLadingNumber
                               });
                               let blDateTime = dt.billOfLadingDate;
                               let date = new Date(blDateTime);
                               this.setState({ blDate: date });
                               let sl = {
                                   label: dt.shippingLineName,
                                   value: dt.shippingLineName
                               };
                               this.onSelectedChange(sl);
                               this.setState({ showResult: true });
                               this.setState({ showToast: true });
                               this.setState({
                                   notifyParty: dt.notifyPartyName
                               });
                               this.setState({ createdBy: dt.createdBy });
                               this.setState({ consignee: dt.consignee });
                               this.setState({ shipper: dt.nama_shipper });
                               this.setState({ vessel: dt.vessel });
                               this.setState({ voyageNumber: dt.voyageNumber });
                               this.setState({
                                   portOfLoading: dt.portOfLoading
                               });
                               this.setState({
                                   portOfDischarge: dt.portOfDischarge
                               });
                               this.setState({
                                   portOfDelivery: dt.portOfDischarge
                               });
                               this.setState({ posNumber: dt.noPos });
                               this.setState({
                                   data: dt.deliveryOrderContainers
                               });
                               this.setState({ notifyEmail: notifyEmail });

                               let attachments: any =
                                   dt.deliveryOrderAttachments;
                               let blData: any = attachments.find(
                                   x => x.documentName == "BL"
                               );
                               if (blData) {
                                   this.setState({
                                       blFileDocument: blData.fileName
                                   });
                                   this.setState({
                                       blFileDocumentName: "BL.pdf"
                                   });
                               }

                               let suratKuasaData: any = attachments.find(
                                   x => x.documentName == "SuratKuasa"
                               );
                               if (suratKuasaData) {
                                   this.setState({
                                       suratKuasaFileDocument:
                                           suratKuasaData.fileName
                                   });
                                   this.setState({
                                       suratKuasaFileDocumentName:
                                           "Surat Kuasa.pdf"
                                   });
                               }

                               let letterOfIndemnityData: any = attachments.find(
                                   x => x.documentName == "LetterOfIndemnity"
                               );
                               if (letterOfIndemnityData) {
                                   this.setState({
                                       letterIndemnityFileDocument:
                                           letterOfIndemnityData.fileName
                                   });
                                   this.setState({
                                       letterIndemnityFileDocumentName:
                                           "Letter of Indemnity.pdf"
                                   });
                               }

                               let suratPeminjamanData: any = attachments.find(
                                   x =>
                                       x.documentName ==
                                       "SuratPeminjamanKontainer"
                               );
                               if (suratPeminjamanData) {
                                   this.setState({
                                       suratKontainerFileDocument:
                                           suratPeminjamanData.fileName
                                   });
                                   this.setState({
                                       suratKontainerFileDocumentName:
                                           "Surat Peminjaman Kontainer.pdf"
                                   });
                               }

                               containers = containers.map(param => {
                                   let resp: any = {};
                                   resp.id = param.id;
                                   resp.editable = false;
                                   resp.containerNumber = param.containerNo;
                                   resp.grossWeight = param.grossWeight;
                                   resp.sealNumber = param.sealNo;
                                   resp.sizeType = param.containerSize;
                                   resp.containerType = param.containerType;
                                   resp.jenisMuat = param.loadType;

                                   return resp;
                               });
                               this.setState({ dataContainers: containers });
                               this.getDelegateData(id);
                               this.handleNextDisabled();
                           })
                           .catch(error => {
                               window.console.log(error);
                           });
                   };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    getSavedServiceData = () => {
        let serviceData: any = Storage.getServiceData();
        this.setState({ blNumber: serviceData.blNumber });
        this.setState({ notifyEmail: serviceData.notifyEmail });
        if (serviceData.blDate)
            this.setState({
                blDate: new Date(serviceData.blDate)
            });
    };

    async componentDidMount() {
        this.getSavedServiceData();
        let req: any = null;
        try {
            this.getPorts();
            this.getBlNumbers();
            this.getContainerSizes();
            this.getContainerTypes();
            req = await MShippingLine.getAll();
            let dt = req.data.shippingLines;
            dt = dt.map(v => {
                let r: any = {};
                r.value = v.shippingLineName;
                r.label = v.shippingLineName;

                return r;
            });
            this.setState({ mShippingLine: dt });
        } catch (e) {}

        window.localStorage.removeItem("cargoOwnerDo");
        if (this.props.id) {
            const id = this.props.id;
            this.getData(id);
        }
    }

    setBlFileDocument = (e, resp) => {
        if (e) {
            let name: any = resp.fileName;
            this.setState({ blFileDocumentName: name });
            this.setState({ blFileDocument: e });
        } else {
            this.setState({ blFileDocumentName: null });
            this.setState({ blFileDocument: null });
        }
        this.handleNextDisabled();
    };

    setSuratKuasaFileDocument = (e, resp) => {
        if (e) {
            let name: any = resp.fileName;
            this.setState({ suratKuasaFileDocumentName: name });
            this.setState({ suratKuasaFileDocument: e });
        }
    };

    setSuratKontainerFileDocument = (e, resp) => {
        if (e) {
            let name: any = resp.fileName;
            this.setState({
                suratKontainerFileDocumentName: name
            });
            this.setState({ suratKontainerFileDocument: e });
        }
    };

                   setLetterIndemnityFileDocument = (e, resp) => {
                       if (e) {
                           let name: any = resp.fileName;
                           this.setState({
                               letterIndemnityFileDocumentName: name
                           });
                           this.setState({ letterIndemnityFileDocument: e });
                       }
                   };

                   onSelectedChange = e => {
                       this.setState({
                           selectedSL: e,
                           SLName: e.value
                       });
                   };

                   onEmailChange = e => {
                       this.setState({ email: e.target.value });
                   };

                   onDateChange = (date, e) => {
                       this.setState({ blDate: date });
                       this.resetBlData();
                   };

                   onBLChange = e => {
                       let blNumber: string = e.target.value;
                       let blSelected: any = {};
                       let blNumbers: any = this.state.list.blNumbers;
                       this.setState({ blNumber: blNumber });
                       if (blNumbers.length > 0) {
                           blSelected = blNumbers.find(
                               param =>
                                   param.value.toUpperCase() ===
                                   blNumber.toUpperCase()
                           );
                           if (blSelected) {
                               this.onDateChange(new Date(blSelected.date), {});
                           }
                       }
                       this.resetBlData();
                   };

                   onPosNumberChange = e => {
                       this.setState({ posNumber: e.target.value });
                       this.resetBlData();
                   };

                   onSubmit = async () => {
                       var pattern = new RegExp(RegExpKey);
                       let saved: any = this.state.saved;
                       let data: any = {};
                       if (!this.state.email) {
                           this.setState({
                               reqEmailMessage: "this field is required"
                           });
                       } else if (!pattern.test(this.state.email)) {
                           this.setState({
                               reqEmailMessage: "email is not valid"
                           });
                       } else {
                           this.setState({ reqEmailMessage: "" });
                       }

                       this.setState({
                           reqBLNo: !this.state.blNumber,
                           reqBLDate: !this.state.blDate,
                           reqEmail:
                               !this.state.email ||
                               !pattern.test(this.state.email),
                           reqSL:
                               this.state.selectedSL === "Select Shipping Line"
                       });

                       if (
                           this.state.blNumber &&
                           this.state.blDate &&
                           this.state.selectedSL &&
                           this.state.email &&
                           this.state.posNumber
                       ) {
                           let blNumber = this.state.blNumber.trim();
                           let blDate = moment(this.state.blDate).format(
                               "YYYYMMDD"
                           );
                           let posNumber = this.state.posNumber.trim();
                           saved.blNumber = blNumber;
                           saved.blDate = blDate;
                           saved.posNumber = posNumber;
                           this.setState({ saved: saved });
                           try {
                               data = await MDeliveryOrder.getBL(
                                   blNumber,
                                   blDate,
                                   posNumber
                               );

                               let containerData = data.data;
                               containerData = containerData.map(d => {
                                   d.id = 0;
                                   d.editable = false;
                                   d.grossWeight = 0;
                                   d.containerNumber = d.noContainer;
                                   d.sealNumber = d.noSeal;
                                   d.sizeType = d.ukuranContainer;
                                   d.containerType = d.typeContainer;
                                   d.grossWeight = "";
                                   d.jenisMuat = d.jenisContainer;

                                   return d;
                               });

                               this.setState({
                                   showResult: true,
                                   dataContainers: containerData,
                                   showToast:
                                       data.data.length > 0 ? true : false
                               });
                               if (data.data.length > 0) {
                                   const dt = data.data[0];
                                   this.setState({
                                       consignee: dt.namaPenerima
                                   });
                                   this.setState({
                                       notifyParty: dt.namaPenerima
                                   });
                                   this.setState({
                                       portOfLoading: dt.idPelabuhanMuat
                                   });
                                   this.setState({
                                       portOfDischarge: dt.idPelabuhanBongkar
                                   });
                                   this.setState({
                                       portOfDelivery: dt.idPelabuhanBongkar
                                   });
                                   this.setState({
                                       voyageNumber: dt.noVoyage
                                   });
                                   this.setState({
                                       vessel: dt.namaSaranaPengangkut
                                   });
                                   this.setState({
                                       shipper: dt.namaShipper
                                   });
                               }
                           } catch (e) {
                               this.setState({ consignee: "-" });
                               let authUser: any = localStorage.getItem(
                                   "authUser"
                               );
                               if (authUser) {
                                   authUser = JSON.parse(authUser);
                                   if (authUser.person) {
                                       if (authUser.person.company) {
                                           this.setState({
                                               consignee:
                                                   authUser.person.company.name
                                           });
                                       }
                                   }
                               }
                               this.setState({
                                   showResult: true
                               });
                               if (this.state.showToast == true) {
                                   this.setState({
                                       dataContainer: [],
                                       dataContainers: [],
                                       showToast: false
                                   });

                                   this.setState({
                                       portOfLoading: "-"
                                   });
                                   this.setState({
                                       portOfDischarge: "-"
                                   });
                                   this.setState({
                                       portOfDelivery: "-"
                                   });
                                   this.setState({ voyageNumber: "-" });
                                   this.setState({ vessel: "-" });
                                   this.setState({ notifyParty: "-" });
                                   this.setState({ shipper: "-" });
                               }
                           }
                           this.setState({ btnSubmitClicked: true });
                       } else {
                           this.setState({ btnSubmitClicked: false });
                           this.setState({
                               reqFieldMessage: "this field is required"
                           });
                       }
                       this.handleNextDisabled();
                   };

                   skip = () => {
                       window.location.href = "do-request";
                   };

                   handlePrev = () => {
                       this.setState({ stepper: this.state.stepper - 1 });
                       this.handleNextDisabled();
                   };

                   handleNext = () => {
                       const nextStep = this.state.stepper + 1;
                       this.setState({ stepper: nextStep });
                       this.handleNextDisabled();
                   };
                   
                   handleNextDisabled = () => {
                       setTimeout(() => {
                           const step = this.state.stepper;

                           if (!this.state.blFileDocument && step == 1) {
                               this.setState({ nextDisabled: true });
                           } else if(this.state.blFileDocument && step == 1) {
                               this.setState({ nextDisabled: false });
                           } else {
                               if(step === 0) {
                                   this.handleNextDisabledByContainer();
                               }
                           }

                           if(step == 0) {
                                let blNumberField: any = window.document.querySelector(".blNumberField");    
                                if(blNumberField) {
                                    blNumberField.click();
                                }
                           }
                       }, 250);
                   };

                   handleNextDisabledByContainer = () => {
                       let containers: any = this.state.dataContainers;
                       let emptyContainerIdx: number = 0;
                       if(containers.length === 0) {
                           this.setState({nextDisabled: true});
                        } else {
                            emptyContainerIdx = containers.findIndex(
                                param =>
                                    !param.containerNumber ||
                                    !param.sealNumber ||
                                    !param.sizeType ||
                                    !param.containerType ||
                                    !param.jenisMuat
                            );
                            if(emptyContainerIdx > -1) {
                               this.setState({nextDisabled: true});
                            } else {
                                this.setState({nextDisabled: false});
                            }
                       }
                   }

                   onSkipAddService = () => {
                       this.setState({ doSuccess: true });
                   };

                   onAddService = () => {
                       const success = () => {
                           this.setState({ showModal: false });
                           this.setState({ isAddService: true });
                       };

                       this.submitDO(success, false);
                   };

                   submitAsDraft = async () => {
                       const success = () => {
                           this.setState({ displayDraftAlert: true });
                       };
                       try {
                           await this.submitDO(success, true);
                       } catch (e) {
                           InTransit.store({
                               service: "DO",
                               errorMessage:
                                   "System can't Submit DO Request as Draft - " +
                                   e.message
                           });
                       }
                   };

                   
                   updateDelegateStatus = async () => {
                       try {
                           if (
                               this.state.isDelegate === true &&
                               this.props.id
                           ) {
                               TransactionDelegate.updateStatus(
                                   this.props.id,
                                   2,
                                   DeliveryOrder.getDelegateStatusByIndex(2)
                               );
                           }
                       } catch (e) {}
                   }
                   
                   sendEmailNotification = async (jobNumber) => {
                       let blNumber: any = this.state.blNumber;
                       let notifyEmails: any = [];
                       let emails: any = [];
                       let method: string = "";
                       if (this.state.notifyEmail) {
                           emails = this.state.notifyEmail.split(";");
                           emails.forEach(param => {
                               if (param) {
                                   notifyEmails.push(param);
                               }
                           });
                       }

                       if(this.state.isDelegate === true && this.props.id) {
                           const cargoOwnerName = this.state.delegateData.createdBy;
                           const cargoOwner = await CargoOwner.showByName(cargoOwnerName);
                           if(cargoOwner) {
                               notifyEmails.push(cargoOwner.companyEmail);
                           }
                           method = "afterDORequestDelegate";
                       } else {
                           method = "afterDORequest";
                       }
                       
                       try {
                           await Email[method](
                               jobNumber,
                               notifyEmails,
                               blNumber
                           );
                       } catch (e) {
                           let message: string = "";
                           if(this.state.isDelegate === true && this.props.id) {
                               message =  "System can't send notification email after user Submit DO Delegate  - " + e.message;
                           } else {
                               message =  "System can't send notification email after user Submit DO  - " + e.message;
                           }
                           InTransit.store({
                               service: "DO",
                               jobNumber: jobNumber,
                               errorMessage: message
                           });
                       }
                   }
                   
                   submitDO = async (
                       fn: (data) => void,
                       saveAsDraft = false
                   ) => {
                       let authUser = localStorage.getItem("authUser");
                       let jsonData: any = {};
                       let containers: any = [];
                       let username: string = "";
                       let documents: any[] = [];
                       let positionStatus: number = 1;
                       let data: any = {};
                       let notifyParties: any = [];
                       let notifyEmails: any = [];
                       let emails: any = [];
                       const companyType = User.getCompanyType();
                       if (this.state.notifyEmail) {
                           emails = this.state.notifyEmail.split(";");
                           emails.forEach(param => {
                               if (param) {
                                   notifyEmails.push(param);
                                   notifyParties.push({
                                       emailAddress: param
                                   });
                               }
                           });
                       }

                       if (saveAsDraft) {
                           positionStatus = 0;
                       }

                       if (this.state.blFileDocumentName) {
                           documents.push({
                               type: "BL",
                               fileName: this.state.blFileDocumentName
                           });
                       }

                       if (this.state.suratKuasaFileDocumentName) {
                           documents.push({
                               type: "SuratKuasa",
                               fileName: this.state.suratKuasaFileDocumentName
                           });
                       }

                       if (this.state.suratKontainerFileDocumentName) {
                           documents.push({
                               type: "SuratPeminjamanKontainer",
                               fileName: this.state
                                   .suratKontainerFileDocumentName
                           });
                       }

                       if (this.state.letterIndemnityFileDocumentName) {
                           documents.push({
                               type: "LetterOfIndemnity",
                               fileName: this.state
                                   .letterIndemnityFileDocumentName
                           });
                       }

                       if (authUser) {
                           jsonData = JSON.parse(authUser);
                           username = jsonData.person.email;
                           notifyEmails.push(username);
                       }

                       if (this.state.dataContainers) {
                           this.state.dataContainers.forEach(item => {
                               let container: any = {
                                   containerType: item.sizeType,
                                   containerNo: item.containerNumber,
                                   sealNo: item.sealNumber,
                                   containerSize: item.sizeType,
                                   grossWeight: parseFloat(item.grossWeight),
                                   loadType: item.jenisMuat,
                                   depoName: "",
                                   phoneNumber: ""
                               };
                               if (
                                   item.sizeType &&
                                   typeof item.sizeType === "number"
                               ) {
                                   container.containerType = container.containerType.toString();
                               }
                               if (!container.containerSize) {
                                   container.containerSize = 0;
                               }
                               if (!container.grossWeight) {
                                   container.grossWeight = 0;
                               }
                               containers.push(container);
                           });
                       }
                       
                       if(companyType === "Forwarder") {
                           username = this.state.createdBy;
                       } else {
                           username = User.getCompanyName();
                       }
                       data = {
                           username: username,
                           saveAsDraft: saveAsDraft,
                           submited: true,
                           deliveryOrder: {
                               deliveryOrderType: "DIRECT",
                               noPos: this.state.posNumber,
                               billOfLadingNumber: this.state.blNumber,
                               billOfLadingDate: moment(
                                   this.state.blDate
                               ).toISOString(),
                               shippingLineName: this.state.SLName,
                               shippingLineEmail: this.state.email,
                               vessel: this.state.vessel
                                   ? this.state.vessel
                                   : "-",
                               voyageNumber: this.state.voyageNumber
                                   ? this.state.voyageNumber
                                   : "-",
                               consignee: this.state.consignee
                                   ? this.state.consignee
                                   : "-",
                               shipper: this.state.shipper
                                   ? this.state.shipper
                                   : "-",
                               portOfLoading: this.state.portOfLoading
                                   ? this.state.portOfLoading
                                   : "-",
                               portOfDischarge: this.state.portOfDischarge
                                   ? this.state.portOfDischarge
                                   : "-",
                               portOfDelivery: this.state.portOfDelivery
                                   ? this.state.portOfDelivery
                                   : "-",
                               notifyPartyName: this.state.notifyParty
                                   ? this.state.notifyParty
                                   : "-",
                               notifyPartyAdress: "-",
                               positionStatus: positionStatus
                           },
                           containers: containers,
                           documents: documents,
                           notifyParties: notifyParties
                       };
                       if (this.props.id) {
                           data.deliveryOrder.id = this.props.id;
                       }
                       await MDeliveryOrder.submit(data)
                           .then(async data => {
                               this.setState({ submitButtonDisabled: false });
                               const dt = data.data;
                               const jobNumber = dt.jobNumber;
                               window.localStorage.setItem(
                                   "latestDeliveryOrderJobNumber",
                                   jobNumber
                               );
                               if (!saveAsDraft) {
                                   await this.updateDelegateStatus();
                                   await this.sendEmailNotification(data.data.jobNumber);
                               }
                               fn(data);
                           })
                           .catch(e => {
                               this.setState({ submitButtonDisabled: false });
                               this.showDangerMessage(
                                   "responseMessage.errorDefault"
                               );
                               throw new Error(e);
                           });
                   };

                   onJobSubmit = async () => {
                       try {
                           await this.submitDO(() => {}, false);
                       } catch (e) {
                           InTransit.store({
                               service: "DO",
                               errorMessage:
                                   "System can't Submit DO Request - " +
                                   e.message
                           });
                       }
                   };

                   handleChangeEmail = e => {};

                   onNotifyEmailChange = e => {
                       this.setState({ notifyEmail: e.target.value });
                   };

                   resetStripText = key => {
                       let args: any = {};
                       if (this.state[key] === "-") {
                           args[key] = "";
                           this.setState(args);
                       }
                   };

                   onBlDataFocused = key => {
                       if (!this.state.showToast == true) {
                           this.resetStripText(key);
                       }
                   };

                   onBlDataChange = (key, value) => {
                       let args: any = {};
                       if (!this.state.showToast == true) {
                           args[key] = value;
                           this.setState(args);
                       }
                   };

                   C1Mark = this.state.stepper >= 1 ? true : false;
                   C2Mark = this.state.stepper >= 2 ? true : false;
                   C3Mark = this.state.stepper >= 3 ? true : false;

                   render() {
                       return (
                           <>
                               {this.state.isShowDangerMessage && (
                                   <GologsAlert
                                       variant="danger"
                                       content={this.state.dangerMessage}
                                   />
                               )}
                               {this.state.doSuccess && (
                                   <Redirect
                                       to={{
                                           pathname: "/do-success"
                                       }}
                                   />
                               )}
                               {this.state.isAddService && (
                                   <Redirect
                                       to={{
                                           pathname: "/add-service"
                                       }}
                                   />
                               )}
                               {this.state.redirectToTransaction && (
                                   <Redirect
                                       to={{
                                           pathname: "/transaction"
                                       }}
                                   />
                               )}
                               <TopWizard />
                               <Triangle />
                               <div className="rounded-20px bg-white pb-3">
                                   <Title>
                                       <GeneralTranslation slug="requestDO.createNew" />
                                   </Title>
                                   <Stepper
                                       step={this.state.stepper}
                                       items={DeliveryOrder.instructions}
                                   />
                                   {this.state.stepper === 0 ? (
                                       <>
                                           <RequestForm
                                               list={this.state.list}
                                               selectedItems={
                                                   this.state.mShippingLine
                                               }
                                               selectedValue={
                                                   this.state.selectedSL
                                               }
                                               selectedChange={
                                                   this.onSelectedChange
                                               }
                                               selectedError={this.state.reqSL}
                                               selectedErrorMessage={
                                                   this.state.reqFieldMessage
                                               }
                                               emailValue={this.state.email}
                                               emailError={this.state.reqEmail}
                                               emailChange={this.onEmailChange}
                                               emailErrorMessage={
                                                   this.state.reqEmailMessage
                                               }
                                               blNoValue={this.state.blNumber}
                                               blNoError={this.state.reqBLNo}
                                               blNoChange={this.onBLChange}
                                               blNoErrorMessage={
                                                   this.state.reqFieldMessage
                                               }
                                               blDateError={
                                                   this.state.reqBLDate
                                               }
                                               blDateValue={this.state.blDate}
                                               blDateChange={this.onDateChange}
                                               blDateErrorMessage={
                                                   this.state.reqFieldMessage
                                               }
                                               posNumberValue={
                                                   this.state.posNumber
                                               }
                                               posNumberChange={
                                                   this.onPosNumberChange
                                               }
                                               btnSubmitRaised={this.onSubmit}
                                               btnSubmitClick={
                                                   this.state.btnSubmitClicked
                                               }
                                           />

                                           {this.state.showResult ? (
                                               <ResponseForm
                                                   addContainer={
                                                       this.addContainer
                                                   }
                                                   removeContainer={
                                                       this.removeContainer
                                                   }
                                                   onBlDataChange={
                                                       this.onBlDataChange
                                                   }
                                                   onBlDataFocused={
                                                       this.onBlDataFocused
                                                   }
                                                   onContainerDataChange={
                                                       this
                                                           .onContainerDataChange
                                                   }
                                                   jobStatus={
                                                       !this.state.showToast
                                                   }
                                                   SLName={this.state.SLName}
                                                   data={
                                                       this.state.dataContainers
                                                   }
                                                   state={this.state}
                                                   list={this.state.list}
                                                   notifyEmailChange={
                                                       this.onNotifyEmailChange
                                                   }
                                                   notifyEmailValue={
                                                       this.state.notifyEmail
                                                   }
                                               />
                                           ) : (
                                               ""
                                           )}
                                       </>
                                   ) : (
                                       ""
                                   )}
                                   {this.state.stepper === 1 ? (
                                       <SupportingDocuments
                                           data={this.state}
                                           onBlSubmit={this.setBlFileDocument}
                                           onSuratKuasaSubmit={
                                               this.setSuratKuasaFileDocument
                                           }
                                           onSuratKontainerSubmit={
                                               this
                                                   .setSuratKontainerFileDocument
                                           }
                                           onLetterIndemnitySubmit={
                                               this
                                                   .setLetterIndemnityFileDocument
                                           }
                                           handleDeleteBL={this.handleDeleteBL}
                                           handleDeleteSuratKuasa={
                                               this.handleDeleteSuratKuasa
                                           }
                                           handleDeleteSuratKontainer={
                                               this.handleDeleteSuratKontainer
                                           }
                                           handleDeleteLetterIndemnity={
                                               this.handleDeleteLetterIndemnity
                                           }
                                       />
                                   ) : (
                                       ""
                                   )}
                                   {this.state.stepper === 2 ? (
                                       <Review data={this.state} />
                                   ) : (
                                       ""
                                   )}
                               </div>
                               <div className="mt-32px fs-16px">
                                   {this.state.stepper == 0 &&
                                       !this.state.showResult && (
                                           <>
                                               <div className="fs-16px">
                                                   <GeneralTranslation
                                                       slug="prompt.contractNumberIsExist"
                                                       className="mr-1"
                                                   />

                                                   <Anchor
                                                       slug="requestDO.delegate"
                                                       pathname="/delegate/create"
                                                       search="?service=do"
                                                   />
                                               </div>
                                           </>
                                       )}
                               </div>
                               {this.state.showResult ? (
                                   <Footer className="d-flex">
                                       {this.state.stepper > 0 &&
                                           this.state.stepper <= 2 && (
                                               <GologsButton
                                                   variant="link-primary"
                                                   onClick={this.handlePrev}
                                                   contentByTranslation={true}
                                                   translation="wizard.bottom.previous"
                                               />
                                           )}
                                       {this.state.stepper >= 0 &&
                                           this.state.stepper < 2 && (
                                               <GologsButton
                                                   variant="primary"
                                                   onClick={this.handleNext}
                                                   contentByTranslation={true}
                                                   disabled={
                                                       this.state.nextDisabled
                                                   }
                                                   translation="wizard.bottom.nextStep"
                                               />
                                           )}
                                       {this.state.stepper === 2 && (
                                           <span className="d-flex">
                                               <GologsButton
                                                   variant="outline-primary"
                                                   onClick={this.submitAsDraft}
                                                   contentByTranslation={true}
                                                   className="mr-3"
                                                   showLoading={true}
                                                   translation="saveAsDraft"
                                               />

                                               <TransactionSuccessModal
                                                   titleSlug="requestDO.success"
                                                   subtitleSlug="prompt.addNewService"
                                                   onSkipAddService={
                                                       this.onSkipAddService
                                                   }
                                                   buttonSlug="wizard.bottom.submitRequest"
                                                   buttonVariant="primary"
                                                   onClick={this.onJobSubmit}
                                                   successTransactionUrl="/do-success"
                                                   serviceData={{
                                                       blNumber: this.state
                                                           .blNumber,
                                                       blDate: this.state
                                                           .blDate,
                                                       notifyEmail: this.state
                                                           .notifyEmail
                                                   }}
                                               />
                                           </span>
                                       )}
                                   </Footer>
                               ) : (
                                   ""
                               )}
                               <PopupMessage
                                   show={
                                       this.state.displayDraftAlert
                                           ? true
                                           : false
                                   }
                                   onClose={() => {
                                       this.setState({
                                           displayDraftAlert: false
                                       });
                                       window.location.href =
                                           "/transaction?tab=draft";
                                   }}
                                   messageSlug="requestDO.draftMessage"
                               />
                           </>
                       );
                   }
               }
