import React, { useState } from "react";
import {
    Language,
    LanguageNav,
    NavText,
    NavItemText,
    LangOptions,
    LangItem
} from "../../../../styles/Header";
import Dictionary from "../../../../model/Dictionary";
import { Image } from "../../../../styles/Sidebar";


export default function GologsLang(props) {
    const [collapseLang, setCollapselang] = useState(false);

    const languageChange = () => {
        setCollapselang(!collapseLang);
    };

    const getCurrentLang = () => {
        let r = Dictionary.getCurrentChosenObj();
        return r;
    };

    const selectLang = slug => {
        return () => {
            if (Dictionary.getChosen() != slug) {
                Dictionary.setChosen(slug);
                window.location.reload();
            } else {
                setCollapselang(false);
            }
        };
    };

    const LanguageOptions = () =>
        collapseLang ? (
            <LangOptions className="pt-3 pl-3">
                { Dictionary.index.map((v) => {
                    return (
                        <LangItem onClick={selectLang(v.slug)}>
                            <NavItemText>
                                <span className="d-inline-block" style={{width:"7mm"}}>
                                    <Image
                                        style={{ width: "5.5mm", height: "auto" }}
                                        className="position-relative"
                                        src={v.image}
                                    />
                                </span>
                                <span className="text-uppercase">
                                    { v.slug }
                                </span>
                            </NavItemText>
                        </LangItem>
                    )
                }) }
            </LangOptions>
      ) : null;
    
    return (
        <span>
            <Language
                show={collapseLang}
                onClick={languageChange}
                className="md-h-52px h-35px"
            >
                <NavText className="mt-3 d-inline-block pl-3">
                    <span className="d-inline-block mr-2">
                        <img
                            style={{ width: "auto" }}
                            className="position-relative md-h-25px h-19px"
                            src={getCurrentLang().image}
                        />
                    </span>
                    <span className="text-uppercase">
                        <span className="d-none d-md-inline-block">
                            {getCurrentLang().slug}
                        </span>
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
