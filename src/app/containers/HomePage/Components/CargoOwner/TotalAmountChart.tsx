import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import { translations } from "../../../../../locales/i18n";
import { Bar } from "react-chartjs-2";

export default function TotalAmountChart(props) {
    const { t } = useTranslation();
    let labels: number[] = [];
    let lastYearLabel: number[] = [];
    let thisYearLabel: number[] = [];
    for (let i = 0; i < 12; i++) {
        labels.push(i + 1);
        lastYearLabel.push(Math.round(Math.random() * 50));
        thisYearLabel.push(Math.round(Math.random() * 50));
    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Last Year",
                data: lastYearLabel,
                backgroundColor: "#0078ff"
            },
            {
                label: "This Year",
                data: thisYearLabel,
                backgroundColor: "#7456fd"
            }
        ]
    };

    return (
        <>
            <Card className="h-100">
                <Card.Body>
                    <Card.Subtitle className="text-muted text-capitalize d-inline-block">
                        {t(translations.entities.general.totalAmount)} (IDR 1000.000.000)
                    </Card.Subtitle>
                    <Card.Text className="mt-1">
                        <Bar data={data} type="bar" />
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
