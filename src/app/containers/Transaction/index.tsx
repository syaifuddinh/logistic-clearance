import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../components/Sidebar/Loadable";
import CustomTab from "./CustomTab";
import { GeneralTranslation } from "../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";

export default function Transaction() {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t(translations.sidebarMenu.myTransaction)}</title>
            </Helmet>
            <Sidebar
                header-name={
                    <GeneralTranslation slug="sidebarMenu.myTransaction" />
                }
            />
            <div className="gologs-container">
                <CustomTab />
            </div>
        </>
    );
}
