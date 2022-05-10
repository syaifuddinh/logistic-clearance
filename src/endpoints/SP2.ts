import axios from "axios";
import config from "../config";
import User from "../model/User";
import moment from "moment";

type Containers = {
    blNumber: string;
    vesselId: string;
    vesselName: string;
    voyageNumber: string;
    containerNumber: string;
    containerSize: string;
    containerType: string;
    status?: string;
    id?: string;
};

type Prerequisites = {
    STATUS: string;
    sppbNumber: any[];
    sppbDate: any[];
    blNumber: any[];
    containerNumber: any[];
    vesselNumber: any[];
    voyageNumber: any[];
    containerSize: any[];
    containerType: any[];
    eta: any[];
    vesselName: any[];
    statusName: any[];
};

type IConfirmBilling = {
    pmId: any;
    emailReq: any;
    phoneReq: any;
    custIdReq: any;
    transactionsTypeId: any;
    customsDocumentId: any;
    documentNo: any;
    documentDate: any;
    documentShippingNo: any;
    documentShippingDate: any;
    noBlAwb: any;
    paidThru: any;
    voyageNo: any;
    vesselId: any;
    noCont: any[];
    owner: any[];
    isoCode: any[];
    weight: any[];
    pol: any[];
    pod: any[];
    fd: any[];
    companyCode: any;
};

type IForm = {
    id?: string;
    cargoOwnerTaxId: string;
    cargoOwnerName: string;
    forwarderTaxId: string;
    forwarderName: string;
    terminalOperator: string;
    typeTransaction: string;
    documentType: string;
    blNumber: string;
    jobNumber?: string;
    blDate: string;
    sppbNumber: string;
    sppbDate: string;
    pibNumber: string;
    pibDate: string;
    doNumber: string;
    doDate: string;
    isDraft?: boolean;
    paymentMethod: string;
    proformaInvoiceNo: string;
    subTotalByThirdParty: number;
    platformFee: number;
    vat: number;
    grandTotal: number;
    rowStatus?: boolean;
    dueDate: string;
    containers: Containers[];
}

const login = async () => {
    try {
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/Authentication/Login`,
            {
                username: "GOLOGS",
                password: "123",
                phoneNumber: "081230943248"
            }
        );
        return dt.data;
    } catch (e) {
        throw Error(e);
    }
};

const logout = async sessionId => {
    try {
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/Authentication/Logout`,
            {
                sessionId: sessionId
            }
        );
        return dt.data;
    } catch (e) {
        throw Error(e);
    }
};

const getGatePassUrl = (proformaInvoiceNumber, containerNumbers: any[]) => {
    let url: string = `${config.urls.sp2Server}/Billing/GatePass`;
    let args: any = {};
    args.proforma = proformaInvoiceNumber;
    args.container = containerNumbers;
    args.filename = "GP01";

    url += "?";
    url += "proforma=" + args.proforma;
    containerNumbers.forEach(param => {
        url += "&";
        url += "container=" + param;
    });
    url += "&";
    url += "filename=" + args.filename;

    return url;
}
const streamGatePassFile = async (proformaInvoiceNumber, containerNumbers: any[]) => {
    let url: any = "";
    url = getGatePassUrl(proformaInvoiceNumber, containerNumbers);
    window.console.log(url);
    try {
        window.open(url, "_blank");
        // let dt: any = await Storage.streamFileByUrl(url);
        // let fileOpen: any = window.URL.createObjectURL(
        //     new Blob([dt], {
        //         type: "application/pdf"
        //     })
        // );
        // let link: any = window.document.createElement("a");
        // window.console.log(dt);
        // link.href = fileOpen;
        // link.target = "_blank";
        // link.download = "GatePass.pdf";
        // window.document.body.appendChild(link);
        // link.click();
        // link.parentNode.removeChild(link);
    } catch (e) {
        throw Error(e);
    }
};

const BLNumbers = async (npwp) => {
    let dt: any = {};
    let resp: any 
    = [];
    let param: any = {};
    param.doc = "noblbc20";
    param.npwp = npwp;
    try {
        let dt: any = await axios.get(
            `${config.urls.sp2Server}/MasterData/BLNumbers`, {params: param}
        );
        dt = dt.data;
        if(dt) {
            dt = JSON.parse(dt);
            resp = dt["Data BL BC 2.0"];
        }
    } catch (e) {
        throw Error(e.message);
    }

    return resp;
};

const getTransactionTypes = async (categoryId, terminalId) => {
    let sessionId: any = {};
    let groupId: any = {};
    let loginData: any = {};
    let dt: any = {};
    try {
        loginData = await login();
        sessionId = loginData.sessionId;
        groupId = loginData.groupId;
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/MasterData/TransactionsType`,
            {
                creator: sessionId,
                request: {
                    categoryId: categoryId,
                    terminalId: terminalId,
                    groupId: groupId
                }
            }
        );
        await logout(sessionId);
        return dt.data;
      } catch (e) {
        await logout(sessionId);
        throw Error(e);
    }
};

const getDocCodeCustoms = async (categoryId, terminalId) => {
    let sessionId: any = {};
    let groupId: any = {};
    let loginData: any = {};
    let dt: any = {};
    try {
        loginData = await login();
        sessionId = loginData.sessionId;
        groupId = loginData.groupId;
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/MasterData/DocCodeCustoms`,
            {
                creator: sessionId,
                request: {
                    categoryId: categoryId,
                    terminalId: terminalId,
                    groupId: groupId
                }
            }
        );
        await logout(sessionId);
        return dt.data;
      } catch (e) {
        await logout(sessionId);
        throw Error(e);
    }
};

const getDocumentCustomsNGen = async (documentNo, terminalId, customsDocumentId, transactionTypeId) => {
    let sessionId: any = "";
    let custIdPpjk: any = "";
    let loginData: any = {};
    let dt: any = {};
    let message: string = "";
    let resp: Prerequisites = {
        STATUS: "FALSE",
        sppbNumber: [],
        sppbDate: [],
        blNumber: [],
        containerNumber: [],
        vesselNumber: [],
        voyageNumber: [],
        containerSize: [],
        containerType: [],
        eta: [],
        vesselName: [],
        statusName: [],
    };
    try {
        if (documentNo && terminalId  && transactionTypeId) {
            loginData = await login();
            sessionId = loginData.sessionId;
            custIdPpjk = loginData.custId;
            dt = await axios.post(
                `${config.urls.sp2Server}/MasterData/DocumentCustomsNGen`,
                {
                    creator: sessionId,
                    request: {
                        documentNo: documentNo,
                        customsDocumentId: customsDocumentId,
                        transactionTypeId: transactionTypeId,
                        custIdPpjk: custIdPpjk,
                        terminalId: terminalId
                    }
                }
            );
            await logout(sessionId);
            if(dt.data.status === "FALSE") {
                message = dt.data.message ? dt.data.message : "Data not found"; 
                throw new Error(message);
            }
            resp.STATUS = dt.data.STATUS
            if (dt.data.noSppb) {
                if (dt.data.noSppb.length > 0) {
                    resp.sppbNumber = dt.data.noSppb;
                    resp.sppbDate = dt.data.tglSppb;
                    resp.blNumber = dt.data.noBlAwb;
                    resp.containerNumber = dt.data.noCont;
                    resp.vesselNumber = dt.data.vesselId;
                    resp.voyageNumber = dt.data.noVoyFlight;
                    resp.containerSize = dt.data.cntrSize;
                    resp.containerType = dt.data.cntrType;
                    resp.eta = dt.data.eta;;
                    resp.vesselName = dt.data.nmAngkut;
                    resp.statusName = dt.data.statusPaid;
                }
            }
        }
        return resp;
      } catch (e) {
          await logout(sessionId);
          throw Error(e.toString());
    }
};


const getCoreor = async (documentNo, blNumber, terminalId) => {
    let sessionId: any = "";
    let loginData: any = {};
    let dt: any = {};
    let resp: Containers[] = [];
    try {
        if ((documentNo || blNumber) && terminalId) {
            loginData = await login();
            sessionId = loginData.sessionId;
            dt = await axios.post(
                `${config.urls.sp2Server}/MasterData/Coreor`,
                {
                    creator: sessionId,
                    request: {
                        documentNo: documentNo,
                        blNbr: blNumber,
                        terminalId: terminalId,
                    }
                }
            );
            await logout(sessionId);
            resp = dt.data;
        }
        return resp;
      } catch (e) {
        await logout(sessionId);
        throw Error(e);
    }
};

const confirmBillingTransaction = async (params: IConfirmBilling) => {
    let sessionId: any = "";
    let custId: any = "";
    let loginData: any = {};
    let dt: any = {};
    let args: any = {};
    let resp: any = {};
    try {
        loginData = await login();
        sessionId = loginData.sessionId;
        custId = loginData.custId;
        args.creator = sessionId;
        args = params;
        args.customsDocumentId = args.customsDocumentId.toString();
        args.transactionsTypeId = args.transactionsTypeId.toString();
        args.custId = custId;
        dt = await axios.post(
            `${config.urls.sp2Server}/Billing/ConfirmTransaction`,
            {
                creator: sessionId,
                request: args
            }
        );
        await logout(sessionId);
        resp = dt.data;
        if(resp.status === "FALSE") {
            throw new Error(resp.message);
        }
        return resp;
    } catch (e) {
        await logout(sessionId);
        throw Error(e);
    }
};


const getBilling = async (transactionId) => {
    let dt: any = {};
    let args: any = {};
    let resp: any = {};
    let loginData: any = {};
    let sessionId: any = "";
    try {
        loginData = await login();
        sessionId = loginData.sessionId;
        args.transactionId = transactionId;
        dt = await axios.post(`${config.urls.sp2Server}/Billing/Billing`, {
            creator: sessionId,
            request: args
        });
        await logout(sessionId);
        resp = dt.data;
        return resp;
    } catch (e) {
        if(sessionId) {
            await logout(sessionId);
        }
        throw Error(e);
    }
};

const getBillingDetail = async (transactionTypeId, proformaInvoiceNo) => {
    let dt: any = {};
    let args: any = {};
    let resp: any = {};
    let loginData: any = {};
    let sessionId: any = "";
    try {
        loginData = await login();
        sessionId = loginData.sessionId;
        // args.transactionTypeId = transactionTypeId;
        args.proformaInvoiceNo = proformaInvoiceNo;
        dt = await axios.post(`${config.urls.sp2Server}/Billing/BillingDetail`, {
            creator: sessionId,
            request: args
        });
        await logout(sessionId);
        resp = dt.data;
        // Replace URL
        if(resp.detailBilling) {
            if(resp.detailBilling.link) {
                resp.detailBilling.link = resp.detailBilling.link.replace(
                    "http://ebilling.tpkkoja.co.id",
                    "http://123.231.237.23"
                ); 
            }
        }
        // =============================
        return resp;
    } catch (e) {
        if(sessionId) {
            await logout(sessionId);
        }
        throw Error(e);
    }
};

const getPaymentInquery = async ( proformaInvoiceNo) => {
    let dt: any = {};
    let args: any = {};
    let resp: any = {};
    let loginData: any = {};
    let sessionId: any = "";
    try {
        // args.transactionTypeId = transactionTypeId;
        args.billKey = proformaInvoiceNo;
        args.trxDate = moment(new Date()).format("MMDDHHmmSS");
        args.transDate = moment(new Date()).format("MMDDHHmmSS");
        args.companyCode = "GOLOGS";
        args.channelId = "GOLOGS";
        args.reference = "BNI";
        dt = await axios.get(`${config.urls.sp2Server}/Payment/Inquiry`, {params: args});
        resp = dt.data;
        return resp;
    } catch (e) {
        throw Error(e);
    }
};

const store = async (formData: IForm) => {
    let dt: any = {};
    let args: any = formData;
    const companyType = User.getCompanyType();
    args.id = null;
    if(companyType !== "Forwarder") {
        args.createdBy = User.getCompanyName(); 
    }
    try {
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/Master/SaveSP2`,
            args
        );

        return dt.data;
    } catch (e) {
        throw Error(e);
    }
}

const updateStatus = async (id, jobNumber, status) => {
    let headers: any = config.headerBase();
    let args: any = {};
    args.id = id;
    args.jobNumber = jobNumber;
    args.status = status;
    args.createdBy = User.getPersonName();
    try {
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/Master/UpdateStatus`,
            args,
            {
                headers: headers
            }
        );

        return dt.data;
    } catch (e) {
        throw Error(e);
    }
}

const update = async (formData: IForm, id) => {
    let dt: any = {};
    let args: any = formData;
    args.id = id;
    try {
        let dt: any = await axios.post(
            `${config.urls.sp2Server}/Master/SaveSP2`,
            args
        );

        return dt.data;
    } catch (e) {
        throw Error(e);
    }
}

const cancelTransaction = async (id, reason) => {
    let headers: any = config.headerBase();
    let dt: any = {};
    let params: any = {};
    dt.data = {};
    params.id = id;
    params.reason = reason;
    try {
        dt = await axios.post(`${config.urls.sp2Server}/Master/CancelTransaction`,
          params,
          {
              headers: headers
          }
        );
    } catch (e) {}

    return dt;
}

const SP2 = {
    login: login,
    logout: logout,
    getTerminals: async () => {
        let sessionId: any = {};
        let loginData: any = {};
        let dt: any = {};
        let resp: any = {};
        try {
            loginData = await login();
            sessionId = loginData.sessionId;
            if (sessionId) {
                let dt: any = await axios.post(
                    `${config.urls.sp2Server}/MasterData/Terminal`,
                    {
                        creator: sessionId
                    }
                );
                await logout(sessionId);
                resp = dt.data;
            }

            return resp;
        } catch (e) {
            throw Error(e);
        }
    },
    getTransactionTypes: getTransactionTypes,
    getDocumentCustomsNGen: getDocumentCustomsNGen,
    getCoreor: getCoreor,
    BLNumbers: BLNumbers,
    confirmBillingTransaction: confirmBillingTransaction,
    getBilling: getBilling,
    getBillingDetail: getBillingDetail,
    getPaymentInquery: getPaymentInquery,
    streamGatePassFile: streamGatePassFile,
    store: store,
    update: update,
    cancelTransaction: cancelTransaction,
    updateStatus: updateStatus,
    getGatePassUrl: getGatePassUrl,
    list: async (formData: any) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        dt.data = {};
        try {
            dt = await axios.get(`${config.urls.sp2Server}/Master/ListSP2`, {
                params: formData,
                headers: headers
            });

        } catch (e) {}

        return dt;
    },
    show: async (id: string) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let args: any = {};
        let url: string = `${config.urls.sp2Server}/Master/DetailSP2`;
        args.Id = id;
        try {
            dt = await axios.get(url, {
                params: args,
                headers: headers
            });
            dt = dt.data;
        } catch (e) {}

        return dt;
    },
    getImportDocCodeCustoms: async terminalId => {
        let dt: any = {};
        try {
            dt = await getDocCodeCustoms("I", terminalId);
            return dt;
        } catch (e) {
            throw Error(e);
        }
    },
    getImportTransactionTypes: async terminalId => {
        let dt: any = {};
        try {
            dt = await getTransactionTypes("I", terminalId);
            return dt;
        } catch (e) {
            throw Error(e);
        }
    },
    getExportTransactionTypes: async terminalId => {
        let dt: any = {};
        try {
            dt = await getTransactionTypes("I", terminalId);
            return dt;
        } catch (e) {
            throw Error(e);
        }
    },
    getDetailDocument: async (
        npwp,
        blNumber,
        blDate
    ) => {
        let dt: any = {};
        let resp: any = {};
        let args: any = {};
        let url: string = `${config.urls.sp2Server}/Master/GetSPPB`;
        args.npwp = npwp;
        args.blNumber = blNumber;
        args.blDate = moment(new Date(blDate)).format("YYYYMMDD");
        url += "/" + args.npwp;
        url += "/" + args.blNumber;
        url += "/" + args.blDate;
        try {
            let dt: any = await axios.get(
                url
            );
            resp = dt.data;
            if(typeof resp === "string") {
                resp = JSON.parse(resp);
                resp = resp["Document BC 20"];
                if(resp.length > 0) {
                  resp = resp[0];
                }
            }

            return resp;
        } catch (e) {
            throw Error(e);
        }
    }
};

export default SP2;
