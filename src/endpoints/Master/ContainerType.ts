import axios from "axios";
import config from "../../config";

const ContainerType = {
    list: async (formData = {}) => {
        let resp: any = [];
        resp.data = []
        resp.data.push({id: "1", name: "Dry Storage"});
        resp.data.push({id: "2", name: "Refrigated"});
        resp.data.push({id: "3", name: "Open Top"});
        resp.data.push({id: "4", name: "Flat Rack"});
        resp.data.push({id: "5", name: "Tank"});

        return resp;
    }
};

export default ContainerType;
