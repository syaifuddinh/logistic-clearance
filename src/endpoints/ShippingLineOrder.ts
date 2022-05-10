import axios from "axios";
import config from "../config";

const ShippingLineOrder = {
    uploadDocument: async formData => {
        return await axios.post(
            `${config.urls.shippingLineServer}/V1/UploadFile`,
            formData
        );
    },
    readAmount: async formData => {
        return await axios.post(
            `${config.urls.shippingLineServer}/V1/ReadAmount`,
            formData
        );
    },
    readBl: async formData => {
        return await axios.post(
            `${config.urls.shippingLineServer}/V1/ReadBL`,
            formData
        );
    }
};

export default ShippingLineOrder;
