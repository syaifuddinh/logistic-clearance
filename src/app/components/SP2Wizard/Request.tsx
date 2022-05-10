/* eslint-disable no-console */
import TopWizard from "./Top";
import { Triangle } from "../../../styles/Wizard";
import React, { Component } from "react";
import {
    Title,
    Footer,
} from "../../../styles/Wizard";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../../../endpoints/Auth";
import SP2 from "../../../model/SP2";
import SP2Endpoint from "../../../endpoints/SP2";
import TransactionDelegate from "../../../endpoints/TransactionDelegate";
import RatePlatformEndpoint from "../../../endpoints/Master/RatePlatform";
import InTransit from "../../../endpoints/Master/InTransit";
import Email from "../../../endpoints/Email";
import Storage from "../../../endpoints/Storage";
import CargoOwner from "../../../endpoints/Company/CargoOwner";
import ResponseForm from "./RequestBL/ResponseForm";
import Review from "./RequestBL/Review";
import ContainerForm from "./RequestBL/ContainerForm";
import RequestForm from "./RequestBL/RequestForm";
import ProformaInvoice from "./RequestBL/ProformaInvoice";
import { Redirect } from "react-router-dom";
import GologsAlert from "../Alert/GologsAlert";
import { Stepper } from "../Milestone/Stepper/Loadable";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsButton } from "../Button/Loadable";
import { PopupMessage } from "../PopupMessage/Loadable";
import { Anchor } from "../Anchor/Loadable";
import moment from "moment";
import { TransactionSuccessModal } from "../Modal/TransactionSuccess/Loadable";
import User from "../../../model/User";

type MyState = {
    id?: any;
    redirectToTransaction?: boolean;
    nextDisabled?: boolean;
    blFileDocument?: any;
    instructions?: any;
    cargoOwnerTaxId?: string;
    cargoOwnerName?: string;
    forwarderTaxId?: string;
    forwarderName?: string;
    typeTransaction?: any;
    terminalOperator?: any;
    blNumber?: string;
    blNumberSelected?: any;
    blDateEditable?: boolean
    transactionSuccess?: boolean
    isAddService?: boolean
    submitButtonDisabled?: boolean
    displayDraftAlert?: boolean
    displayDangerAlert?: boolean
    btnSubmitRaised?: boolean
    disabledCheck?: boolean
    stepper?: any;
    requestStep: number;
    statusStep: number;
    showToast?: any;
    showResponseForm?: any;
    titleModal?: any;
    subTitleModal?: any;
    date?: any;
    data?: any;
    transaction?: any;
    errorMessage?: string;
    documentType?: any;
    sppbNumber?: any;
    pibNumber?: any;
    doNumber?: any;
    pibDate?: any;
    sppbDate?: any;
    doDate?: any;
    paidThru?: any;
    invoice?: any;
    isShowMessage?: boolean;
    message?: any;
    messageTitle?: any;
    messageVariant?: any;
    containers?: any;
    isDocumentFound: boolean;
    notifyEmails?: any;
    delegateData?: any;
    isDelegate?: boolean;
    createdBy?: any;
};

export default class Request extends Component<MyState> {
    state: MyState = {
        id: "",
        delegateData: {},
        isDelegate: false,
        cargoOwnerTaxId: "",
        cargoOwnerName: "",
        forwarderTaxId: "",
        forwarderName: "",
        notifyEmails: "",
        typeTransaction: {
            value: "",
            label: ""
        },
        terminalOperator: {
            value: "",
            label: ""
        },
        blNumber: "",
        blNumberSelected: {},
        documentType: {
            value: "",
            label: ""
        },
        invoice: {
            grandtotal: 0,
            proformaUrl: ""
        },
        stepper: 0,
        showResponseForm: false,
        transactionSuccess: false,
        isAddService: false,
        submitButtonDisabled: false,
        redirectToTransaction: false,
        displayDraftAlert: false,
        displayDangerAlert: false,
        errorMessage: "",
        nextDisabled: false,
        showToast: false,
        btnSubmitRaised: false,
        disabledCheck: false,
        blDateEditable: false,
        date: null,
        titleModal: "",
        subTitleModal: "",
        requestStep: 0,
        statusStep: 0,
        data: {
            documentTypes: [],
            sppbNumbers: [],
            pibNumbers: [],
            doNumbers: [],
            typeTransactions: [],
            terminalOperators: [],
            containers: [],
            blNumbers: []
        },
        transaction: {
            trxType: null,
            statusNgen: null,
            transactionId: null,
            proformaInvoiceNo: null
        },
        sppbNumber: "",
        pibNumber: "",
        doNumber: "",
        containers: [],
        pibDate: null,
        sppbDate: null,
        doDate: null,
        paidThru: null,
        isDocumentFound: false,
        instructions: [],
        messageVariant: "",
        createdBy: ""
    };

    getBlNumber = async (npwp) => {
        let dt: any = [];
        let data: any = this.state.data;
        data.blNumbers = [];
        this.setState({data: data});    
        try {

            dt = await SP2Endpoint.BLNumbers(npwp);
            // Data dummy

            data.blNumbers = dt.map((v) => {
                let resp: any = {};
                resp.label  = v.bl_no;
                resp.value  = v.bl_no;
                resp.date  = v.bl_date;

                return resp;
            });
            this.setState({data: data});    
        } catch(e) {
            
        }
    }

    sendEmailNotification = async (jobNumber) => {
        let emailCC: any = [];
        let transactionNumber: string = "";
        let invoiceNumber: string = "";
        let invoiceAmount: number = 0;
        let invoiceUrl: string = "";
        let notifyEmails: any = "";
        notifyEmails = this.state.notifyEmails;
        notifyEmails = notifyEmails.split(";");
        notifyEmails = notifyEmails.filter(param => param);
        emailCC = notifyEmails;
        transactionNumber = jobNumber;
        invoiceNumber = this.state.transaction.proformaInvoiceNo;
        invoiceAmount = this.state.invoice.grandtotal;
        invoiceUrl = this.state.invoice.proformaUrl;
        if(this.state.isDelegate === true) {
            const cargoOwnerName = this.state.delegateData.createdBy;
            const cargoOwner = await CargoOwner.showByName(cargoOwnerName);
            if (cargoOwner) {
                notifyEmails.push(cargoOwner.companyEmail);
            }
        }
        try {
            await Email.afterSP2Invoice(emailCC, transactionNumber, invoiceNumber, invoiceAmount, invoiceUrl);
        } catch(e) {
            let serverMessage: string = e.message;
            let message: string = "System can't send email notification after user submit SP2";
            message += " - " + serverMessage;
            InTransit.store({
                service: "SP2",
                errorMessage: message
            });
        }
    }
    
    constructor(props) {
        super(props);
        let dt:any = this.state.data

        dt.containers = dt.containers.map((v, i) => {
            v.id = i + 1;
            v.checked = false;
            return v;
        });

        this.setState({data : dt})
    }

    getTerminals = async () => {
        let data = this.state.data;
        let dt: any = {}
        data.terminalOperators = [];
        this.setState({data: data});
        try {
            dt =  await SP2Endpoint.getTerminals();
            if (dt.terminalName) {
                data.terminalOperators = dt.terminalName.map((v) => {
                    let resp: any = {};
                    resp.label = v;
                    resp.value = v;

                    return resp;
                });

                data.terminalOperators = data.terminalOperators.map((v, i) => {
                    let resp: any = v;
                    resp.value = dt.terminalId[i];

                    return resp;
                });

                this.setState({data: data});
            }
            
        } catch (e) {
            let serverMessage: string = e.message;
            let message: string =
                "System can't get Terminal Operators List. ";
            message += serverMessage;
            InTransit.store({
                service: "SP2",
                errorMessage: message
            });
        }
    }
    
    getTransactionTypes = async (terminalId) => {
        let data = this.state.data;
        let dt: any = {}
        data.typeTransactions = [];
        this.setState({ data: data });
        this.setState({ typeTransaction: {} });
        try {
            dt = await SP2Endpoint.getImportTransactionTypes(terminalId);            
            if (dt.transactionsName) {
                data.typeTransactions = dt.transactionsName.map(v => {
                    let resp: any = {};
                    resp.label = v;
                    resp.value = v;

                    return resp;
                });

                data.typeTransactions = data.typeTransactions.map((v, i) => {
                    let resp: any = v;
                    resp.value = dt.transactionsTypeId[i];

                    return resp;
                });

                this.setState({ data: data });
            }        
        } catch (e) {
            let terminalName = "";
            let message: string = "System can't get Transaction Types List. ";;
            if(this.state.terminalOperator.label) {
                terminalName = this.state.terminalOperator.label;
            }
            message += e.message
            InTransit.store({
                service: "SP2",
                errorMessage: message
            }, {
                "Terminal Operator ID": terminalId,
                "Terminal Operator": terminalName
            });
        } 
    }
    
    getDocCodeCustoms = async (terminalId) => {
        let data = this.state.data;
        let dt: any = {}
        data.documentTypes = [];
        this.setState({ data: data });
        this.setState({ documentType: {} });
        try {
            dt = await SP2Endpoint.getImportDocCodeCustoms(terminalId);            
            if (dt.customsDocumentName) {
                data.documentTypes = dt.customsDocumentName.map(v => {
                    let resp: any = {};
                    resp.label = v;
                    resp.value = v;

                    return resp;
                });

                data.documentTypes = data.documentTypes.map((v, i) => {
                    let resp: any = v;
                    resp.value = dt.customsDocumentId[i];

                    return resp;
                });

                this.setState({ data: data });
            }
        } catch (e) {
            throw Error(e);
        }
    }

    getDocumentCustomsNGen = async () => {
        let data = this.state.data;
        let dt: any = {}
        let isDocumentFound: boolean = false;
        let containers: any = [];
        let currentContainers: any = this.state.containers;

        data.containers = [];
        this.setState({ data: data });
        try {
            dt = await SP2Endpoint.getDocumentCustomsNGen(
                this.state.sppbNumber,
                this.state.terminalOperator.value,
                this.state.documentType.value,
                this.state.typeTransaction.value
            );            
            isDocumentFound = true;
            if (dt.blNumber) {
                if (dt.blNumber.length > 0) {
                    containers = dt.blNumber.map(v => {
                        let unit: any = {};
                        
                        unit.mbl = v;

                        return unit;
                    });
                    containers = containers.map((v, i) => {
                        let statusName: any = dt.statusName[i]; 
                        let containerNumber: any = dt.containerNumber[i];
                        let containerIndex: number = -1;
                        
                        v.id = Math.round(Math.random() * 999999999999);
                        v.containerNumber = containerNumber;
                        v.eta = dt.eta[i];
                        v.vesselNumber = dt.vesselNumber[i];
                        v.voyageNumber = dt.voyageNumber[i];
                        v.containerSize = dt.containerSize[i];
                        v.containerType = dt.containerType[i];
                        v.vesselName = dt.vesselName[i];
                        v.statusName = dt.statusName[i];
                        if (statusName === "INVALID") 
                            v.isDanger = true;
                        else if (statusName === "PAYMENT-OUTSTANDING") 
                            v.isWarning = true;
                        else if (statusName === "PAYMENT-SETTLED") 
                            v.isWarning = true;

                        containerIndex = currentContainers.findIndex((param: any) => param.containerNumber == containerNumber && param.statusName == statusName);
                        if(containerIndex > -1) {
                            v.checked = true;
                        } else {
                            v.checked = false;
                        }
                        
                        return v;
                    });
                    containers = containers.filter((param: any, index, self) => {
                        return (
                            index ===
                            self.findIndex(
                                t =>
                                    t.containerNumber === param.containerNumber &&
                                    t.statusName === param.statusName
                            )
                        );
                    });
                    data.containers = containers;
                    this.setState({ data: data });
                }
            }
            this.setState({ isDocumentFound: isDocumentFound });
        } catch (e) {
            let message: string = "System can't get containers from KOJA. ";
            let params: any = {}
            message += e.toString();
            params = {
                "Terminal Operator Name": this.state.terminalOperator.label,
                "Terminal Operator ID": this.state.terminalOperator.value,
                "Transaction Type Name": this.state.typeTransaction.label,
                "Transaction Type ID": this.state.typeTransaction.value,
                "BL Number": this.state.blNumber,
                "BL Date": this.state.date,
                "Document Type Name": this.state.documentType.label,
                "Document Type ID": this.state.documentType.value,
                "SPPB Number": this.state.sppbNumber,
                "SPPB Date": this.state.sppbDate,
                "PIB Number": this.state.pibNumber,
                "PIB Date": this.state.pibDate,
                "DO Number": this.state.doNumber,
                "DO Date": this.state.doDate
            };
            InTransit.store(
                {
                    service: "SP2",
                    errorMessage: message
                },
                params
            ); 
            throw Error(e);
        }
    }

    getCoreor = async (documentNo, blNumber, terminalId) => {
        let dt: any = {}
        let data = this.state.data;
        let containers: any = [];
        data.containers = [];
        this.setState({data: data})
        try {
            dt = await SP2Endpoint.getCoreor(
                documentNo,
                blNumber,
                terminalId
            );
            if (dt.blNbr) {
                if (dt.blNbr.length > 0) {
                    containers = dt.blNbr.map((v) => {
                        let unit: any = {};
                        unit.mbl = v;

                        return unit;
                    })

                    containers = containers.map((v, i) => {
                        v.id = Math.round(Math.random() * 999999999999);
                        v.vesselNumber = dt.vesselName[i];
                        v.voyageNumber = dt.voyage[i];
                        v.vesselName = dt.vesselName[i];
                        v.eta = "";
                        v.containerSize = dt.sz[i];
                        v.containerType = dt.tp[i];
                        v.containerNumber = dt.cntrId[i];
                        v.consignee = dt.consignee[i];
                        v.statusName = "Valid";
                        
                        return v;
                    });
                    
                    data.containers = containers;
                    this.setState({data: data});
                }
            }            
        } catch (e) {
            
            throw Error(e);
        }
    }

    confirmBillingTransaction = async () => {
        let transaction: any = this.state.transaction;
        let containers: any = this.state.containers;
        let voyageNo: string = "";
        let vesselId: string = "";
        let response: any = {};
        let args: any = {};
        let noCont: any[] = [];
        let owner: any[] = [];
        let isoCode: any[] = [];
        let weight: any[] = [];
        let pol: any[] = [];
        let pod: any[] = [];
        let fd: any[] = [];
        let container: any = {};
        transaction.trxType = null;
        transaction.transactionId = null;
        transaction.statusNgen = null;
        this.setState({transaction: transaction});
        // Actual data
        if (containers.length > 0) {
            container = containers[0];
            vesselId = container.vesselNumber;
            voyageNo = container.voyageNumber;
        }

        noCont = containers.map(v => (
            v.containerNumber
        ));
        owner = containers.map(v => v.consignee);
        weight = containers.map(v => "0");
        isoCode = containers.map(v => "");
        pol = containers.map(v => "");
        pod = containers.map(v => "");
        fd = containers.map(v => "");

        args.pmId = "C";
        args.emailReq = "afidkurniawan@gmail.com";
        args.phoneReq = "081230943248";
        args.transactionsTypeId = this.state.typeTransaction.value;
        args.customsDocumentId = 1;
        args.documentNo = this.state.sppbNumber;
        args.documentDate = moment(this.state.date).format("YYYYMMDD");;
        args.documentShippingNo = this.state.doNumber;
        args.documentShippingDate = moment(this.state.doDate).format("YYYY-MM-DD");
        args.noBlAwb = this.state.blNumber;;
        args.paidThru = moment(this.state.paidThru).format("YYYY-MM-DD");;
        args.voyageNo = voyageNo;
        args.vesselId = vesselId;
        args.noCont = noCont;
        args.isoCode = isoCode;
        args.weight = weight;
        args.pol = pol;
        args.pod = pod;
        args.fd = fd;
        args.companyCode = this.state.terminalOperator.value;
        try {
            response = await SP2Endpoint.confirmBillingTransaction(args);
            transaction.trxType = response.trxType;
            transaction.transactionId = response.transactionId;
            transaction.statusNgen = response.statusNgen;
            this.setState({ transaction: transaction });
            await this.getBilling();
        } catch(e) {
            let serverMessage: string = e.toString();
            let message: string = "System can't confirm SP2 Transaction to KOJA";
            if(serverMessage) {
                serverMessage = serverMessage.replace("Error:", "");
                serverMessage = serverMessage.replace("Error:", "");
            } else {
                serverMessage = e.message;
            }
            message += " - " + serverMessage;
            InTransit.store({
                service: "SP2",
                errorMessage: message
            });
            throw new Error(e);
        }
    }

    getRatePlatform = async () => {
        let invoice: any = this.state.invoice;
        let response: any = {};
        invoice.serviceFee = 0; 
        invoice.vat = 0; 
        this.setState({invoice: invoice});
        try {
            response = await RatePlatformEndpoint.showByAlias("SP2");
            window.console.log(response);
            invoice.serviceFee = response.rateNominal;
            invoice.vat = Math.round(invoice.serviceFee * 0.1);
            invoice.secondarySubtotal = invoice.serviceFee + invoice.vat;
            this.setState({invoice: invoice});
            this.countGrandtotal();
        } catch(e) {
            throw new Error(e);
        }
    }

    countGrandtotal = () => {
        let invoice: any = this.state.invoice;
        invoice.grandtotal =
            window.parseInt(invoice.primarySubtotal) +
            window.parseInt(invoice.secondarySubtotal);
        this.setState({invoice: invoice});
    }

    getBilling = async () => {
        let transaction: any = this.state.transaction;
        let response: any = {};
        transaction.proformaInvoiceNo = null;
        this.setState({transaction: transaction});
        try {
            response = await SP2Endpoint.getBilling(transaction.transactionId);
            transaction.proformaInvoiceNo = response.proformaInvoiceNo;
            this.setState({transaction: transaction});
            // await this.getPaymentInquery();
            this.getRatePlatform();
            await this.getBillingDetail();
        } catch(e) {
            throw new Error(e);
        }
    }

    getPaymentInquery = async () => {
        let transaction: any = this.state.transaction;
        let response: any = {};
        try {
            response = await SP2Endpoint.getPaymentInquery(
                transaction.proformaInvoiceNo
            );
        } catch(e) {
            throw new Error(e);
        }
    }

    getBillingDetail = async () => {
        let transaction: any = this.state.transaction;
        let invoice: any = this.state.invoice;
        let response: any = {};
        let i: any = 0;
        invoice.primarySubtotal = 0;
        this.setState({invoice:invoice })
        try {
            // Actual data
            // response = await SP2Endpoint.getBillingDetail(
            //     transaction.transactionId,
            //     transaction.proformaInvoiceNo
            // );
            // =============================

            // Dummy data
            response = await SP2Endpoint.getBillingDetail(
                transaction.transactionId,
                "202111030015"
            );
            // ==============================

            if (response.detailBilling) {
                invoice.proformaUrl = response.detailBilling.link; 
                if (response.detailBilling.summaryDetail) {  
                    if (response.detailBilling.summaryDetail.total) {
                        if (response.detailBilling.summaryDetail.total.length > 0) {
                            for(i in response.detailBilling.summaryDetail.total) {
                                if (response.detailBilling.summaryDetail.total[i]) {
                                    invoice.primarySubtotal += window.parseInt(response.detailBilling.summaryDetail.total[i]);
                                }
                            }
                        }
                    }
                }
            }
            this.setState({invoice:invoice })
            this.countGrandtotal();
        } catch(e) {
            throw new Error(e);
        }
    }
    
    onContainerSelected = (e) => {
        let r:boolean = false;
        let data: any = this.state.data;
        let containers: any = data.containers;
        let containersSelected: any = this.state.containers;
        let id: any = e.target.value;
        let idx: any = containers.findIndex(x => x.id == id);
        if (idx > -1) {
            r = !containers[idx].checked;
            if (r) {
                containersSelected.push(containers[idx])
            } else {
                containersSelected = containersSelected.filter(v => v.id != id)
            }
            data.containers[idx].checked = r;
        }

        
        this.setState({ data: data });
        this.setState({ containers: containersSelected });
    }

    doRequestCustomer = () => {
        this.setState({requestStep : 1})
        this.handleNextDisabled();
    }
    
    doRequestDocument = async () => {
        this.setState({showResponseForm : false})
        let dt: any = {}
        let docResponse: any = {}
        let documentType: any = {};
        let documentTypes: any = this.state.data.documentTypes;
        this.handleNextDisabled();
        try {   
            docResponse = await SP2Endpoint.getDetailDocument(
                this.state.cargoOwnerTaxId,
                this.state.blNumber,
                this.state.date
            );
                
            if (!docResponse.tgl_sppb && !docResponse.no_sppb) {
                this.setState({isDocumentFound: false})
            } else {
                this.setState({isDocumentFound: true})
                if(documentTypes.length > 0) {
                    documentType = documentTypes.find(
                        param => param.label === "SPPB PIB (BC 2.0)"
                    );
                    if(documentType) this.setState({documentType: documentType});
                }
            }
            this.setState({
                sppbDate: docResponse.tgl_sppb
                    ? new Date(docResponse.tgl_sppb)
                    : null
            });
            this.setState({
                sppbNumber: docResponse.no_sppb
            });
            this.setState({
                pibDate: docResponse.tgl_pib ? new Date(docResponse.tgl_pib) : null
            });
            this.setState({
                pibNumber: docResponse.no_pib
            });
            this.setState({
                doDate: this.state.date ? new Date(this.state.date) : null
            });
            this.setState({
                doNumber: this.state.blNumber
            });
            this.handleNextDisabled();
        } catch(e) {
            let message: string = "System can't get SPPB and PIB data. ";
            message += e.message;
            InTransit.store(
                {
                    service: "SP2",
                    errorMessage: message
                },
                {
                    "Cargo Owner NPWP": this.state.cargoOwnerTaxId,
                    "BL Number": this.state.blNumber,
                    "BL Date": this.state.date
                }
            ); 
        }
        
        this.setState({showResponseForm : true})
        this.handleNextDisabled();
        // this.getCoreor(this.state.blNumber, this.state.blNumber, this.state.terminalOperator.value);
    }

    showDanger = (msg) => {
        this.showMessage(null, msg, "danger");
    }

    getDelegateData = async (id) => {
        const companyType = User.getCompanyType();
        let delegateData: any = this.state.delegateData;
        if(companyType === "Forwarder") {
            this.setState({ isDelegate: true });
            try {
                delegateData = await TransactionDelegate.show(id);
                if(!this.state.notifyEmails) {
                    this.setState({
                        notifyEmails: delegateData.notifyEmails.join(";")
                    });
                }
                this.setState({
                    delegateData: delegateData
                });
            } catch (e) {}
        } else {

        }
        this.setState({ stepper: 0 });
        this.setState({ statusStep: 0 });
        this.setState({ requestStep: 0 });
        this.setState({ isDocumentFound: false });
        this.setState({ showResponseForm: false });
    }
                 
    getData = async (id: string) => {
        let dt: any = {};
        let notifies: any = [];
        let notifyEmails: any = "";
        let terminalOperator: any = {};
        let typeTransaction: any = {};
        let documentType: any = {};
        let data: any = this.state.data;
        let transaction: any = this.state.transaction;
        let invoice: any = this.state.invoice;
        let containers: any = this.state.containers;
        let rawContainers: any = [];
        const companyType = User.getCompanyType();
        
        this.setState({id: id});
        if(companyType !== "Forwarder") {
            this.setState({ showResponseForm: true });
            this.setState({stepper: 2});
            this.setState({statusStep: 1});
            this.setState({requestStep: 1});
            this.setState({ isDocumentFound: true });
        }
        try {
            dt = await SP2Endpoint.show(id);
            // =============================================
            
            if(dt.notifies) {
                notifies = dt.notifies;
                notifies = notifies.map(param => {
                    return param.email;
                });
                notifyEmails = notifies.join(";");
                this.setState({notifyEmails: notifyEmails});
            }
            transaction.proformaInvoiceNo = dt.proformaInvoiceNo;

            this.setState({disabledCheck: false});

            this.setState({cargoOwnerTaxId: dt.cargoOwnerTaxId});
            this.setState({cargoOwnerName: dt.cargoOwnerName});
            this.setState({forwarderTaxId: dt.forwarderTaxId});
            this.setState({forwarderName: dt.forwarderName});
            this.setState({createdBy: dt.createdBy});
            this.doRequestCustomer();
            this.getBlNumber(dt.cargoOwnerTaxId);
            terminalOperator = this.state.data.terminalOperators.find(param => param.label === dt.terminalOperator)
            if(terminalOperator) {
                await this.onTerminalOperatorChange(terminalOperator);
            }
            
            typeTransaction = this.state.data.typeTransactions.find(param => param.label === dt.typeTransaction)
            if(typeTransaction) {
                this.onTypeTransactionChange(typeTransaction);
            }
            
            documentType = this.state.data.documentTypes.find(param => param.label === dt.documentType)
            if(documentType) {
                this.onDocumentTypeChange(documentType);
            }

            this.setState({blNumber: dt.blNumber});
            this.setState({sppbNumber: dt.sppbNumber});
            this.setState({doNumber: dt.doNumber});
            this.setState({pibNumber: dt.pibNumber});

            if(dt.dueDate) {
                this.setState({paidThru: new Date(dt.dueDate)});
            }
            if(dt.pibDate) {
                this.setState({pibDate: new Date(dt.pibDate)});
            }

            if (dt.blDate) {
                this.setState({date: new Date(dt.blDate)});
            }

            if (dt.sppbDate) {
                this.setState({sppbDate: new Date(dt.sppbDate)});
            }

            if (dt.doDate) {
                this.setState({doDate: new Date(dt.doDate)});
            }
            this.setState({ data: data });
            this.getDelegateData(id);
            await this.getDocumentCustomsNGen();
            rawContainers = this.state.data.containers;
            
            if (dt.subTotalByThirdParty) invoice.primarySubtotal = dt.subTotalByThirdParty;
            if (dt.vat) invoice.vat = dt.vat;
            if (dt.platformFee) invoice.service = parseInt(dt.platformFee);
            if (dt.grandTotal) invoice.grandtotal = dt.grandTotal;

            containers = dt.containers;
            containers = containers.map(param => {
                let resp: any = {};
                let highlightedContainerIndex: any = {};
                resp.id = param.id;
                resp.containerNumber = param.containerNumber;
                resp.eta = "";
                resp.vesselNumber = param.vesselNumber;
                resp.voyageNumber = param.voyageNumber;
                resp.containerSize = param.containerSize;
                resp.containerType = param.containerType;
                resp.vesselName = param.vesselName;
                resp.mbl = param.blNumber;

                highlightedContainerIndex = rawContainers.findIndex((param2: any) => param2.containerNumber === param.containerNumber);
                if (highlightedContainerIndex > -1) rawContainers[highlightedContainerIndex].checked = true;
                
                return resp;
            });
            data.containers = rawContainers;
            this.setState({transaction: transaction});
            this.setState({invoice: invoice});
            this.setState({containers: containers});
            this.setState({data: data});
            this.setState({ showResponseForm: true });
            this.handleNextDisabled();
        } catch (e) {
            
        }
    }

    showMessage = (messageTitle, message, variant = "") => {
        let messageVariant: any = this.state.messageVariant;
        if (!variant) {
            messageVariant = "success";
        } else {
            messageVariant = variant;
        }
        this.setState({isShowMessage : true});
        this.setState({message : message});
        this.setState({messageVariant : messageVariant});
        this.setState({messageTitle : messageTitle});
        
        setTimeout(() => {
            this.setState({isShowMessage : false});
        }, 4000);
    }

    getSavedServiceData = () => {
        let serviceData: any = Storage.getServiceData();
        this.setState({blNumber: serviceData.blNumber});
        this.setState({notifyEmails: serviceData.notifyEmail});
        if (serviceData.blDate) this.setState({ date: new Date(serviceData.blDate)});
    }
    
    async componentDidMount() {
        this.getSavedServiceData();
        await this.getTerminals();
        if (this.props.id) {
            const id = this.props.id;
            this.getData(id);
        }
    }

    onDocumentTypeChange = (e) => {
        this.setState({documentType: e})
        this.handleNextDisabled();
    }

    onSppbNumberChange = (e) => {
        this.setState({sppbNumber: e.target.value})
        this.handleNextDisabled();
    }

    onPibNumberChange = (e) => {
        this.setState({pibNumber: e.target.value})
        this.handleNextDisabled();
    }

    onDoNumberChange = (e) => {
        this.setState({doNumber: e.target.value})
        this.handleNextDisabled();
    }

    onNotifyEmailsChange = (e) => {
        this.setState({notifyEmails: e.target.value})
    }

    onPibDateChange = (e) => {
        this.setState({pibDate : e})
        this.handleNextDisabled();
    }

    onPaidThruChange = (e) => {
        this.setState({paidThru : e})
        this.handleNextDisabled();
    }
    onSppbDateChange = (e) => {
        this.setState({sppbDate : e})
        this.handleNextDisabled();
    }
    onDoDateChange = (e) => {
        this.handleNextDisabled();
        this.setState({doDate : e})
    }

    
    onCargoOwnerTaxIdChange = async e => {
        const v = e.target.value.trim();
        this.setState({ cargoOwnerTaxId: v });
        this.getBlNumber(v);
        try {
            const p = await Auth.getUserByNPWP(v)
            this.setState({ cargoOwnerName: p.companyName });
        } catch (e) {
            let serverMessage: string = e.message;
            let message: string =
                "System can't get Cargo Owner Name by NPWP. NPWP = " + v + ". ";
            this.setState({ cargoOwnerName: "" });
            this.showMessage(
                <GeneralTranslation slug="responseMessage.npwpNotFound" />,
                "",
                "danger"
            );
            message += " " + serverMessage;
            InTransit.store({
                service: "SP2",
                errorMessage: message
            });

        }
    };

    onCargoOwnerNameChange = e => {
        this.setState({ cargoOwnerName: e.target.value });
    };

    onTypeTransactionChange = e => {
        this.setState({
            typeTransaction: e
        });
    };

    onBlNumberChange = e => {
        const v: any = e.target.value.trim();
        this.setState({
            blNumber: v
        });
        const dt: any = this.state.data.blNumbers.find(x => x.value == v)
        
        if (dt) {
            this.setState({blDateEditable : true})
            this.setState({date : new Date(dt.date)})
        } else {
            this.setState({blDateEditable : false})
        }

    };

    onBlNumberSelected = e => {
        this.setState({
            blNumber: e.value.trim()
        });
        if (e.value) {
            this.setState({
                blNumberSelected: e
            });
        }
        // Data dummy
        let time = new Date();
        this.onDateChange(time, {})
        // ==================
    };

    onTerminalOperatorChange = async (e) => {
        this.setState({
            terminalOperator: e
        });

        if (e) {
            if (e.value) {
                await this.getTransactionTypes(e.value);
                await this.getDocCodeCustoms(e.value);
            }
        }
    };
    
    onForwarderTaxIdChange = async e => {
        const v = e.target.value.trim();
        this.setState({ forwarderTaxId: v });

        try {
            const p = await Auth.getUserByNPWP(v);
            this.setState({ forwarderName: p.companyName });
        } catch (e) {
            let serverMessage: string = e.message;
            let message: string =
                "System can't get Forwarder / PPJK Name by NPWP. NPWP = " + v + ". ";
            this.setState({ forwarderName: "" });
            this.showMessage(
                <GeneralTranslation slug="responseMessage.npwpNotFound" />,
                "",
                "danger"
            );
            message += " " + serverMessage;
            InTransit.store({
                service: "SP2",
                errorMessage: message
            });
        }
    };

    onDateChange = (date, e) => {
        this.setState({ date: date });
    };
    
    onForwarderNameChange = e => {
        this.setState({ forwarderName: e.target.value });
    };

    onSubmit = async (isDraft = false) => {
        let args: any = {};
        let dt: any = {};
        let id: any = null;
        let notifies: any = [];
        if(this.state.notifyEmails) {
            notifies = this.state.notifyEmails.split(";");
            args.notifies = notifies.map(param => {
                let resp: any = {};
                resp.email = param;
                
                return resp;
            });
        } else {
            args.notifies = [];
        }
        if (this.state.id) {
            id = this.state.id;;
            args.id = id;
        }
        args.isDraft = isDraft;
        args.createdBy = this.state.createdBy;
        args.cargoOwnerTaxId = this.state.cargoOwnerTaxId;
        args.cargoOwnerName = this.state.cargoOwnerName;
        args.forwarderTaxId = this.state.forwarderTaxId;
        args.forwarderName = this.state.forwarderName;
        args.terminalOperator = this.state.terminalOperator.label;
        args.typeTransaction = this.state.typeTransaction.label;
        args.documentType = this.state.documentType.label;
        args.blNumber = this.state.blNumber;
        args.blDate = this.state.date;
        args.sppbNumber = this.state.sppbNumber;
        args.sppbDate = this.state.sppbDate;
        args.pibNumber = this.state.pibNumber;
        args.pibDate = this.state.pibDate;
        args.doNumber = this.state.doNumber;
        args.doDate = this.state.doDate;
        args.dueDate = this.state.paidThru;
        args.proformaInvoiceNo = this.state.transaction.proformaInvoiceNo;
        args.subTotalByThirdParty = this.state.invoice.primarySubtotal;
        args.platformFee = this.state.invoice.serviceFee ? this.state.invoice.serviceFee : 0;
        args.vat = this.state.invoice.vat ? this.state.invoice.vat : 0;
        args.grandTotal = this.state.invoice.grandtotal ? this.state.invoice.grandtotal : 0;
        args.containers = this.state.containers;
        args.containers = args.containers.map((params) => {
            let resp: any = {};
            if(id) {
                if(this.state.isDelegate === false) {
                    resp.id = params.id;
                }
            }
            resp.blNumber = args.blNumber;
            resp.vesselNumber = params.vesselNumber;
            resp.vesselName = params.vesselName;
            resp.voyageNumber = params.voyageNumber;
            resp.containerSize = params.containerSize;
            resp.containerType = params.containerType;
            resp.containerNumber = params.containerNumber;

            return resp;
        })
        this.setState({submitButtonDisabled: true});
        try {
            if(id) {
                dt = await SP2Endpoint.update(args, id);
            } else {
                dt = await SP2Endpoint.store(args);
            }
            if(isDraft === false) {
                if (this.state.isDelegate === true && id) {
                    await TransactionDelegate.updateStatus(
                        id,
                        2,
                        SP2.getDelegateStatusByIndex(2)
                    );
                    await TransactionDelegate.updateStatus(
                        id,
                        3,
                        SP2.getDelegateStatusByIndex(3)
                    );
                }
                await this.sendEmailNotification(dt.jobNumber);
            }
            window.localStorage.setItem("latestSP2JobNumber", dt.jobNumber);
        } catch(e) {
            let message: string = "";
            let params: any = {};
            if(id) {
                if(isDraft === false) {
                    message = "System can't Update SP2. ";
                } else {
                    message = "System can't Update SP2 as Draft. ";
                }
            } else {
                if(isDraft === false) {
                    message = "System can't Submit New SP2. ";
                } else {
                    message = "System can't Submit New SP2 as Draft. ";
                }
            }
            message += e.toString();
            params = {
                "Cargo Owner NPWP": this.state.cargoOwnerTaxId,
                "Cargo Owner Name": this.state.cargoOwnerName,
                "Forwarder / PPJK NPWP": this.state.forwarderTaxId,
                "Forwarder / PPJK Name": this.state.forwarderName,
                "Terminal Operator Name": this.state.terminalOperator.label,
                "Terminal Operator ID": this.state.terminalOperator.value,
                "Transaction Type Name": this.state.typeTransaction.label,
                "Transaction Type ID": this.state.typeTransaction.value,
                "BL Number": this.state.blNumber,
                "BL Date": this.state.date,
                "Document Type Name": this.state.documentType.label,
                "Document Type ID": this.state.documentType.value,
                "SPPB Number": this.state.sppbNumber,
                "SPPB Date": this.state.sppbDate,
                "PIB Number": this.state.pibNumber,
                "PIB Date": this.state.pibDate,
                "DO Number": this.state.doNumber,
                "DO Date": this.state.doDate,
                "Paid Thru": this.state.paidThru
            };
            InTransit.store(
                {
                    service: "SP2",
                    errorMessage: message
                },
                params
            );
            this.setState({submitButtonDisabled: false});
            this.showDanger(
                <GeneralTranslation slug="responseMessage.errorDefault" />
            );
            
            throw Error(e);
        }
        
        this.setState({submitButtonDisabled: false});
    };

    skip = () => {
        window.location.href = "create-do-request";
    };

    handlePrev = () => {
        if (this.state.statusStep == 0) {
            if (this.state.stepper == 0 && this.state.requestStep > 0) {
                this.setState({ requestStep: this.state.requestStep - 1 });
                this.setState({ showResponseForm: false });
            } else {
                this.setState({ stepper: this.state.stepper - 1 });
            }
        } else if (this.state.statusStep > 0) {
            this.setState({ statusStep: this.state.statusStep - 1 });
        } 
        this.handleNextDisabled();
    };

    handleNext = async () => {
        if (this.state.stepper < 2) {
            if(this.state.stepper == 0 && this.state.requestStep == 1) {
                try {
                    await this.getDocumentCustomsNGen();
                } catch (e) {
                    this.showMessage(
                        "Containers is empty",
                        "",
                        "danger"
                    );
                }
            }

            const nextStep = this.state.stepper + 1;
            this.setState({ stepper: nextStep });
        } else if (this.state.stepper == 2) {
            try {
                await this.confirmBillingTransaction();

                // Dummy process
                this.getRatePlatform();
                // ===================
                
                this.setState({ statusStep: this.state.statusStep + 1 });
            } catch(e) {
                let errorMessage: string = e.toString();
                errorMessage = errorMessage.replace("Error:", "");
                errorMessage = errorMessage.replace("Error:", "");
                errorMessage = errorMessage.replace("Error:", "");
                this.showMessage(errorMessage, "", "danger")
                if (typeof e == "string") {
                }
            }
        }
        this.handleNextDisabled();
    };

    handleNextDisabled = () => {
        setTimeout(() => {
            const step = this.state.stepper;
            const requestStep = this.state.requestStep;
            let sppbNumber: string = this.state.sppbNumber ? this.state.sppbNumber : "";
            let sppbDate: any = this.state.sppbDate;
            let pibNumber: string = this.state.pibNumber ? this.state.pibNumber : "";
            let pibDate: any = this.state.pibDate;
            let doNumber: string = this.state.doNumber ? this.state.doNumber : "";
            let doDate: any = this.state.doDate;
            let documentType: any = this.state.documentType;

            sppbNumber = sppbNumber.trim();
            doNumber = doNumber.trim();
            pibNumber = pibNumber.trim();
            if (step == 0 && requestStep == 1 && !this.state.showResponseForm) {
                this.setState({nextDisabled: true});
            } else if(step === 0 && requestStep === 1 && this.state.showResponseForm) {
                if(
                    !documentType.value ||
                    !sppbNumber ||
                    !sppbDate ||
                    !pibNumber ||
                    !pibDate ||
                    !doNumber ||
                    !doDate
                ) {
                    this.setState({nextDisabled: true});
                } else {
                    this.setState({nextDisabled: false});
                }
            }  else if(step === 1) {
                let paidThru: any = this.state.paidThru;
                if(
                    !paidThru
                ) {
                    this.setState({nextDisabled: true});
                } else {
                    this.setState({nextDisabled: false});
                }
            } 
            else {
                this.setState({nextDisabled: false});
            }
        }, 250);
    };

    onSkipAddService = async () => {
        try {
            this.setState({ transactionSuccess: true });
        } catch(e) {

        }
    };

    onAddService = async () => {
        try {
            await this.onSubmit(false);
            this.setState({ showModal: false });
            this.setState({ isAddService: true });
        } catch(e) {

        }
    };
    
    saveAsDraft = async () => {
        try {
            await this.onSubmit(true);
            this.setState({ displayDraftAlert: true });
        } catch (e) {

        }
    }
    
    onJobSubmit = () => {
        this.setState({
            titleModal: "Request SP2 Success!",
            subTitleModal: "Would you like to add new services?"
        });
        this.setState({ showModal: true });
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
            {this.state.isShowMessage && (
                <GologsAlert
                    variant={this.state.messageVariant}
                    content={[
                        this.state.messageTitle,
                        this.state.messageTitle ? <br /> : "",
                        this.state.message
                    ]}
                />
            )}
            {this.state.transactionSuccess && (
                <Redirect
                    to={{
                        pathname: "/sp2-request/success"
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
                        pathname: "/sp2-request"
                    }}
                />
            )}
            <div className="mb-2">
                <TopWizard step={this.state.statusStep} />
            </div>
            <Triangle />
            <div className="rounded-20px bg-white">
                {this.state.statusStep == 0 && (
                    <>
                        <Title>
                            <GeneralTranslation slug="SP2.createNew" />
                        </Title>
                        <Stepper
                            step={this.state.stepper}
                            items={SP2.instructions}
                        />
                    </>
                )}
                {this.state.statusStep == 0 && (
                    <>
                        {this.state.stepper === 0 ? (
                            <>
                                <RequestForm
                                    data={this.state.data}
                                    requestStep={this.state.requestStep}
                                    blDateEditable={this.state.blDateEditable}
                                    cargoOwnerTaxId={this.state.cargoOwnerTaxId}
                                    onCheckClicked={this.doRequestDocument}
                                    onCargoOwnerTaxIdChange={
                                        this.onCargoOwnerTaxIdChange
                                    }
                                    cargoOwnerName={this.state.cargoOwnerName}
                                    onCargoOwnerNameChange={
                                        this.onCargoOwnerNameChange
                                    }
                                    forwarderTaxId={this.state.forwarderTaxId}
                                    onForwarderTaxIdChange={
                                        this.onForwarderTaxIdChange
                                    }
                                    forwarderName={this.state.forwarderName}
                                    onForwarderNameChange={
                                        this.onForwarderNameChange
                                    }
                                    onDateChange={this.onDateChange}
                                    date={this.state.date}
                                    disabledCheck={this.state.disabledCheck}
                                    btnSubmitRaised={this.doRequestCustomer}
                                    typeTransaction={this.state.typeTransaction}
                                    onTypeTransactionChange={
                                        this.onTypeTransactionChange
                                    }
                                    terminalOperator={
                                        this.state.terminalOperator
                                    }
                                    onTerminalOperatorChange={
                                        this.onTerminalOperatorChange
                                    }
                                    blNumber={this.state.blNumber}
                                    blNumberSelected={
                                        this.state.blNumberSelected
                                    }
                                    onBlNumberChange={this.onBlNumberChange}
                                    onBlNumberSelected={this.onBlNumberSelected}
                                />

                                {this.state.showResponseForm ? (
                                    <ResponseForm
                                        data={this.state.data}
                                        isDocumentFound={
                                            this.state.isDocumentFound
                                        }
                                        documentType={this.state.documentType}
                                        onDocumentTypeChange={
                                            this.onDocumentTypeChange
                                        }
                                        sppbNumber={this.state.sppbNumber}
                                        onSppbNumberChange={
                                            this.onSppbNumberChange
                                        }
                                        pibNumber={this.state.pibNumber}
                                        onPibNumberChange={
                                            this.onPibNumberChange
                                        }
                                        doNumber={this.state.doNumber}
                                        onDoNumberChange={this.onDoNumberChange}
                                        pibDate={this.state.pibDate}
                                        onPibDateChange={this.onPibDateChange}
                                        sppbDate={this.state.sppbDate}
                                        onSppbDateChange={this.onSppbDateChange}
                                        doDate={this.state.doDate}
                                        onDoDateChange={this.onDoDateChange}
                                        notifyEmails={this.state.notifyEmails}
                                        onNotifyEmailsChange={
                                            this.onNotifyEmailsChange
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
                            <ContainerForm
                                data={this.state.data}
                                paidThru={this.state.paidThru}
                                onPaidThruChange={this.onPaidThruChange}
                                onContainerSelected={this.onContainerSelected}
                            />
                        ) : (
                            ""
                        )}
                        {this.state.stepper === 2 ? (
                            <Review
                                showStatusContainerColumn={true}
                                containers={this.state.containers}
                                paidThru={this.state.paidThru}
                                cargoOwnerTaxId={this.state.cargoOwnerTaxId}
                                cargoOwnerName={this.state.cargoOwnerName}
                                forwarderTaxId={this.state.forwarderTaxId}
                                forwarderName={this.state.forwarderName}
                                typeTransaction={
                                    this.state.typeTransaction.label
                                }
                                terminalOperator={
                                    this.state.terminalOperator.value
                                }
                                blNumber={this.state.blNumber}
                                documentType={this.state.documentType}
                                sppbNumber={this.state.sppbNumber}
                                pibNumber={this.state.pibNumber}
                                doNumber={this.state.doNumber}
                                pibDate={this.state.pibDate}
                                sppbDate={this.state.sppbDate}
                                doDate={this.state.doDate}
                                date={this.state.date}
                                notifyEmails={this.state.notifyEmails}
                            />
                        ) : (
                            ""
                        )}
                    </>
                )}

                {this.state.statusStep == 1 && (
                    <div className="p-4">
                        <ProformaInvoice
                            invoice={this.state.invoice}
                            containers={this.state.containers}
                            paidThru={this.state.paidThru}
                            cargoOwnerTaxId={this.state.cargoOwnerTaxId}
                            cargoOwnerName={this.state.cargoOwnerName}
                            forwarderTaxId={this.state.forwarderTaxId}
                            forwarderName={this.state.forwarderName}
                            typeTransaction={this.state.typeTransaction}
                            terminalOperator={this.state.terminalOperator}
                            blNumber={this.state.blNumber}
                            documentType={this.state.documentType}
                            sppbNumber={this.state.sppbNumber}
                            pibNumber={this.state.pibNumber}
                            doNumber={this.state.doNumber}
                            pibDate={this.state.pibDate}
                            sppbDate={this.state.sppbDate}
                            doDate={this.state.doDate}
                            date={this.state.date}
                        />
                    </div>
                )}
            </div>

            <div className="mt-32px fs-16px">
                {this.state.stepper == -0 && this.state.requestStep === 0 && (
                    <>
                        <div className="fs-16px">
                            <GeneralTranslation
                                slug="prompt.contractNumberIsExist"
                                className="mr-1"
                            />

                            <Anchor
                                slug="SP2.delegate"
                                pathname="/delegate/create"
                                search="?service=sp2"
                            />
                        </div>
                    </>
                )}
            </div>

            <Footer className="d-flex">
                {(this.state.stepper > 0 || this.state.requestStep > 0) &&
                    this.state.stepper <= 2 && (
                        <GologsButton
                            variant="link-primary"
                            onClick={this.handlePrev}
                            contentByTranslation={true}
                            translation="wizard.bottom.previous"
                        />
                    )}
                {(this.state.stepper > 0 || this.state.requestStep > 0) &&
                    this.state.stepper <= 2 &&
                    this.state.statusStep == 0 && (
                        <GologsButton
                            variant="primary"
                            onClick={this.handleNext}
                            contentByTranslation={true}
                            disabled={this.state.nextDisabled}
                            showLoading={true}
                            translation="wizard.bottom.nextStep"
                        />
                    )}

                {this.state.statusStep == 1 && (
                    <>
                        <GologsButton
                            variant="outline-primary"
                            onClick={this.saveAsDraft}
                            contentByTranslation={true}
                            className="mr-3"
                            translation="saveAsDraft"
                        />

                        <TransactionSuccessModal
                            titleSlug="SP2.success"
                            subtitleSlug="prompt.addNewService"
                            onSkipAddService={this.onSkipAddService}
                            buttonSlug="paymentProcess"
                            buttonVariant="primary"
                            onClick={async () => {
                                await this.onSubmit(false);
                            }}
                            successTransactionUrl="/sp2-request/success"
                            serviceData={{
                                blNumber: this.state.blNumber,
                                blDate: this.state.date,
                                notifyEmail: this.state.notifyEmails
                            }}
                        />
                    </>
                )}
            </Footer>

            <PopupMessage
                show={this.state.displayDraftAlert ? true : false}
                onClose={() => {
                    this.setState({ displayDraftAlert: false });
                    window.location.href = "/sp2-request?tab=draft";
                }}
                messageSlug="SP2.draftMessage"
            />
        </>
    );
    }
}
