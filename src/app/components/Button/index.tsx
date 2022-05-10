import React, { Component } from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { Image } from "../../../styles/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

type IProps = {
    content?: any;
    onClick?: any;
    variant?: string;
    size?: string;
    className?: string;
    translation?: string;
    textTransform?: string;
    icon?: string;
    disabled?: boolean;
    contentByTranslation?: boolean;
    showLoading?: boolean;
}

export default class GologsButton extends Component<IProps> {
    state = {
        disabled: false,
        showLoading: false
    }
    
    onButtonClicked = async () => {
        if (this.props.onClick) {
            this.setState({disabled: true});
            this.setState({showLoading: true});
            await this.props.onClick();
            this.setState({showLoading: false});
            this.setState({disabled: false});
        }
    }
    
    getContent() {
        let r:any = "";
        if (this.props.contentByTranslation) {
            if (this.props.translation) {
                r = <GeneralTranslation slug={this.props.translation} />;
            }
        } else {
            if (this.props.content) {
                r = this.props.content;;
            }
        }

        return r;
    }

    getClassName() {
        let r:string = "";
        let variant: string = "";
        if (this.props.variant) {
            variant = this.props.variant
        }

        r += "btn font-poppins font-weight-light-bolder rounded-40px d-flex justify-content-center align-items-center ";

        if(variant.search("bootstrap") > -1) {
            r = "";
        }

        switch (variant) {
            case "primary":
                r += "text-white bg-second-primary";
                break;

            case "secondary":
                r += "text-white bg-secondary";
                break;

            case "success":
                r += "text-white bg-success";
                break;

            case "danger":
                r += "text-white bg-danger";
                break;

            case "dark":
                r += "text-white bg-dark";
                break;

            case "outline-primary":
                r += "text-second-primary border-second-primary border-2";
                break;

            case "outline-secondary":
                r += "text-secondary border-secondary border-2";
                break;

            case "outline-success":
                r += "text-success border-success border-2";
                break;

            case "outline-danger":
                r += "text-danger border-danger border-2";
                break;

            case "outline-dark":
                r += "text-dark border-dark border-2";
                break;

            case "link-primary":
                r += "text-second-primary";
                break;

            case "link-secondary":
                r += "text-secondary";
                break;

            case "link-success":
                r += "text-success";
                break;

            case "link-dark":
                r += "text-dark";
                break;

            case "bootstrap-primary":
                r += "text-white font-weight-bold btn btn-primary";
                break;

            case "bootstrap-outline-dark":
                r += "text-dark bg-white font-weight-bold btn btn-outline-dark";
                break;
        }

        if (this.props.className) {
            r += " " + this.props.className;
        }

        if (this.props.textTransform == "uppercase") {
            r += " text-uppercase";
        }

        if (this.props.textTransform == "lowercase") {
            r += " text-lowercase";
        }

        if (this.props.textTransform == "capitalize") {
            r += " text-capitalize";
        }

        switch (this.props.size) {
            case "medium":
                r += " py-3 px-4 fs-16px";
                break;
            case "small":
                r += " py-2 px-4 fs-14px";
                break;
            case "extra-small":
                r += " py-2 px-4 fs-12px";
                break;
            case "tiny":
                r += " py-2 fs-12px";
                break;
            default:
                r += " py-3";
        }
        
        return r;
    }

    getWidth() {
        let r:any = 0;

        switch(this.props.size) {
            case "medium" :
                r = 200.34 + "px";
                break;
            case "small" :
                r = 150 + "px";
                break;
            case "extra-small" :
                r = 120 + "px";
                break;
            case "tiny" :
                r = 50 + "px";
                break;
            case "extra-tiny" :
                r = 25 + "px";
                break;
            case "mini" :
                r = 10 + "px";
                break;
            case "full" :
                r = 100 + "%";
                break;
            default : 
                r = 200.34 + "px";
        }

        return r;
    }
    
    render() {
        return (
            <div
                className="position-relative"
                style={{
                    minWidth: this.getWidth()
                }}
            >
                <button
                    type="button"
                    className={this.getClassName()}
                    style={{
                        minWidth: this.getWidth(),
                        letterSpacing: "0.75px"
                    }}
                    disabled={this.state.disabled}
                    onClick={this.onButtonClicked}
                >
                    {this.getContent()}

                    {this.props.icon && (
                        <Image
                            style={{
                                width: "20px",
                                height: "20px"
                            }}
                            className="ml-2"
                            src={require("../../../assets/icons/" +
                                this.props.icon)}
                        />
                    )}


                    {this.props.showLoading === true &&
                        this.state.showLoading === true && (
                            <span
                                style={{ fontSize: "5mm" }}
                                className="d-inline-block ml-2 infinite-rotation"
                            >
                                <FontAwesomeIcon icon={faCircleNotch} />
                            </span>
                        )}
                </button>
                {this.props.disabled && (
                    <div
                        className="cursor-not-allowed position-absolute w-100 h-100 rounded-40px bg-white opacity-2"
                        style={{
                            left: 0,
                            top: 0,
                            zIndex: 50,
                            minWidth: this.getWidth() + "px"
                        }}
                    ></div>
                )}
            </div>
        );
    }
}
