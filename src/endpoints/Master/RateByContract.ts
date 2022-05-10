import axios from "axios";
import config from "../../config";

const RateByContract = {
    list: async (formData = {}) => {
        let dt: any = {};
        dt.data = [];

        return dt;
    },
    store: async (formData: any) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        let dt: any = {};
        dt.data = [];

        return dt;
    },    
    update: async (formData: any, id) => {
          let headers: any = config.headerBase();
          let data: any = formData;
          let dt: any = {};
          dt.data = [];

          return dt;    
    },    
    destroy: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        dt.data = [];

        return dt;
    },    
    show: async (id) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let row: any = {};
        let resp: any = {};

        return resp;
    }    
};

export default RateByContract;
