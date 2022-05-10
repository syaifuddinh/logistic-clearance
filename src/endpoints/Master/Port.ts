import axios from "axios";
import config from "../../config";

type PortForm = {
    portCode: string;
    portName: string;
    country: string;
    city: string;
}

const Port = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.port}/Port`, {
            headers: headers
        });
    },
    store: async (formData: PortForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.portType = "Dry Port";
        return await axios.post(`${config.urls.masterServer.port}/Port`, data, {
            headers: headers
        });
    },    
    update: async (formData: PortForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.portType = "Dry Port";
        return await axios.put(`${config.urls.masterServer.port}/Port/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.port}/Port/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.port}/Port`,  {
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

export default Port;
