import axios from "axios";
import config from "../../config";

type ContractForm = {
    id?: string;
    companyId?: string;
    cargoOwnerId?: string;
    contractNumber: string;
    emailPPJK: string;
    firstParty: string;
    secondParty: string;
    services: string;
    startDate: string;
    endDate: string;
    billingPeriod: string;
    priceRate?: number;
}

const Contract = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.contract}/Contract`, {
            headers: headers
        });
    },
    store: async (formData: ContractForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.sp2Server}/Master/SaveContract`, data, {
            headers: headers
        });
    },    
    update: async (formData: ContractForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.id = id;
        data.rowStatus = true;
        return await axios.post(
            `${config.urls.sp2Server}/Master/SaveContract`,
            data,
            {
                headers: headers
            }
        );
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.contract}/Contract/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        let params: any = {}
        params.Id = id;
        try {
            dt = await axios.get(`${config.urls.sp2Server}/Master/DetailContract`, {
                params: params,
                headers: headers
            });

            resp = dt.data;
        } catch(e) {

        }

        return resp;
    }    
};

export default Contract;
