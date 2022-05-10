import axios from "axios";
import config from "../../config";
import User from "../../model/User";

type InTransitForm = {
    id?: string;
    service: string;
    errorMessage: string;
    status?: string;
    jobNumber?: string;
    jobCreatedDate?: any;
}

const InTransit = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.inTransit}/InTransit`, {
            headers: headers
        });
    },
    store: async (formData: InTransitForm, params?: any) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        let company: any = {};
        let idx: any = "";
        let paramsMessage: any = "";
        data.errorCreatedDate = new Date();
        company = User.getCompany();
        data.customerId = company.id;
        data.customerName = company.name;
        if(params) {
            for(idx in params) {
               if (params[idx]) {
                  paramsMessage += " " + idx + " = " + params[idx] + ",";
                } else {
                  paramsMessage += " " + idx + " = ,";
               }
            }
            paramsMessage = paramsMessage.replace(/(.*),$/, "$1");
            if(paramsMessage) {
                data.errorMessage += ". " + paramsMessage;
            }
        }
        try {
            await axios.post(`${config.urls.masterServer.inTransit}/InTransit`, data, {
                headers: headers
            });
        } catch(e) {

        }
    },    
    update: async (formData: InTransitForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.inTransit}/InTransit/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.inTransit}/InTransit/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.inTransit}/InTransit`,  {
                headers: headers
            });

            dt = dt.data;
            row = dt.find(v => v.id === id);
            if(row) {
                resp = row;
            } 
        } catch(e) {

        }

        return resp;
    }    
};

export default InTransit;
