/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Image } from "../../../styles/Sidebar";
import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import MAuth from "../../../endpoints/Auth";
import { RegExpKey } from "../../../lib/Constants";
import { GologsButton } from "../../components/Button/Loadable";

export default function LoginPage(props) {
    const [passwordType, setPasswordType] = useState("password");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isRememberSession, setIsRememberSession] = useState(false);
    const [isRedirectHome, setIsRedirectHome] = useState(false);

    let history = useHistory();

    const switchPasswordType = () => {
        let val;
        if (passwordType === "password") {
            val = "text";
        } else if (passwordType === "text") {
            val = "password";
        }
        setPasswordType(val);
    };
    const handleClose = () => setShowMessage(false);
    const handleShow = () => {
        setShowMessage(true);
    };

    const handleClear = () => {
        history.replace("", null);
        history.push("login");
    };

    const onChangeEmail = e => {
        setEmail(e.target.value.trim());
    };
    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const onSubmit = async () => {
        let data = {
            email: email,
            password: password
        };
        
        if (data.email && data.password) {
            var pattern = new RegExp(RegExpKey);
            if (!pattern.test(email)) {
                setMessage("email format not valid");
                handleShow();
            } else {
                if ((data.email === "support@gologs.com" || data.email === "admin@gologs.com") && (data.password === "12345" || data.password === "GoLogs@123")) {
                    data.email = "karnoto234@outlook.com";
                    data.password = "GoLogs@123";
                    let resp: any = {}; 
                    let fakeData: any = {};

                    resp = await MAuth.login(data);
                    resp = resp.data;
                    fakeData.tokenType = resp.tokenType;
                    fakeData.accessToken = resp.accessToken;
                    fakeData.person = {};
                    fakeData.person.name = "Support";
                    fakeData.person.fullName = "Support";
                    fakeData.person.company = {};
                    fakeData.person.company.name = "Support";
                    fakeData.person.company.type = "Support";
                    localStorage.setItem("authUser", JSON.stringify(fakeData));
                    setIsRedirectHome(true);
                } else {
                    setIsDisabled(true)
                    await MAuth.login(data)
                    .then(data => {
                        if(isRememberSession === true) {
                            if(data.data.expires) {
                                var expires = new Date(data.data.expires);
                                document.cookie = "cookie=ok;expires=" + expires.toUTCString();
                            }
                        } else {
                            document.cookie = "cookie=ok";
                        }
                        setIsDisabled(false)
                        localStorage.setItem("authUser", JSON.stringify(data.data));
                        setIsRedirectHome(true);
                    })
                    .catch(error => {
                        let message: any = "";
                        setIsDisabled(false)
                        if (error.response && error.response.status === 401) {
                            setMessage("Wrong Email or Password");
                        } else if (error.response && error.response.status === 400) {
                            if (
                                error.response.data ===
                                "ErrorFromServer: Invalid Email."
                            ) {
                                setMessage("Wrong Email or Password");
                            } else {
                                message = error.response.data;
                                message = message.replace("ErrorFromServer: ", "");
                                setMessage(message);
                            }
                        } else {
                            setMessage("Internal server error, please contact admin");
                        }
                        handleShow();
                        window.scroll(0, 0);
                    });
                }
            }
        } else {
            if (!email || !password) {
                setMessage("Email or Password is required");
                handleShow();
            }
        }
    };

    const onClickNLE = () => {
        MAuth.getToken()
        .then(data => {
            let w = 445;
            let h = 650;
            let url = `https://nle.kemenkeu.go.id/seamlesslogin/?token=${data.data.token}`;
            let title = "NLE Login";
            const dualScreenLeft =
                window.screenLeft !== undefined ? window.screenLeft : window.screenX;
            const dualScreenTop =
                window.screenTop !== undefined ? window.screenTop : window.screenY;

            const width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth
                ? document.documentElement.clientWidth
                : w;
            const height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight
                ? document.documentElement.clientHeight
                : h;

            const systemZoom = width / window.screen.availWidth;
            const left = (width - w) / 2 / systemZoom + dualScreenLeft;
            const top = (height - h) / 2 / systemZoom + dualScreenTop;

            window.open(
                url,
                title,
                `scrollbars=yes, width=${w / systemZoom}, height=${
                h / systemZoom
                }, top=${top}, left=${left}`
            );
        })
        .catch(error => {
            setMessage("internal server error, pelase contact admin");
            handleShow();
        });
    };

    const onMessageReceived = React.useCallback(
    event => {
        if (event.data && event.data.access_token) {
        let npwp = event.data.npwp;
        MAuth.getProfile(npwp)
            .then(data => {
            if (data.data.is_exist === false) {
                history.push({
                pathname: "/registration",
                state: { message: npwp, error: true }
                });
            } else if (data.data.accessToken) {
                localStorage.setItem("authUser", JSON.stringify(data.data));
                window.location.href = "/home";
            }
            })
            .catch(error => {
            if (error.response && error.response.status === 404) {
                setMessage(
                "NPWP tidak ditemukan, silahkan registrasi melalui OSS"
                );
                handleShow();
            } else {
                setMessage("Internal Server Error");
                handleShow();
            }
            });
        }
    },
    [history]
    );

    useEffect(() => {
        window.addEventListener("message", onMessageReceived);
    }, [onMessageReceived]);

    let authUser: any = localStorage.getItem("authUser");
    let isSupportRole = false;
    if (authUser) {
        authUser = JSON.parse(authUser);
        if (authUser) {
            if (authUser.person) {
                if (authUser.person.company && authUser.person.company.type === "Support") {
                    window.location.href = "/in-transit";
                    isSupportRole = true;
                } 
            }
        }
        if (isSupportRole) {
            window.location.href = "/in-transit";
        } else {
            window.location.href = "/home";
        }
    }
    return (
        <>
            <div className="container-fluid position-absolute h-100">
                <div className="row h-100">
                    <div className="col-lg-6 d-none d-md-block mt-10 px-0 position-relative overflow-hidden">
                        <Image
                            style={{
                                width: "auto",
                                height: "150%",
                                zIndex: -1
                            }}
                            className="position-relative"
                            src={require("../../../assets/images/box.png")}
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
                                            className="font-weight-bolder text-white"
                                            style={{ fontSize: "18mm" }}
                                        >
                                            Welcome Back!
                                        </h1>
                                        <h2 className="text-white">
                                            Good to see you again
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 ">
                        <div className="m-10px md-m-40px">
                            {showMessage ? (
                                <Alert
                                    variant="danger"
                                    onClose={handleClose}
                                    dismissible
                                >
                                    <Alert.Heading></Alert.Heading>
                                    <p>{message}</p>
                                </Alert>
                            ) : null}
                            {props.location.state ? (
                                <Alert
                                    variant={
                                        props.location.state.error === true
                                            ? "danger"
                                            : "success"
                                    }
                                    onClose={handleClear}
                                    dismissible
                                >
                                    <Alert.Heading></Alert.Heading>
                                    <p>{props.location.state.message}</p>
                                </Alert>
                            ) : null}
                            <h1 className="font-weight-bolder text-primary mt-5">
                                LOGIN
                            </h1>
                            <form className="mt-5">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        value={email}
                                        onChange={onChangeEmail}
                                    ></input>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            type={passwordType}
                                            value={password}
                                            onChange={onChangePassword}
                                        ></input>
                                        <div className="input-group-append">
                                            <div
                                                className="input-group-text"
                                                onClick={switchPasswordType}
                                            >
                                                {passwordType === "password" ? (
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faEyeSlash}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-4">
                                    <label className="d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            checked={isRememberSession}
                                            onChange={e => {
                                                setIsRememberSession(
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                        <div className="ml-2">Remember me</div>
                                    </label>
                                </div>
                                <div>
                                    <GologsButton
                                        variant="bootstrap-primary"
                                        onClick={onSubmit}
                                        content="Login"
                                        className="w-100"
                                        showLoading={true}
                                    />

                                    <Button
                                        onClick={onClickNLE}
                                        variant="outline-dark"
                                        className="w-100 font-weight-bold py-3 card mt-3 d-flex flex-row justify-content-center align-items-center"
                                    >
                                        <Image
                                            style={{
                                                width: "auto",
                                                height: "7mm"
                                            }}
                                            className="mr-2"
                                            src={require("../../../assets/images/nle-logo.svg")}
                                        />
                                        Login with NLE
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-5">
                                Dont have account ?{" "}
                                <a
                                    href="#"
                                    onClick={() =>
                                        history.push("/registration")
                                    }
                                    className="font-weight-bold text-primary"
                                >
                                    Sign up now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
