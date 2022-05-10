import axios from "axios";
import config from "../../config";

type ModuleGroupForm = {
    moduleGroupCode: string;
    moduleGroupName: string;
}

const ModuleGroup = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(
            `${config.urls.masterServer.moduleGroup}/ModuleGroup`,
            {
                headers: headers
            }
        );
    },
    store: async (formData: ModuleGroupForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.masterServer.moduleGroup}/ModuleGroup`, data, {
            headers: headers
        });
    },    
    update: async (formData: ModuleGroupForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.moduleGroup}/ModuleGroup/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.moduleGroup}/ModuleGroup/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.moduleGroup}/ModuleGroup`,  {
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

export default ModuleGroup;
