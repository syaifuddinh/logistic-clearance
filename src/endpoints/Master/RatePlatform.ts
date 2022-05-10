import axios from "axios";
import config from "../../config";

type IForm = {
    rateNominal: number;
    transactionTypeId: string;
}

const list = async () => {
    return await axios.get(
        `${config.urls.sp2Server}/Master/ListRatePlatform`
    );
};

const RatePlatform = {
    list: list,
    store: async (formData: IForm) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        let url: any = `${config.urls.sp2Server}/Master/SaveRatePlatform`;
        return await axios.post(url, data, {
            headers: headers
        });
    },
    update: async (formData: IForm, id) => {
        let headers: any = config.headerBase();
        let data: any = formData;
        data.id = id;
        return await axios.put(
            `${config.urls.sp2Server}/​Master​/SaveRatePlatform`,
            data,
            {
                headers: headers
            }
        );
    },
    showByAlias: async alias => {
        let dt: any = {};
        let row: any = {};
        try {
          dt = await list();
          dt = dt.data;
          row = dt.find(x => x.transactionAlias === alias);
          if (!row) {
              row = {};
          }
        } catch (e) {}

        return row;
    },
    show: async id => {
        let resp: any = {};
        let row: any = {};
        let dt: any = {};
        try {
            dt = await list();
            dt = dt.data;
            row = dt.find(v => v.id === id);
            if (row) {
                resp = row;
            }
        } catch (e) {}

        return resp;
    }
};

export default RatePlatform;
