import React, { useState } from "react";
import Milestone from "./Milestone";
import { translations } from "../../../locales/i18n";
import { useTranslation } from "react-i18next";

interface Props {
    className?: string;
    onClick?: any;
}

export default function TimeMilestone(props: Props) {
    const { t } = useTranslation();
    const [section, setSection] = useState(4);

    const setActivedSection = (activeSection) => {
        if (props.onClick) {
            props.onClick(activeSection);
        }
    };
    
    const contents = [
        { name: t(translations.entities.general.days) },
        { name: t(translations.entities.general.weeks) },
        { name: t(translations.entities.general.months) },
        { name: t(translations.entities.general.years) }
    ];

    return (
        <Milestone
            contents={contents}
            className={props.className}
            activeSection={section}
            onClick={setActivedSection}
        />
    );
}
