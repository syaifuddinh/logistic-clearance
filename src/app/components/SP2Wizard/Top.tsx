import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";
import GologsWizard from "../Milestone/GologsWizard";
import SP2 from "../../../model/SP2";
import User from "../../../model/User";

import { Title } from "../../../styles/Wizard";

export default function Top(props) {
    const { t } = useTranslation();
    const [statuses, setStatuses] = useState(SP2.statuses);
    const [companyType, setCompanyType] = useState("");

    const setDataByCompanyType = () => {
        const companyType = User.getCompanyType();
        setCompanyType(companyType);
        setStatusIndicator(companyType);
    };

    const setStatusIndicator = companyType => {
        if (companyType === "CargoOwner") {
            setStatuses(SP2.statuses);
        } else if (companyType === "Forwarder") {
            setStatuses(SP2.delegateStatuses);
        }
    };

    useEffect(() => {
        setDataByCompanyType();
    }, []);

    return (
        <div className="bg-white rounded-20px px-4 py-3">
            <Title>{t(translations.wizard.top.SP2Title)}</Title>
            <div className="p-3">
                <GologsWizard
                    items={statuses}
                    rectangleWidth={11}
                    step={companyType === "Forwarder" ? props.step + 1 : props.step}
                />
            </div>
        </div>
    );
}
