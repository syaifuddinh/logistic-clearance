import axios from "axios";
import config from "../config";
import User from "../model/User";

const Email = {
    afterInvoice: async (jobNumber, email, blCode) => {
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.post(
                `${config.urls.authServer}/api/Email/AfterInvoice`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: email
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterInvoiceDelegate: async (jobNumber, email, blCode) => {
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterInvoiceDelegate`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: email
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterSP2Invoice: async (
        emailCC: string[],
        transactionNumber: string,
        invoiceNumber: string,
        invoiceAmount: number,
        invoiceUrl: string
    ) => {
        let param: any = {};
        let customerName: string = "";
        let customerEmail: string = "";
        let company: any = {}
        company = User.getCompany();
        customerName = company.name ? company.name : "";
        customerEmail = company.email ? company.email : "";
        param = {
            custName: customerName,
            custEmail: customerEmail,
            emailCC: emailCC,
            transNum: transactionNumber,
            invNum: invoiceNumber,
            invAmount: invoiceAmount.toString(),
            invUrl: invoiceUrl
        };
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.post(
                `${config.urls.authServer}/api/Email/AfterInvoiceKoja`,
                param,
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterSP2Released: async (
        emailCC: string[],
        transactionNumber: string,
        documentUrl: string
    ) => {
        let param: any = {};
        let customerName: string = "";
        let customerEmail: string = "";
        let company: any = {}
        company = User.getCompany();
        customerName = company.name ? company.name : "";
        customerEmail = company.email ? company.email : "";
        param = {
            custName: customerName,
            custEmail: customerEmail,
            emailCC: emailCC,
            transNum: transactionNumber,
            gpUrl: documentUrl
        };
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.post(
                `${config.urls.authServer}/api/Email/GatePass`,
                param,
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterPayment: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};

            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.authServer}/api/Email/AfterPayment`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: email
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterPaymentDelegate: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};

            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterPaymentDelegate`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: email
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterDORelease: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};

            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.authServer}/api/Email/AfterDORelease`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: email
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterDOReleaseDelegate: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            authUser = JSON.parse(authUser);
            headers["Authorization"] = authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterDOReleaseDelegate`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: email
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterDORequest: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.authServer}/api/Email/AfterDORequest`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterDORequestDelegate: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterDORequestDelegate`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterSubmitCustomClearance: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterCustomRequest`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterInvoiceCustomClearance: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterInvoiceCustom`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
              {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterPaymentConfirmationCustomClearance: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterPaymentCustom`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterReleaseCustomClearance: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterCustomRelease`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterSubmitDelegate: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/Delegate`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    afterSubmitDelegateForForwarder: async (jobNumber, email, blCode) => {
        try {
            let authUser: any = localStorage.getItem("authUser");
            let headers: any = {};
            let emailParam: any = [];
            emailParam = email.filter(param => param);
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;

            let dt: any = await axios.post(
                `${config.urls.delegateNotificationServer}/api/Email/AfterForwardDelegate`,
                {
                    jobNumber: jobNumber,
                    blCode: blCode,
                    emailCC: emailParam
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    }
};

export default Email;
