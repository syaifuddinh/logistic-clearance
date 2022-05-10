import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Row, Col, Alert } from "react-bootstrap";
import Dropfile from "../../../../components/Dropfile/Dropfile";
import ShippingLineOrder from "../../../../../endpoints/ShippingLineOrder";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";
import { translations } from "../../../../../locales/i18n";
import { useTranslation } from "react-i18next";
import GologsAlert from "../../../../components/Alert/GologsAlert";
import { GologsButton } from "../../../../components/Button/Loadable";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";

interface Props {
    blNumber: string;
    invoiceFile?: any;
    invoiceName?: any;
    doFile?: any;
    doName?: any;
    setInvoiceFile?: any;
    setInvoiceName?: any;
    setDoFile?: any;
    setDoName?: any;
    jobNumber: string;
    deliveryOrderId: string;
    onSubmit: any;
    hasUploaded: any;
}

export default function Invoice(props : Props) {
    const [doFileShowLoading, setDoFileShowLoading] = useState(false);
    const [invoiceFileShowLoading, setInvoiceFileShowLoading] = useState(false);
    const [doError, setDoError] = useState(false);
    const [doErrorMessage, setDoErrorMessage] = useState("");
    const [submitErrorMessage, setSubmitErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const { t } = useTranslation();

    const invoiceHandleDelete = () => {
        setInvoiceFileName(null);
        if (props.setInvoiceFile) {
            props.setInvoiceFile(null);
        }
    };

    const setDoFileName = (name) => {
        if (props.setDoName) {
            props.setDoName(name)
        }
    }

    const showSuccessMessage = () => {
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
        }, 5000);
    }

    const showErrorMessage = (msg = "") => {
        if (!msg) {
            msg = t(translations.responseMessage.errorDefault);
        }
        setSubmitErrorMessage(msg);
        setDisabled(false);
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 5000);
    }


    const setInvoiceFileName = (name) => {
        if (props.setInvoiceName) {
            props.setInvoiceName(name)
        }
    }

    const doHandleDelete = () => {
        setDoFileName(null);
        if (props.setDoFile) {
            props.setDoFile(null);
        }
    };

    const invoiceHandleDrop = acceptedFiles => {
        acceptedFiles.map(file => {
            setInvoiceFileName(file.name);
            if (props.setInvoiceFile) {
                props.setInvoiceFile(file)
            }
        });
    };

    const readBl = (file, fn = () => {}) => {
        let fd = new FormData();
        fd.append("file", file);
        ShippingLineOrder.readBl(fd)
            .then(resp => {
                if (resp.data.blNumber == props.blNumber) {
                    if (props.setDoFile){
                        props.setDoFile(file)
                    }
                    setDoFileShowLoading(false);
                } else {
                    abortDoUpload(t(translations.responseMessage.invalidBl));
                }
            })
            .catch(() => {
                abortDoUpload(t(translations.responseMessage.errorDefault));
            });
    };
  
    const doHandleDrop = acceptedFiles => {
        acceptedFiles.map(file => {
            setDoFileName(file.name);
            setDoFileShowLoading(true);
            readBl(file);
        });
    };

    const uploadDo = async (fn = () => {}) => {
        let fd = new FormData();
        fd.append("JobNumber", props.jobNumber);
        fd.append("DeliverOrderId", props.deliveryOrderId);
        fd.append("Type", "DO");
        fd.append("FileName", props.doName);
        fd.append("File", props.doFile);
        await DeliveryOrder.uploadDocument(fd)
            .then(async () => {
                await fn();
            })
            .catch(() => {
                showErrorMessage();
            });
    }

    const uploadInvoice = async (fn = () => {}) => {
        let fd = new FormData();
        fd.append("JobNumber", props.jobNumber);
        fd.append("DeliverOrderId", props.deliveryOrderId);
        fd.append("Type", "Invoice");
        fd.append("FileName", props.invoiceName);
        fd.append("File", props.invoiceFile);
        await DeliveryOrder.uploadDocument(fd)
            .then(async () => {
                await fn();
            })
            .catch(() => {
                showErrorMessage();
            });
    }

    const submit = async () => {
        if (!props.doFile || !props.invoiceFile) {
            showErrorMessage(t(translations.responseMessage.incompleteDocument));
            return;
        }
        
        if (!props.hasUploaded.do) {
            await uploadDo();
        }
        if (!props.hasUploaded.invoice) {
            await uploadInvoice();
        }
        await props.onSubmit();
    }
    
  const abortDoUpload = (message) => {
      setDoFileName(null);
      setDoFileShowLoading(false);
      setDoError(true);
      setDoErrorMessage(message);
      setTimeout(() => {
        setDoError(false);
        setDoErrorMessage("");
      }, 5000);
  }

    return (
        <>
            <div>
                <div className="bg-white p-3">
                    <Row>
                        <Col xs="12" lg="6">
                            <small className="mb-2 d-inline-block">
                                {t(translations.entities.general.upload)}{" "}
                                {t(translations.entities.general.doDocument)}
                            </small>
                            <Dropfile
                                onDrop={doHandleDrop}
                                onDelete={doHandleDelete}
                                fileName={props.doName}
                                file={props.doFile}
                                showLoading={doFileShowLoading}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="6">
                            {doError && (
                                <Alert variant="danger" className="mt-2">
                                    {doErrorMessage}
                                </Alert>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12" lg="6" className="mt-3">
                            <small className="mb-2 d-inline-block">
                                {t(translations.entities.general.upload)}{" "}
                                {t(translations.entities.general.invoice)}
                            </small>
                            <Dropfile
                                onDrop={invoiceHandleDrop}
                                onDelete={invoiceHandleDelete}
                                fileName={props.invoiceName}
                                file={props.invoiceFile}
                                showLoading={invoiceFileShowLoading}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="my-4 pb-5">
                    <GologsButton
                        content={<GeneralTranslation slug="upload" />}
                        variant="secondary"
                        onClick={submit}
                        className="float-right"
                    />{" "}
                </div>

                {isSuccess && (
                    <GologsAlert
                        content={t(
                            translations.responseMessage.uploadedDocument
                        )}
                    />
                )}
                {isError && (
                    <GologsAlert
                        content={submitErrorMessage}
                        variant="danger"
                    />
                )}
            </div>
        </>
    );
}
