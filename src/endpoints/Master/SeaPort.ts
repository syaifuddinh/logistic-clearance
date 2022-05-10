import axios from "axios";
import config from "../../config";

type SeaPortForm = {
    portCode: string;
    portName: string;
    country: string;
    city: string;
};

const SeaPort = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.seaPort}/SeaPorts`, {
            headers: headers
        });
    },
    store: async (formData: SeaPortForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.portType = "Dry Port";
        return await axios.post(
            `${config.urls.masterServer.seaPort}/SeaPorts`,
            data,
            {
                headers: headers
            }
        );
    },    
    update: async (formData: SeaPortForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.portType = "Dry Port";
        return await axios.put(
            `${config.urls.masterServer.seaPort}/SeaPorts/` + id,
            data,
            {
                headers: headers
            }
        );
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.seaPort}/SeaPorts/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.seaPort}/SeaPorts`,  {
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

export default SeaPort;
