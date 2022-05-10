import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";

interface Props {
    slug: string;
    className?: string;
};

export default function GeneralTranslation (props: Props) {
    const { t } = useTranslation();
    const getData = () => {
        const dotIndex = props.slug.indexOf(".");
        let r: any = "";
        if (dotIndex > -1) {
            let items = props.slug.split(".")
            let i: any = 0;
            let unit: any = translations;
            for(i in items) {
                unit = unit[items[i]]
            }
            r = t(unit)
        } else {
            r = t(translations.entities.general[props.slug]); 
        }

        return r;
    }
    
    return (
        <span className={props.className}>
            { getData() }
        </span>            
    )
    
}
