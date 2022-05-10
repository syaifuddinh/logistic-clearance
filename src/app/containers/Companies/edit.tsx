import React from "react";
import { useTranslation } from "react-i18next";

import { translations } from "locales/i18n";

export default function CompanyEdit(props) {
    const { t } = useTranslation();

    return (
        <table>
            <tr>
                <td>
                    <label htmlFor="companyName">
                        {t(translations.entities.general.Name)}
                    </label>
                </td>
                <td>
                    <input
                        type="text"
                        name="companyName"
                        value={props.company.companyName}
                    />
                </td>
            </tr>
        </table>
    );
}
