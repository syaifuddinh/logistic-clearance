/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Image } from "../../../styles/Sidebar";
import { GologsButton } from "../../components/Button/Loadable";
import { Alert, Button } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";
import Tax from "./Components/Tax";
import Company from "./Components/Company";
import User from "./Components/User";
import MAuth from "../../../endpoints/Auth";
import { RegExpKey } from "../../../lib/Constants";

export default function RegistrationPage(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [npwp, setNpwp] = useState("");
    const [nib, setNib] = useState("");
    const [cn, setCn] = useState("");
    const [ca, setCa] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [name, setName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [flagMessage, setFlagMessage] = useState("");
    const [redirectToSuccessPage, setRedirectToSuccessPage] = useState(false);
    const [isRedirectHome, setIsRedirectHome] = useState(false);

    let history = useHistory();

    const sections = [
        { title: "Tax Information", onClick: () => setCurrentPage(1) },
        { title: "Company Information", onClick: () => setCurrentPage(2) },
        { title: "User Information", onClick: () => setCurrentPage(3) }
    ];

    const lastPage = sections.length;

    const handleClose = () => {
        setFlagMessage("");
        setShowMessage(false);
    };

    const handleShow = () => {
        setShowMessage(true);
    };

    const handleSetMessage = (msg: string) => {
        setMessage(msg);
        backOnTop();
        setTimeout(handleClose, 30000);
    }

    const backOnTop = () => {
        window.document.documentElement.scrollTop = 0;
    } 

    const next = async () => {
        if (currentPage === 1) {
            if (npwp === "" && !props.location.state) {
                handleSetMessage(
                    "Please Input Your TAX ID (NPWP) Number to proceed the process."
                );
                setFlagMessage("danger");
                handleShow();
            } else {
                await MAuth.getProfile(npwp)
                    .then(data => {
                        if (data.data.is_exist === false) {
                            var x = data.data;
                            setNib(x.nib);
                            setCn(x.company_name);
                            setCa(x.address);
                            setCity(x.city);
                            setState(x.province);
                            setPostalCode(x.postal_code);
                            setName(x.name_person);
                            setEmail(x.email);
                            setPhoneNumber(x.phone);
                            setCurrentPage(prev => prev + 1);
                        } else if (data.data.accessToken) {
                            localStorage.setItem("authUser", JSON.stringify(data.data));
                            document.cookie = "cookie=ok";
                            setIsRedirectHome(true);
                        }
                    })
                    .catch(error => {
                        let errorMessage: any = error.response.data;
                        if (error.response && error.response.status === 404) {
                            handleSetMessage(
                                "NPWP tidak ditemukan, silahkan registrasi melalui OSS"
                                );
                                setFlagMessage("danger");
                                handleShow();
                        } else {
                            if (errorMessage.search("ErrorFromServer:") > -1) {
                                errorMessage = errorMessage.replace(
                                    "ErrorFromServer:", ""
                                );
                            }
                            handleSetMessage(errorMessage);
                            setFlagMessage("danger");
                            handleShow();
                        }
                    });
            }
        } else {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prev = () => setCurrentPage(prev => prev - 1);

    const onTaxChange = e => {
        setNpwp(e.target.value);
    };

    const onNibChange = e => {
        setNib(e.target.value);
    };

    const onChangeCn = e => {
        setCn(e.target.value);
    };

    const onChangeCa = e => {
        setCa(e.target.value);
    };

    const onChangeCity = e => {
        setCity(e.target.value);
    };

    const onChangeState = e => {
        setState(e.target.value);
    };

    const onChangeCountry = e => {
        setCountry(e.target.value);
    };

    const onChangePostalCode = e => {
        setPostalCode(e.target.value);
    };

    const onChangeCompanyType = e => {
        setCompanyType(e.target.value);
    };

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeJobTitle = e => {
        setJobTitle(e.target.value);
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePhoneNumber = e => {
        setPhoneNumber(e.target.value);
    };

    const onSubmit = async () => {
        let data:any = {
            "company_Information": {
                "company_name": cn,
                "company_type": companyType,
                "district": state,
                "city": city,
                "postal_code": postalCode,
                "nib": nib,
                "sub_district": "",
                "address": ca,
                "phone": phoneNumber,
                "name_person": name,
                "province": state,
                "email": email,
                "npwp": npwp
            },
            "person_Information": {
                "fullName": name,
                "email": email,
                "phone": phoneNumber
            }
        };

        if (data.npwp !== "" && data.email !== "") {
            var pattern = new RegExp(RegExpKey);
            if (!pattern.test(email)) {
                handleSetMessage("Email format not valid");
                setFlagMessage("danger");
                handleShow();
            } else {
                await MAuth.registration(data)
                    .then(data => {
                        setNib("");
                        setCn("");
                        setCa("");
                        setCity("");
                        setCountry("");
                        setState("");
                        setPostalCode("");
                        setName("");
                        setEmail("");
                        setPhoneNumber("");
                        handleSetMessage("register user successfully");
                        setFlagMessage("success");
                        handleShow();
                        setRedirectToSuccessPage(true);
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 400) {
                            let message: any = "";
                            message = error.response.data.replace("ErrorFromServer: ", "");
                            handleSetMessage(message);
                            setFlagMessage("danger");
                            handleShow();
                        } else {
                            handleSetMessage("Internal Server Error");
                            setFlagMessage("danger");
                            handleShow();
                        }
                    });
            }
        } else {
            handleSetMessage("all fields are required");
            setFlagMessage("danger");
            handleShow();
        }
    };

    return (
        <>
            <div className="container-fluid position-absolute h-100">
                <div className="row h-100">
                    <div className="col-lg-6 d-none d-md-block mt-10 px-0 position-relative overflow-hidden">
                        <Image
                            style={{
                                width: "auto",
                                height: "130%",
                                zIndex: -1
                            }}
                            className="position-relative"
                            src={require("../../../assets/images/box-abstract.svg")}
                        />
                        <div className="bg-gradient-primary position-absolute w-100 h-100 top-0 start-0 opacity-4"></div>
                        <div className="position-absolute w-100 h-100 top-0 start-0">
                            <div className="p-5">
                                <div className="d-flex flex-column text-white">
                                    <h4 className="font-weight-bold mt-5">
                                        <Image
                                            style={{
                                                width: "70mm",
                                                height: "auto"
                                            }}
                                            src={require("../../../assets/images/white-logo.svg")}
                                        />
                                    </h4>
                                    <div className="pt-5 mt-5">
                                        <h1
                                            className="font-weight-very-bolder text-white"
                                            style={{ fontSize: "18mm" }}
                                        >
                                            Create Account
                                        </h1>
                                        <h4 className="text-white">
                                            Unlock access to hundreds of
                                            logistic <br /> feature —including
                                            Delivery Order Online, <br /> Surat
                                            Penyerahan Dokumen (SP2), <br />{" "}
                                            Transport Management System and many
                                            more..
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 ">
                        <div className="m-5">
                            {showMessage ? (
                                <Alert
                                    variant={flagMessage}
                                    onClose={handleClose}
                                    dismissible
                                >
                                    <Alert.Heading></Alert.Heading>
                                    <p>{message}</p>
                                </Alert>
                            ) : null}
                            <h1 className="font-weight-bolder text-primary mt-5">
                                SIGN UP
                            </h1>
                            <div className="mt-5">
                                <Stepper
                                    steps={sections}
                                    activeStep={currentPage}
                                    activeColor="#b9a9fe"
                                    defaultBarColor="#7456fd"
                                    completeColor="#7456fd"
                                    completeBarColor="#7456fd"
                                />
                            </div>
                            <form className="mt-5">
                                {currentPage === 1 && (
                                    <Tax
                                        onChange={onTaxChange}
                                        value={
                                            props.location.state &&
                                            props.location.state.message
                                                ? props.location.state.message
                                                : npwp
                                        }
                                    />
                                )}
                                {currentPage === 2 && (
                                    <Company
                                        valueNib={nib}
                                        valueCn={cn}
                                        valueCa={ca}
                                        valueCity={city}
                                        valueState={state}
                                        valueCountry={country}
                                        valuePostalCode={postalCode}
                                        valueCompanyType={companyType}
                                        onChangeNib={onNibChange}
                                        onChangeCn={onChangeCn}
                                        onChangeCa={onChangeCa}
                                        onChangeCity={onChangeCity}
                                        onChangeState={onChangeState}
                                        onChangeCountry={onChangeCountry}
                                        onChangePostalCode={onChangePostalCode}
                                        onChangeCompanyType={
                                            onChangeCompanyType
                                        }
                                    />
                                )}
                                {currentPage === lastPage && (
                                    <User
                                        valueName={name}
                                        valueJobTitle={jobTitle}
                                        valueEmail={email}
                                        valuePhoneNumber={phoneNumber}
                                        onChangeName={onChangeName}
                                        onChangeJobTitle={onChangeJobTitle}
                                        onChangeEmail={onChangeEmail}
                                        onChangePhoneNumber={
                                            onChangePhoneNumber
                                        }
                                />
                                )}

                                <div className="mt-5">
                                    {currentPage < lastPage && (
                                        <GologsButton
                                            variant="bootstrap-primary"
                                            onClick={next}
                                            content="Continue"
                                            className="w-100"
                                            showLoading={true}
                                        />
                                    )}
                                    {currentPage === lastPage && (
                                        <GologsButton
                                            variant="bootstrap-primary"
                                            onClick={onSubmit}
                                            content="Submit"
                                            className="w-100"
                                            showLoading={true}
                                        />
                                    )}
                                    {currentPage > 1 && (
                                        <Button
                                            variant="outline-primary"
                                            onClick={prev}
                                            className="w-100 font-weight-bold py-3 mt-3"
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {currentPage === 1 && (
                                        <GologsButton
                                            variant="bootstrap-outline-dark"
                                            onClick={() =>
                                                history.push("/login")
                                            }
                                            content="Back to Home"
                                            className="w-100 mt-2"
                                        />
                                    )}
                                </div>
                            </form>

                            <div className="mt-5">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    onClick={() => history.push("/login")}
                                    className="font-weight-bold text-primary"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {redirectToSuccessPage === true && redirectToSuccessPage && (
                <Redirect
                    to={{
                        pathname: "/registration/success"
                    }}
                />
                )}
            {isRedirectHome === true && (
                <Redirect
                    to={{
                        pathname: "/home"
                    }}
                />                
            )}
        </>
    );
}
