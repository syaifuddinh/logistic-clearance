import React, { Component, useState } from "react";
import {
    Input
} from "../../../styles/Wizard";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";
import { GologsIcon } from "../Icon/Loadable";
import { InputLabel } from "../Label/Input/Loadable";
import DatePicker from "react-datepicker";
import {
    Icon,
    DatePickerWrapperStyles
} from "../../../styles/Wizard";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

type IItems = {
    value: any;
    label?: any;
};

type IProps = {
    className?: string;
    onChange?: any;
    onFocus?: any;
    readonly?: boolean;
    error?: boolean;
    value?: any;
    variant?: string;
    type?: string;
    icon?: string;
    placeholder?: string;
    translation?: string;
    placeholderByTranslation?: boolean;
    hidePrefix?: boolean;
    labelSlug?: string;
    showAsterisk?: boolean;
    items?: IItems[];
};

class GologsInput extends Component<IProps> {
    state = {
        id : ""
    };
    
    componentDidMount() {
        let id: string = "input" + Math.round(Math.random() * 999999999);
        if(this.props.translation) {
            id = this.props.translation + "Field";
        }
        this.setState({id : id})
    }
    
    getClassName = () => {
        let r = "default"
        if (this.props.variant) {
            r = this.props.variant;
        }
        r = "gologs-select-" + r;
        
        return r;
    }

    getContent = (props) => {
        const { t } = useTranslation();
        const [isSuggestionOpened, setIsSuggestionOpened] = useState(false);
        const openSuggestion = () => {
            setIsSuggestionOpened(true);
        };
        const closeSuggestion = () => {
            setTimeout(() =>{
                setIsSuggestionOpened(false);
            }, 200);
        };
        const getPlaceholder = () => {
            let pleaseFill = t(translations.entities.general.pleaseFill);
            let r: string = "";
            if (props.type == "date") {
                pleaseFill = t(translations.entities.general.select);
            } else if (props.type == "autocomplete") {
                pleaseFill = t(translations.entities.general.selectOrInput);
            }
            if (props.placeholderByTranslation) {
                const dotIndex = props.translation.indexOf(".");
                let r: any = "";
                let text: string = "";
                if (dotIndex > -1) {
                    let items = props.translation.split(".");
                    let i: any = 0;
                    let unit: any = translations;
                    for (i in items) {
                        unit = unit[items[i]];
                    }
                    text = t(unit);
                } else {
                    text = t(translations.entities.general[props.translation]);
                }

                if (props.hidePrefix) {
                    r = text;
                } else {
                    r = pleaseFill + " " + text;
                }

                return r;
            } else {
                return props.placeholder
            }
        }

        const focusInput = () => {
            let el: any = document.getElementById(props.id);
            el.focus();
        }
        
        return (
            <>
                {(!props.type || props.type == "text" || props.type == "number") && (
                    <>
                        {props.labelSlug && (
                            <InputLabel
                                translationSlug={props.labelSlug}
                                showAsterisk={props.showAsterisk ? true : false}
                            />
                        )}
                        {props.variant == "primary" && (
                            <div
                                onClick={focusInput}
                                className="rounded-19px border-fifth-gray border-1 d-flex align-items-center"
                            >
                                {props.icon && (
                                    <label className="w-16 d-inline-block pl-3 pt-1">
                                        <GologsIcon
                                            height={16}
                                            width="auto"
                                            name={props.icon}
                                        />
                                    </label>
                                )}
                                <input
                                    id={props.id}
                                    type="text"
                                    readOnly={props.readonly}
                                    placeholder={getPlaceholder()}
                                    value={props.value}
                                    onChange={props.onChange}
                                    className={
                                        props.className +
                                        " " +
                                        "input-focus-none pr-3 py-2 fs-12px rounded-19px font-poppins border-0 " +
                                        (props.readonly
                                            ? "bg-secondary-gray font-weight-light-bold"
                                            : "") +
                                        (props.icon ? "w-84" : "w-100")
                                    }
                                />
                            </div>
                        )}

                        {props.variant == "secondary" && (
                            <input
                                id={props.id}
                                type={!props.type ? "text" : props.type}
                                readOnly={props.readonly}
                                placeholder={getPlaceholder()}
                                value={props.value}
                                onChange={props.onChange}
                                className="form-control"
                            />
                        )}

                        {(!props.variant || props.variant == "default") && (
                            <>
                                <Input
                                    type={props.type ? props.type : "text"}
                                    readOnly={props.readonly}
                                    id={props.id}
                                    placeholder={getPlaceholder()}
                                    error={props.error}
                                    value={props.value}
                                    onChange={props.onChange}
                                    className={(props.readonly ? "bg-secondary-gray font-weight-light-bold" : "") + " " + props.className}
                                />
                            </>
                        )}
                    </>
                )}

                {props.type == "autocomplete" && (
                    <div className="position-relative w-100">
                        {props.labelSlug && (
                            <InputLabel
                                translationSlug={props.labelSlug}
                                showAsterisk={props.showAsterisk ? true : false}
                            />
                        )}

                        {(!props.variant || props.variant == "default") && (
                            <Input
                                readOnly={props.readonly}
                                id={props.id}
                                placeholder={getPlaceholder()}
                                error={props.error}
                                value={props.value}
                                onChange={props.onChange}
                                onFocus={() => {
                                    openSuggestion();
                                    if (props.onFocus) {
                                        props.onFocus();
                                    }
                                }}
                                onBlur={closeSuggestion}
                                className={
                                    props.className +
                                    " " +
                                    (props.readonly
                                        ? "bg-secondary-gray font-weight-light-bold"
                                        : "")
                                }
                            />
                        )}

                        {props.variant === "primary" && (
                            <input
                                id={props.id}
                                type="text"
                                onFocus={() => {
                                    openSuggestion();
                                    if (props.onFocus) {
                                        props.onFocus();
                                    }
                                }}
                                onBlur={closeSuggestion}
                                readOnly={props.readonly}
                                placeholder={getPlaceholder()}
                                value={props.value}
                                onChange={props.onChange}
                                className={"form-control"}
                            />
                        )}

                        {isSuggestionOpened && (
                            <div
                                className="position-absolute w-100 border-gray border-1 bg-white"
                                style={{ left: 0, top: "108%", zIndex: 1000 }}
                            >
                                {props.items
                                    .filter(v => {
                                        let keyword: any = props.value;
                                        let regex: any = {};
                                        keyword = keyword ? keyword : "";
                                        keyword = keyword.trim();
                                        if (!keyword) return true;
                                        else {
                                            regex = new RegExp(
                                                ".*" +
                                                    keyword.toLowerCase() +
                                                    ".*"
                                            );
                                            return regex.test(
                                                v.label.toLowerCase()
                                            );
                                        }
                                    })
                                    .map((v, index) => (
                                        <div
                                            key={"item" + index}
                                            className="w-100 py-2 px-3 text-capitalize font-weight-light-bold text-white-hover bg-black-hover"
                                            onClick={() => {
                                                let e: any = {
                                                    target: {
                                                        value: v.value
                                                    }
                                                };
                                                props.onChange(e);
                                            }}
                                        >
                                            {v.label}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {props.type == "date" && (
                    <>
                        {props.labelSlug && (
                            <InputLabel
                                translationSlug={props.labelSlug}
                                showAsterisk={props.showAsterisk ? true : false}
                            />
                        )}
                        {props.readonly ? (
                            <Input
                                readOnly={props.readonly}
                                placeholder={getPlaceholder()}
                                value={
                                    props.value
                                        ? moment(props.value).format(
                                              "DD-MM-YYYY"
                                          )
                                        : ""
                                }
                                className={
                                    props.className +
                                    " " +
                                    "bg-secondary-gray font-weight-light-bold"
                                }
                                disabled
                            />
                        ) : (
                            <>
                                {props.variant == "primary" && (
                                    <DatePickerWrapperStyles />
                                )}
                                <div className="react-datepicker-container d-flex align-items-center h-66px">
                                    <div className="d-inline-flex align-items-center w-15">
                                        <Icon
                                            style={{
                                                position: "relative",
                                                float: "left",
                                                display: "inline-block",
                                                marginTop: "0px",
                                                zIndex: 0
                                            }}
                                            src={require("../../../assets/icons/calendar.svg")}
                                        />
                                    </div>
                                    <DatePicker
                                        selected={this.props.value}
                                        placeholderText={getPlaceholder()}
                                        onChange={props.onChange}
                                        dateFormat="dd-MM-yyyy"
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
            </>
        );
    }

    render() {
        return (
            <span className={this.getClassName()}>
            <this.getContent
                placeholder={this.props.placeholder}
                placeholderByTranslation={this.props.placeholderByTranslation}
                translation={this.props.translation}
                error={this.props.error}
                value={this.props.value}
                items={this.props.items}
                icon={this.props.icon}
                type={this.props.type}
                variant={this.props.variant}
                readonly={this.props.readonly}
                hidePrefix={this.props.hidePrefix}
                onChange={this.props.onChange}
                onFocus={this.props.onFocus}
                className={this.props.className}
                labelSlug={this.props.labelSlug}
                showAsterisk={this.props.showAsterisk}
                id={this.state.id}
            />
            </span>
        );
    }
}

export default GologsInput;
