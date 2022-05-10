import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { SuccessTransactionPanel } from "../../../components/SuccessTransactionPanel/Loadable";
import CustomClearance from "../../../../model/CustomClearance";


export default function CustomClearanceSuccess() {
    const { t } = useTranslation();
    
    return (
        <>
            <Helmet>
                <title>{t(translations.customClearance.title)}</title>
            </Helmet>
            <Sidebar header-name={t(translations.customClearance.title)} />
            <SuccessTransactionPanel
                jobNumberKey="latestCustomClearanceJobNumber"
                transactionRedirectLink="/custom-clearance-request"
                serviceStatuses={CustomClearance.statuses}
                titleSlug="customClearance.request"
                statusStep={2}
            />
        </>
    );
}
