import axios from "axios";
import config from "../../config";

type ShippingAgentForm = {
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    picName: string;
    contractPeriodStart: string;
    contractPeriodEnd: string;
    attachmentUrl: string;
}

const ShippingAgent = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.shippingAgent}/ShippingAgent`, {
            headers: headers
        });
    },
    store: async (formData: ShippingAgentForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.masterServer.shippingAgent}/ShippingAgent`, data, {
            headers: headers
        });
    },    
    update: async (formData: ShippingAgentForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.shippingAgent}/ShippingAgent/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.shippingAgent}/ShippingAgent/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.shippingAgent}/ShippingAgent`,  {
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

export default ShippingAgent;
