import axios from "axios";
import config from "../../config";

const Forwarder = {
    list: async (formData = {}) => {
      let headers: any = config.headerBase();
      let dt: any = {};
      dt.data = {};
      try {
          dt = await axios.get(`${config.urls.defaultGologServer}/Master/ListForwarder`, {
              params: formData,
              headers: headers
          });
          dt = dt.data.data;
      } catch (e) {}

      return dt;
    }    
};

export default Forwarder;
