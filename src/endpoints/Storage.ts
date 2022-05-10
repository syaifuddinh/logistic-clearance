import axios from "axios";
import config from "../config";


const uploadFile = async (file) => {
    try {
        let fd = new FormData();
        fd.append("file", file);
        let dt: any = await axios.post(
            `${config.urls.shippingLineServer}/V1/UploadFile`,
            fd
        );
        return dt.data;
    } catch (e) {
        throw Error(e);
    }
};

const downloadFile = async (fileName) => {
    try {
        let fd: any = {};
        let params: any = {};
        fd.fileName = fileName
        params.params = fd;
        let dt: any = await axios.get(
            `${config.urls.shippingLineServer}/V1/DownloadFile`,
            params
        );
        return dt.data;
    } catch (e) {
        throw Error(e);
    }
};

const streamFileByUrl = async (url) => {
    let resp: any = {};
    try {
        let dt: any = await axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        resp = dt.data;
        window.console.log(resp);
    } catch (e) {
        throw Error(e);
    }
};

const storeServiceData = (blNumber, blDate, notifyEmail) => {
    let resp: any = {};
    resp.blNumber = blNumber;
    resp.blDate = blDate;
    resp.notifyEmail = notifyEmail;

    resp = JSON.stringify(resp);
    window.localStorage.setItem("serviceData", resp);
}

const getServiceData = () => {
  let resp: any = {};
  let data: any = {};
  resp.blNumber = "";
  resp.blDate = "";
  resp.notifyEmail = "";
  data = localStorage.getItem("serviceData");
  if(data) {
    data = JSON.parse(data);
    resp.blNumber = data.blNumber ? data.blNumber : "";
    resp.blDate = data.blDate ? data.blDate : "";
    resp.notifyEmail = data.notifyEmail ? data.notifyEmail : "";
  }
  window.localStorage.removeItem("serviceData");
  
  return resp;
}

const removeServiceData = () => {
    window.localStorage.removeItem("serviceData");
}

const Storage = {
    uploadFile: uploadFile,
    streamFileByUrl: streamFileByUrl,
    downloadFile: downloadFile,
    storeServiceData: storeServiceData,
    getServiceData: getServiceData,
    removeServiceData: removeServiceData
};

export default Storage;
