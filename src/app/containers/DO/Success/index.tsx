import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { SuccessTransactionPanel } from "../../../components/SuccessTransactionPanel/Loadable";
import DeliveryOrder from "../../../../model/DeliveryOrder";
import User from "../../../../model/User";

export default function DOSuccess() {
    const { t } = useTranslation();
    const [companyType] = useState(User.getCompanyType);
    const [statusModel, setStatusModel] = useState(DeliveryOrder.statuses);
    const [statusStep, setStatusStep] = useState(0);

    useEffect(() => {
        switch(companyType) {
            case "CargoOwner":
                setStatusModel(DeliveryOrder.statuses);
                setStatusStep(0);
                break;
            case "Forwarder":
                setStatusModel(DeliveryOrder.delegateStatuses);
                setStatusStep(1);
                break;
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>{t(translations.requestDO.title)}</title>
            </Helmet>
            <Sidebar header-name={t(translations.requestDO.title)} />
            <SuccessTransactionPanel
                jobNumberKey="latestDeliveryOrderJobNumber"
                transactionRedirectLink="/transaction"
                serviceStatuses={statusModel}
                titleSlug="requestDO.title"
                statusStep={statusStep}
            />
        </>
    );
}
