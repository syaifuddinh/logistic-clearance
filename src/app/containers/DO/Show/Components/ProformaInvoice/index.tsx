import React, { useState, useEffect } from "react";
import { ProformaInvoice as ProformaInvoiceTemplate } from "../../../../../components/ProformaInvoice/Loadable";
import moment from "moment";
import User from "../../../../../../model/User";
import Email from "../../../../../../endpoints/Email";
import DeliveryOrderModel from "../../../../../../model/DeliveryOrder";
import DeliveryOrder from "../../../../../../endpoints/DeliveryOrder";
import TransactionDelegate from "../../../../../../endpoints/TransactionDelegate";
import InTransit from "../../../../../../endpoints/Master/InTransit";
import { PopupMessage } from "../../../../../components/PopupMessage/Loadable";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsAlert from "../../../../../components/Alert/GologsAlert";

type IProps = {
    id: any;
    onPaymentSubmited: any;
    isShowProceedPaymentButton: boolean;
};

type IAttachment = {
    documentName: string;
    fileName: string;
};

export default function ProformaInvoice(props: IProps) {
    const [data, setData] = useState({
        jobNumber: "",
        notifyPeople: "",
        jobCreatedDate: "",
        deliveryOrderStatus: "",
        shippingLineEmail: "",
        statusPosition: 0,
        isDelegate: false,
        blNumber: ""
    });
    const [dueDate, setDueDate] = useState(
        moment(new Date()).add(1, "days").format("YYYY-MM-DD HH:mm:ss")
    );
    const [grandtotal, setGrandtotal] = useState(5610000);
    const [details, setDetails] = useState([]);
    const [files, setFiles] = useState({
        proofOfPayment: {
            file: null,
            fileName: ""
        }
    });
    const [isShowPopupMessage, setIsShowPopupMessage] = useState(false);
    const [isShowDangerMessage, setIsShowDangerMessage] = useState(false);
    const [dangerMessage, setDangerMessage] = useState(<></>);
    
    const getData = () => {
        DeliveryOrder.show(props.id)
            .then(resp => {
                let response: any = resp.data.deliveryOrder;
                let unit: any = {};
                unit.jobNumber = response.jobNumber;
                if(response.deliveryOrderNotifies.length > 0) {
                    unit.notifyPeople = response.deliveryOrderNotifies[0].email;
                }
                unit.statusPosition = response.positionStatus;
                unit.deliveryOrderStatus = response.deliveryOrderStatus;
                unit.shippingLineEmail = response.shippingLineEmail;
                unit.isDelegate = response.isDelegate;
                unit.jobCreatedDate = response.createdDate;
                unit.blNumber = response.billOfLadingNumber;
                setData(unit);
            })
            .catch(error => {
                window.console.log(error);
            });
    }
    
    const onProofOfPaymentDrop = (file, fileName) => {
        let inputFiles: any = {};
        inputFiles.proofOfPayment = {};
        inputFiles.proofOfPayment.file = file;
        inputFiles.proofOfPayment.fileName = fileName;
        setFiles(inputFiles);
    };

    const updateToDelegatePayment = async () => {
        const isDelegate = data.isDelegate;
        let id: any = props.id;
        if (isDelegate === true) {
            try {
                await TransactionDelegate.updateStatus(
                    id,
                    5,
                    DeliveryOrderModel.getDelegateStatusByIndex(5)
                );
            } catch (e) {}
        }
    };

    const proceedPayment = async () => {
        let jobNumber: any = data.jobNumber;
        try {
            let blCode: any = data.blNumber;
            let emails: any = [];
            let userEmail: any = User.getPersonEmail();
            if(userEmail) {
                emails.push(userEmail);
            }

            if (data.notifyPeople) {
                emails.push(data.notifyPeople);
            }

            if (data.shippingLineEmail) {
                emails.push(data.shippingLineEmail);
            }
            
            if (files.proofOfPayment.file) {
                try {
                    let formData: any = new FormData();
                    formData.append("JobNumber", data.jobNumber);
                    formData.append("DeliverOrderId", props.id);
                    formData.append("Type", "ProofOfPayment");
                    formData.append("FileName", files.proofOfPayment.fileName);
                    formData.append("File", files.proofOfPayment.file);
                    await DeliveryOrder.uploadDocument(formData);
                } catch (e) {
                    InTransit.store({
                        service: "DO",
                        errorMessage:
                            "System was failed to upload proof of payment - " +
                            e.message,
                        status: data.deliveryOrderStatus,
                        jobNumber: jobNumber,
                        jobCreatedDate: new Date(data.jobCreatedDate)
                    });
                    throw new Error("");
                }
            }

            if (data.statusPosition < 4) {
                await DeliveryOrder.updateStatus(
                    4,
                    "PAYMENT_CONFIRMATION",
                    data.jobNumber
                );
            }
            await updateToDelegatePayment();
            await sendPaymentNotification();
            setIsShowPopupMessage(true);
            props.onPaymentSubmited();
        } catch (e) {
            showDangerMessage("responseMessage.errorDefault");
        }
    };

    const sendPaymentNotification = async () => {
        let jobNumber: any = data.jobNumber;
        let blCode: any = data.blNumber;
        let emails: any = [];
        let userEmail: any = User.getPersonEmail();
        let method: string = "";
        if(userEmail) {
            emails.push(userEmail);
        }
        if (data.notifyPeople) {
            emails.push(data.notifyPeople);
        }
        if (data.shippingLineEmail) {
            emails.push(data.shippingLineEmail);
        }
        if(data.isDelegate == true) {
            method = "afterPaymentDelegate";
        } else {
            method = "afterPayment";
        }

        try {
            await Email[method](jobNumber, emails, blCode);
        } catch (e) {
            let jobCreatedDate: any = "";
            let serverMessage: string = e.message;
            let message: string =
                "System can't send email notification after User confirm their Payment";
            message += " - " + serverMessage;
            jobCreatedDate = new Date(data.jobCreatedDate);
            InTransit.store({
                service: "DO",
                status: "Payment Confirmation",
                jobNumber: jobNumber,
                jobCreatedDate: jobCreatedDate,
                errorMessage: message
            });
        }
    };

    const showDangerMessage = translation => {
        setIsShowDangerMessage(true);
        setDangerMessage(<GeneralTranslation slug={translation} />);
        setTimeout(() => {
            setIsShowDangerMessage(false);
            setDangerMessage(<GeneralTranslation slug="" />);
        }, 4000);
    };

    const downloadProformaInvoice = async () => {
        try {
            let result: any = await DeliveryOrder.show(props.id);
            let data: any = result.data.deliveryOrder;
            let files: IAttachment[] = data.deliveryOrderAttachments;
            let a = document.createElement("a");
            let proforma = files.find(
                v => v.documentName === "ProformaInvoice"
            );
            if (proforma) {
                a.href = proforma.fileName;
                a.target = "_blank";
                a.click();
            } else {
                showDangerMessage(
                    "responseMessage.proformaInvoiceNotUploadedByShippingLine"
                );
            }
        } catch (e) {
            showDangerMessage("responseMessage.errorDefault");
        }
    };
    
    useEffect(() => {
        let bills: any = [];
        bills.push({
            name: "DO Service",
            amount: 1200000
        });
        bills.push({
            name: "Administration Fee",
            amount: 25000
        });
        bills.push({
            name: "PPN Administration Fee",
            amount: 2500
        });
        setDetails(bills);
        getData();
    }, []);
    
    return (
        <>
            <ProformaInvoiceTemplate
                titleSlug="proformaInvoice"
                dueDate={dueDate}
                grandtotal={grandtotal}
                details={details}
                onProceedPayment={proceedPayment}
                onDownloadProformaInvoice={downloadProformaInvoice}
                onProofOfPaymentDrop={onProofOfPaymentDrop}
                isShowProceedPaymentButton={props.isShowProceedPaymentButton}
            />

            <PopupMessage
                show={isShowPopupMessage}
                onClose={() => {
                    setIsShowPopupMessage(false);
                }}
                messageSlug="responseMessage.paymentSubmited"
            />

            {isShowDangerMessage && (
                <GologsAlert variant="danger" content={dangerMessage} />
            )}
        </>
    );

}