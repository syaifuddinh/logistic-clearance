import axios from "axios";
import config from "../config";

const Transaction = {
    list: async (formData: any) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        dt.data = {};
        try {
            dt = await axios.get(`${config.urls.sp2Server}/Master/ListDoSp2`, {
                params: formData,
                headers: headers
            });
        } catch (e) {}

        return dt;
    }
};

export default Transaction;
