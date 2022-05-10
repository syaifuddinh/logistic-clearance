import axios from "axios";
import config from "../config";

const Menu = {
  getAll: async role => {
    return await axios.get(`${config.urls.alternateServer}/menu/list/${role}`);
  }
};

export default Menu;
