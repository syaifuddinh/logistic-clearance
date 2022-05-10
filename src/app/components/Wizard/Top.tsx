import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";
import GologsWizard from "../Milestone/GologsWizard";
import DeliveryOrder from "../../../model/DeliveryOrder";
import User from "../../../model/User";
import { Title } from "../../../styles/Wizard";

export default function Top() {
    const { t } = useTranslation();
    const [statuses, setStatuses] = useState(DeliveryOrder.statuses);
    const [step, setStep] = useState(0);

    const setDataByCompanyType = () => {
        const companyType = User.getCompanyType();
        setStatusIndicator(companyType);
    };

    const setStatusIndicator = (companyType) => {
        if(companyType === "CargoOwner") {
            setStatuses(DeliveryOrder.statuses);
            setStep(0);
        } else if(companyType === "Forwarder") {
            setStatuses(DeliveryOrder.delegateStatuses);
            setStep(1);
        }
    };

    useEffect(() => {
        setDataByCompanyType();
    }, []);

    return (
        <div className="bg-white rounded-20px px-4 py-3">
            <Title>{t(translations.wizard.top.title)}</Title>
            <div className="p-3">
                <GologsWizard
                    items={statuses}
                    step={step}
                />
            </div>
        </div>
    );
}
