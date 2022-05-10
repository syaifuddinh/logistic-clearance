import axios from "axios";
import config from "../../config";

type BusinessTypeForm = {
    businessCode: string;
    businessName: string;
}

const BusinessType = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(
            `${config.urls.masterServer.businessType}/BusinessType`,
            {
                headers: headers
            }
        );
    },
    store: async (formData: BusinessTypeForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.masterServer.businessType}/BusinessType`, data, {
            headers: headers
        });
    },    
    update: async (formData: BusinessTypeForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.businessType}/BusinessType/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.businessType}/BusinessType/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.businessType}/BusinessType`,  {
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

export default BusinessType;
