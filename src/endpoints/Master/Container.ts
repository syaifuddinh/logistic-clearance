import axios from "axios";
import config from "../../config";

type ContainerForm = {
    containerCode: string;
    containerType: string;
    containerNumber: string;
    size: string;
    maxWeightInKg: string;
    owner: string;
    condition: string;
    attachmentUrl: string;
}

const Container = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.container}/Container`, {
            headers: headers
        });
    },
    store: async (formData: ContainerForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.post(`${config.urls.masterServer.container}/Container`, data, {
            headers: headers
        });
    },    
    update: async (formData: ContainerForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        return await axios.put(`${config.urls.masterServer.container}/Container/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.container}/Container/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.container}/Container`,  {
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

export default Container;
