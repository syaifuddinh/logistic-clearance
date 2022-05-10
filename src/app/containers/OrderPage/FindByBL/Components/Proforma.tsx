import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Dropfile from "../../../../components/Dropfile/Dropfile";
import { GologsButton } from "../../../../components/Button/Loadable";
import { GeneralTranslation } from "../../../../components/Translation/Loadable";
import GologsAlert from "../../../../components/Alert/GologsAlert";
import ShippingLineOrder from "../../../../../endpoints/ShippingLineOrder";
import DeliveryOrder from "../../../../../endpoints/DeliveryOrder";
import { translations } from "../../../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";

interface Props {
    blNumber: string;
    proformaAmount?: number;
    proformaFile?: any;
    proformaName: string;
    setProformaAmount?: any;
    setProformaFile?: any;
    setProformaName?: any;
    onSubmit: any;
    jobNumber: string;
    deliveryOrderId: string;
};

export default function Proforma(props : Props) {
    const { t } = useTranslation();
    const [fileName, setFileName] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitErrorMessage, setSubmitErrorMessage] = useState("");
    const [amount, setAmount] = useState("0");
    const [formData, setFormData] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
  
    const handleDelete = () => {
        setFileName("");
        if (props.setProformaName) {
            props.setProformaName("");
        }
        if (props.setProformaFile) {
            props.setProformaFile(null);
        }
        if (props.setProformaAmount) {
            props.setProformaAmount(0);
        }
    };

    const showError = (message) => {
        if (props.setProformaName) {
            props.setProformaName("");
        }
        setError(true)
        setErrorMessage(message)
        setTimeout(() => {
            setError(false)
            setErrorMessage("")
            
        }, 5000)
    }

    const uploadFile = async () => {
        if (!props.proformaFile) {
            showErrorMessage(t(translations.responseMessage.incompleteDocument));
            return;
        }

        const fd = new FormData();
        fd.append("JobNumber", props.jobNumber);
        fd.append("DeliverOrderId", props.deliveryOrderId);
        fd.append("Type", 'ProformaInvoice');
        fd.append("FileName", props.proformaName);
        fd.append("File", props.proformaFile);
        setDisabled(true)
        await DeliveryOrder.uploadDocument(fd)
        .then(async () => {
            await props.onSubmit();
            setDisabled(false);
            setShowLoading(false);
            showSuccessMessage();
        })
        .catch(error => {
            setDisabled(false)
            setShowLoading(false);
            showErrorMessage();
        });
    };

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
        setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 5000);
    }

    const readBl = (file, fn = () => {}) => {
        let fd = new FormData();
        fd.append("file", file);
        setShowLoading(true);
        readAmount(fd)
    };


    const readAmount = (fd) => {
        ShippingLineOrder.readAmount(fd)
            .then(resp => {
                let data = resp.data;
                if (data.amount !== "") {
                    setAmount(data.amount);
                    if (props.setProformaAmount) {
                        props.setProformaAmount(data.amount);
                    }
                    
                    if (props.setProformaFile) {
                        const file = fd.get("file")
                        props.setProformaFile(file);
                        
                        if (props.setProformaName) {
                            props.setProformaName(file.name);
                        }
                    }

                } else {
                    showError("Nominal tidak terdeteksi, silahkan pakai file lainnya");
                    setAmount("0");
                }

                setShowLoading(false);
                setFormData(fd)
            })
            .catch(error => {
                showError("Terjadi kesalahan pada server");
                setShowLoading(false);
                window.console.log(error);
            });
    }

    const handleDrop = async acceptedFiles => {
        acceptedFiles.map(file => {
            setShowLoading(true);
            readBl(file);
        });
    };

    return (
        <>
            <div>
                <div className="bg-white p-3">
                    <p>{t(translations.wizard.top.proformaInvoice)}</p>
                    <Row>
                        <Col md="6">
                            <Dropfile
                                onDrop={handleDrop}
                                onDelete={handleDelete}
                                showLoading={showLoading}
                                fileName={props.proformaName}
                                file={props.proformaFile}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            {error && (
                                <Alert variant="danger" className="mt-2">
                                    {errorMessage}
                                </Alert>
                            )}
                        </Col>
                    </Row>
                    <p className="mt-2">
                        {t(translations.entities.general.amount)} <br /> Rp{" "}
                        {props.proformaAmount ? props.proformaAmount : 0}
                    </p>
                </div>

                <div className="my-4 pb-5">
                    <GologsButton
                        content={<GeneralTranslation slug="submit" />}
                        variant="secondary"
                        onClick={uploadFile}
                        className="float-right"
                    />
                </div>
                {isSuccess && (
                    <GologsAlert content="Document successfully uploaded" />
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
