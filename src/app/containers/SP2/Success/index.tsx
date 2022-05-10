import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { SuccessTransactionPanel } from "../../../components/SuccessTransactionPanel/Loadable";
import SP2 from "../../../../model/SP2";
import User from "../../../../model/User";

export default function SP2Success() {
    const { t } = useTranslation();
    const [companyType] = useState(User.getCompanyType);
    const [statusModel, setStatusModel] = useState(SP2.statuses);
    const [statusStep, setStatusStep] = useState(0);

    useEffect(() => {
        switch (companyType) {
            case "CargoOwner":
                setStatusModel(SP2.statuses);
                setStatusStep(1);
                break;
            case "Forwarder":
                setStatusModel(SP2.delegateStatuses);
                setStatusStep(2);
                break;
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>{t(translations.SP2.title)}</title>
            </Helmet>
            <Sidebar header-name={t(translations.SP2.title)} />
            <SuccessTransactionPanel
                jobNumberKey="latestSP2JobNumber"
                transactionRedirectLink="/sp2-request"
                serviceStatuses={statusModel}
                titleSlug="SP2.title"
                statusStep={statusStep}
            />
        </>
    );
}
