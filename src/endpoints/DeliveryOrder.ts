import axios from "axios";
import config from "../config";
import InTransit from "./Master/InTransit";

const show = async id => {
    let headers: any = config.headerBase();
    return await axios.get(
        `${config.urls.defaultGologServer}/do/Detail/?Id=` + id,
        {
            headers: headers
        }
    );
}

const cancelTransaction = async (id, reason) => {
    let headers: any = config.headerBase();
    let dt: any = {};
    let params: any = {};
    dt.data = {};
    params.id = id;
    params.reason = reason;
    try {
        dt = await axios.post(
            `${config.urls.defaultGologServer}/do/CancelTransaction`,
            params,
            {
                headers: headers
            }
        );
    } catch (e) {
      let data: any = {};
      try {
          data = await show(id);
          data = data.data;
          window.console.log(data);
          InTransit.store({
              service: "DO",
              errorMessage: "System was failed to cancel draft transaction - Internal server error",
              status: "Draft",
              jobCreatedDate: new Date(data.deliveryOrder.createdDate)
          });

        } catch(e) {

        }
        throw new Error("");
    }

    return dt;
};


const downloadInvoice = async (id: string) => {
    let headers: any = config.headerBase();
    let dt: any = {};
    let url: string = "";
    try {
        url = `${config.urls.defaultGologServer}/do/DownloadInvoice/` + id;
        window.open(url, "_blank");
    } catch (e) {
      let data: any = {};
      const errorMessage = e.message;
      try {
          data = await show(id);
          data = data.data;
          let status: any = data.positionStatus;
          let statusName: string = "";
          switch(status) {
              case 1 : 
                statusName = "Request Form";
                break;
              case 2 : 
                statusName = "Confirmation";
                break;
              case 3 : 
                statusName = "Proforma Invoice";
                break;
              case 4 : 
                statusName = "Payment & Confirmation";
                break;
              case 5 : 
                statusName = "Document Release";
                break;
          }
          InTransit.store({
              service: "DO",
              errorMessage:
                  "System was failed to download invoice GOLOGS. " +
                  errorMessage,
              status: statusName,
              jobCreatedDate: new Date(data.deliveryOrder.createdDate)
          });

        } catch(e) {

        }
        throw new Error("");
    }

    return dt;
};

const DeliveryOrder = {
    list: async (formData: any) => {
        let headers: any = config.headerBase();
        let dt: any = {};
        let rows: any = [];
        dt.data = {};
        try {
            dt = await axios.get(`${config.urls.defaultGologServer}/do/List`, {
                params: formData,
                headers: headers
            });
        } catch (e) {}

        return dt;
    },
    show: show,
    uploadDocument: async formData => {
        let headers: any = config.headerBase();
        return await axios.put(
            `${config.urls.defaultGologServer}/do/uploaddocument`,
            formData,
            {
                headers: headers
            }
        );
    },
    validateDocument: async (blNumber, file) => {
        let headers: any = config.headerBase();
        let fd: any = new FormData();
        fd.append("BillOfLadingNumber", blNumber);
        fd.append("File", file);
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.put(
                `${config.urls.defaultGologServer}/do/validatedocument`,
                fd,
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    updateStatus: async (statusPosition, statusName, jobNumber) => {
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.post(
                `${config.urls.defaultGologServer}/do/UpdateStatus`,
                {
                    jobNumber: jobNumber,
                    statusDO: statusName,
                    positionDO: statusPosition
                },
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    monitorStatus: async (period, createdBy = "") => {
        let headers: any = config.headerBase();
        try {
            if (
                period === "Today" ||
                period === "Weekly" ||
                period === "Monthly" ||
                period === "Yearly"
            ) {
                let dt: any = await axios.get(
                    `${config.urls.defaultGologServer}/Dashboard/MonitorStatus`,
                    {
                        params: {
                            period: period,
                            CreatedBy: createdBy
                        },
                        headers: headers
                    }
                );
                return dt.data;
            } else {
                throw Error("Period not found");
            }
        } catch (e) {
            throw Error(e);
        }
    },
    monitorService: async (period, createdBy) => {
        let headers: any = config.headerBase();
        try {
            if (
                period === "Today" ||
                period === "Weekly" ||
                period === "Monthly" ||
                period === "ThisYear"
            ) {
                let dt: any = await axios.get(
                    `${config.urls.defaultGologServer}/Dashboard/MonitorService`,
                    {
                        params: {
                            period: period,
                            CreatedBy: createdBy
                        },
                        headers: headers
                    }
                );
                return dt.data;
            } else {
                throw Error("Period not found");
            }
        } catch (e) {
            throw Error(e);
        }
    },
    monitorUpload: async () => {
        try {
            let headers: any = config.headerBase();
            let dt: any = await axios.get(
                `${config.urls.defaultGologServer}/Dashboard/MonitorUpload`,
                {
                    headers: headers
                }
            );
            return dt.data;
        } catch (e) {
            throw Error(e);
        }
    },
    getBL: async (blNumber, blDate, noPos) => {
        let headers: any = config.headerBase();
        let request: any = {};
        let dt: any = {};
        let resp: any = {};

        request.noPos = noPos;
        try {
            dt = await axios.get(
                `${config.urls.defaultGologServer}/do/bl/${blNumber}/${blDate}`,
                {
                    headers: headers,
                    params: request
                }
            );
            resp = dt.data;
        } catch (e) {
            let message: string = "System can't get BL Data that contain containers. ";
            message += e.message;
            
            InTransit.store({
                service: "DO",
                errorMessage: message
            }, {
                "BL Number": blNumber,
                "BL Date": blDate,
                "No Pos": noPos
            });
        }

        return resp;
    },
    submit: async data => {
        let headers: any = {
            "Content-Type": "application/json"
        };

        headers = Object.assign(headers, config.headerBase());

        return await axios.post(
            `${config.urls.defaultGologServer}/do/submit`,
            data,
            {
                headers: headers
            }
        );
    },
    cancelTransaction: cancelTransaction,
    downloadInvoice: downloadInvoice
};
                                    
export default DeliveryOrder;
