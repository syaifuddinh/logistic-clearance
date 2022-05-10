import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { translations } from "../../../../../locales/i18n";

export default function ExportButton(props) {
    const { t } = useTranslation();

    return (
        <>
            <Button
                variant="success"
                size="sm"
                className="border rounded-large text-capitalize px-3 py-1"
            >
                <small className="font-weight-bold">
                    {t(translations.entities.general.export)}
                </small>
            </Button>
        </>
    );
}
