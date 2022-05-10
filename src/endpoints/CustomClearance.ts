import axios from "axios";
import config from "../config";
import Storage from "./Storage";
import User from "../model/User";
import moment from "moment";

type IFiles = {
    id?: string;
    documentType: string;
    fileName: string;
}

type IItems = {
    id: string;
    hsCode: string;
    itemName: string;
    quantity: Number;
}

type IForm = {
    cargoOwnerNpwp: string;
    cargoOwnerName: string;
    cargoOwnerAddress?: string;
    ppjkNpwp: string;
    ppjkName: string;
    phone: string;
    documentTypeName: string;
    customsOfficeName: string;
    requestDate: string;
    pibTypeName: string;
    importTypeName: string;
    paymentMethodName: string;
    blNumber: string;
    blDate: string;
    senderName?: string;
    senderAddress?: string;
    sellerName?: string;
    sellerAddress?: string;
    importirName?: string;
    importirAddress?: string;
    portOfLoadingCode?: string;
    portOfLoadingName?: string;
    portOfTransitCode?: string;
    portOfTransitName?: string;
    portOfDestinationCode?: string;
    portOfDestinationName?: string;
    notifyEmail: string[];
    files: IFiles[];
    items: IItems[];
}

const store = async (param: IForm, isDraft: boolean) => {
    let resp: any = {};
    let ajax: any = {};
    let args: any = param;
    const companyType = User.getCompanyType();
    let headers: any = {
        "Content-Type": "application/json"
    };

    headers = Object.assign(headers, config.headerBase());
    args.isDraft = isDraft;
      if(companyType !== "Forwarder") {
      args.createdBy = User.getCompanyName();
    }
    try {
        ajax = await axios.post(
            `${config.urls.customClearanceServer}/Master/SaveCustomClearance`,
            args,
            {
                headers: headers
            }
        );

        resp = ajax.data;
    } catch (e) {
        throw Error(e);
    }

    return resp;
};

const list = async (formData: any) => {
    let headers: any = config.headerBase();
    let dt: any = {};
    dt.data = {};
    try {
        dt = await axios.get(
            `${config.urls.customClearanceServer}/Master/ListCustomClearance`,
            {
                params: formData,
                headers: headers
            }
        );
    } catch (e) {}

    return dt;
};

const getNewIdTransaction = async () => {
    let params: any = {};
    let ajax: any = {};
    let data: any = {};
    let response: any = "";
    params.IsCreatedDateDesc = true;
    ajax = await list(params);
    data = ajax.data;
    data = data.data;
    if(data.length > 0) {
      data = data[0];
      response = data.id;
    }

    return response;
}

const updateStatus = async (id: string, status: number, statusName : string) => {
    let headers: any = config.headerBase();
    let ajax: any = {};
    let response: any = {};
    let formData: any = {};

    formData.id = id;
    formData.positionStatus = status;
    formData.positionStatusName = statusName;
    try {
        ajax = await axios.post(
            `${config.urls.customClearanceServer}/Master/UpdateStatusCustom`,
            formData,
            {
                headers: headers
            }
        );
        response = ajax.data;
    } catch (e) {}

    return response;
};

const CustomClearance = {
    getCustomsOffice: async () => {
        let resp: any = [];
        resp.push({
            id: "1",
            name: "KPPBC Jakarta"
        });
        resp.push({
            id: "2",
            name: "KPPBC Surabaya"
        });
        resp.push({
            id: "3",
            name: "KPPBC Sabang"
        });
        resp.push({
            id: "4",
            name: "KPPBC Banda Aceh"
        });

        return resp;
    },
    getPibType: async () => {
        let resp: any = [];
        resp.push({
            id: "1",
            name: "Biasa"
        });
        resp.push({
            id: "2",
            name: "Berkala"
        });
        resp.push({
            id: "2",
            name: "Penyelesaian"
        });

        return resp;
    },
    getDocumentType: async () => {
        let resp: any = [];
        resp.push({
            id: "1",
            name: "BC 2.0"
        });
        resp.push({
            id: "2",
            name: "BC 2.3"
        });
        resp.push({
            id: "3",
            name: "BC 2.5"
        });
        resp.push({
            id: "4",
            name: "BC 2.6.1"
        });
        resp.push({
            id: "5",
            name: "BC 2.6.2"
        });
        resp.push({
            id: "6",
            name: "BC 2.6.7"
        });

        return resp;
    },
    getImportType: async () => {
        let resp: any = [];
        resp.push({
            id: "1",
            name: "Sementara"
        });

        return resp;
    },
    getPaymentMethod: async () => {
        let resp: any = [];
        resp.push({
            id: "1",
            name: "Tunai"
        });
        resp.push({
            id: "2",
            name: "Credit"
        });

        return resp;
    },
    list: list,
    getNewIdTransaction: getNewIdTransaction,
    updateStatus: updateStatus,
    store: store,
    show: async (id: string) => {
        let headers: any = config.headerBase();
        let ajax: any = {};
        let response: any = {};
        let params: any = {};
        let files: any = {};
        let bl: any = {};
        let invoice: any = {};
        let packingList: any = {};
        params.Id = id;
        try {
            ajax = await axios.get(
                `${config.urls.customClearanceServer}/Master/GetCustomClearance`,
                {
                    params: params,
                    headers: headers
                }
            );
            ajax = ajax.data;
            response = ajax.data;
            files = response.files;
            bl = files.find(param => param.documentType === "bl");
            response.bl = bl ? bl.fileName : "";
            invoice = files.find(param => param.documentType === "invoice");
            response.invoice = invoice ? invoice.fileName : "";
            packingList = files.find(param => param.documentType === "packingList");
            response.packingList = packingList ? packingList.fileName : "";
        } catch (e) {}

        return response;
    }
};

export default CustomClearance;
