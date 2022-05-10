import axios from "axios";
import config from "../../config";

const ContainerSize = {
    list: async (formData = {}) => {
        let resp: any = {};
        resp.data = [];
        resp.data.push({id: "1", name: "20"});
        resp.data.push({id: "2", name: "40"});

        return resp;
    }
};

export default ContainerSize;
