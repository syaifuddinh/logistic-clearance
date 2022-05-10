import axios from "axios";
import config from "../../config";

type ModuleForm = {
    moduleCode: string;
    moduleName: string;
}

const Module = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.module}/Module`, {
            headers: headers
        });
    },
    store: async (formData: ModuleForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.masterServer.module}/Module`, data, {
            headers: headers
        });
    },    
    update: async (formData: ModuleForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.module}/Module/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.module}/Module/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.module}/Module`,  {
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

export default Module;
