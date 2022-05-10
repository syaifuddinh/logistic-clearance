import axios from "axios";
import config from "../config";
import InTransit from "./Master/InTransit";

const ShippingLine = {
    getAll: async () => {
        let dt: any = {};
        let headers: any = config.headerBase();
        try {
            dt = await axios.get(
                `${config.urls.defaultGologServer}/shippingline/list`,
                {
                    headers: headers
                }
            );
        }  catch(e) {
            InTransit.store({
                service: "Master Shipping Line",
                errorMessage: e.message
            });
        }

        return dt;
    }
};

export default ShippingLine;
