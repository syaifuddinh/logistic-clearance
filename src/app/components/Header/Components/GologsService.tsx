import React, { useState } from "react";
import {
    Language,
    LanguageNav,
    NavText,
    NavItemText,
    LangOptions,
    LangItem
} from "../../../../styles/Header";
import { Image } from "../../../../styles/Sidebar";
import ServiceType from "../../../../model/ServiceType";
import User from "../../../../model/User";

export default function GologsService(props) {
    const [collapseLang, setCollapselang] = useState(false);
    const getTitle = () => {
        const r = ServiceType.getChosenName();
        return r;
    };

    const getCompanyType = () => {
        return User.getCompanyType();
    }
    
    const getImage = () => {
        const r = ServiceType.getChosenImage()
        return r
    };

    const selectServiceType = slug => {
        return () => {
            if (ServiceType.getChosen() != slug) {
                ServiceType.setChosen(slug);
                window.location.reload();
            } else {
                setCollapselang(false);
            }
        };
    };

    const languageChange = () => {
        setCollapselang(!collapseLang);
    };

    const LanguageOptions = () =>
        collapseLang ? (
            <LangOptions className="pt-3 pl-3">
                { ServiceType.index.map((v) => {
                    return (
                        <LangItem>
                            <NavItemText onClick={selectServiceType(v.slug)}>
                                <span className="d-inline-block" style={{width:"7mm"}}>
                                    <Image
                                        style={{ width: "5.5mm", height: "auto" }}
                                        className="position-relative"
                                        src={v.image}
                                    />
                                </span>
                                <span className="text-capitalize">
                                    { v.name }
                                </span>
                            </NavItemText>
                        </LangItem>
                    )
                }) }
            </LangOptions>
        ) : null;
    
    return getCompanyType() != "CargoOwner" ? (<></>) : (
        <span>
            <Language
                show={collapseLang}
                onClick={languageChange}
                className="md-h-52px h-35px"
            >
                <NavText className="mt-3 d-flex align-items-center text-capitalize pl-3">
                <span className="d-inline-block mr-2">
                    <Image
                        style={{ width: "auto" }}
                        className="position-relative md-h-32px h-20px"
                        src={ getImage() }
                    />
                </span>
                <span className="d-inline-block md-w-35mm w-25mm">
                    <small className="font-weight-bold text-very-muted">
                        Module
                    </small>
                    <div className="text-capitalize position-relative md-fs-16px fs-12px" style={{marginTop : "-2mm"}}>
                        {getTitle()}
                    </div>
                </span>
                </NavText>
                <LanguageNav
                    src={require("../../../../assets/icons/caret-down.svg")}
                />
            </Language>
            <LanguageOptions />
        </span>
    );
}
