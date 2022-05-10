import axios from "axios";
import config from "../../config";

const list = async (formData = {}) => {
    let headers: any = config.headerBase();
    let dt: any = {};
    dt.data = {};
    try {
        dt = await axios.get(
            `${config.urls.defaultGologServer}/Master/ListCargoOwner`,
            {
                params: formData,
                headers: headers
            }
        );
        dt = dt.data.data;
    } catch (e) {}

    return dt;
};

const CargoOwner = {
    list: list,    
    showByName: async (name: string) => {
        let response: any = {}
        let data: any = {}
        try {
            data = await list();
            data = data.find((param: any) => param.companyName === name);
            if(data) response = data;
        } catch (e) {}

        return response;
    }    
};

export default CargoOwner;
