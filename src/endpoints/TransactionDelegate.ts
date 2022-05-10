import axios from "axios";
import config from "../config";
import User from "../model/User";

type IFormData = {
    saveAsDraft: boolean;
    serviceName: string;
    blNumber?: string;
    contractNumber: string;
    frieghtForwarderName: string;
    blDocument: string;
    letterOfIndemnity: string;
    attorneyLetter: string;
    notifyEmails?: string[];
    positionStatus: string;
    positionStatusName: string;
};

const TransactionDelegate = {
    store: async (formData: IFormData) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let params: any = {};
        let person: any = "";
        person = User.getCompanyName();
        if (!person) {
            person = "";
        }
        params = formData;
        params.rowStatus = 0;
        params.createdBy = person;
        params.modifiedBy = person;
        params.createdDate = new Date();
        params.modifiedDate = new Date();
        params.containers = [];
        try {
            dt = await axios.post(
                `${config.urls.sp2Server}/Master/SaveDelegate`,
                formData,
                {
                    headers: headers
                }
            );

            dt = dt.data;
        } catch (e) {
            throw new Error(e);
        }

        return dt;
    },
    list: async (formData: any) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        dt.data = {};
        try {
            dt = await axios.get(
                `${config.urls.sp2Server}/Master/ListDelegate`,
                {
                    params: formData,
                    headers: headers
                }
            );
        } catch (e) {}

        return dt;
    },
    updateStatus: async (id, positionStatus, positionStatusName) => {
      try {
            let headers: any = config.headerBase();
            let params: any = {};
            let queryString: any = "";
            params.id = id;
            params.positionStatus = positionStatus;
            params.positionStatusName = positionStatusName;
            params.createdBy = User.getCompanyName();
            queryString = Object.keys(params)
                .map(key => `${key}=${params[key]}`)
                .join("&");
            queryString = "?" + queryString;
            await axios.post(
                config.urls.sp2Server +
                    "/Master/UpdateStatusDelegate" +
                    queryString,
                {
                    headers: headers
                }
            );
        } catch (e) {}
    },
    show: async (id: string) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let args: any = {};
        let url: string = `${config.urls.sp2Server}/Master/DetailDelegate`;
        args.id = id;
        try {
            dt = await axios.post(url,
              {},
              {
                  params: args,
                  headers: headers
              }
            );
            dt = dt.data;
        } catch (e) {}

        return dt;
    }
};

export default TransactionDelegate;
