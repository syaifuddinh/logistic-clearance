import axios from "axios";
import config from "../../config";

type DepoForm = {
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    picName: string;
    contractPeriodStart: string;
    contractPeriodEnd: string;
    attachmentUrl: string;
}

const Depo = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.depo}/Depo`, {
            headers: headers
        });
    },
    store: async (formData: DepoForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.masterServer.depo}/Depo`, data, {
            headers: headers
        });
    },    
    update: async (formData: DepoForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.depo}/Depo/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.depo}/Depo/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.depo}/Depo`,  {
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

export default Depo;
