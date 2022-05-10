import axios from "axios";
import config from "../../config";

type ShippingLineForm = {
    shippingLineCode: string;
    shippingLineName: string;
    shippingLineAddress: string;
    shippingLinePhone: string;
    shippingLinePICName: string;
    contractPeriodFrom: string;
    contractPeriodTo: string;
    fileAttachment: string;
}

const SeaPort = {
    list: async (formData = {}) => {
        let headers: any = config.headerBase();
        return await axios.get(`${config.urls.masterServer.shippingLine}/ShippingLine`, {
            headers: headers
        });
    },
    store: async (formData: ShippingLineForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.shippingLineAlias = data.shippingLineCode;
        data.vesselCode = data.shippingLineCode;
        return await axios.post(`${config.urls.masterServer.shippingLine}/ShippingLine`, data, {
            headers: headers
        });
    },    
    update: async (formData: ShippingLineForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.shippingLineAlias = formData.shippingLineCode;
        data.vesselCode = formData.shippingLineCode;
        return await axios.put(`${config.urls.masterServer.shippingLine}/ShippingLine/` + id, data, {
            headers: headers
        });
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        return await axios.delete(`${config.urls.masterServer.shippingLine}/ShippingLine/` + id,  {
            headers: headers
        });
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};
        try {
            dt = await axios.get(`${config.urls.masterServer.shippingLine}/ShippingLine`,  {
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
