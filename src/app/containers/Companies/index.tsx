import React from "react";
import { Helmet } from "react-helmet-async";
import { loader } from "graphql.macro";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";

import Editor from "./edit";
import { Ellipsis } from "../../components/Spinners";
import { translations } from "locales/i18n";

export default function Companies() {
    const { id, action } = useParams();
    const { t } = useTranslation();

    const title = t(translations.companies.title);

    let content = (
        <table>
            <thead>
                <th>{t(translations.entities.general.Id)}</th>
                <th>{t(translations.entities.general.Name)}</th>
                <th>{t(translations.entities.general.Type)}</th>
                <th>{t(translations.entities.general.Npwp)}</th>
                <th>{t(translations.entities.general.Broker)}</th>
            </thead>
            <tbody>
            <CompaniesTr />
            </tbody>
        </table>
    );

    if (typeof id !== "undefined") {
        // TODO: Add view container.
        if (typeof action !== "undefined") {
            if (action === "edit") {
            content = <CompanyEdit id={id} />;
            }
        } else {
            content = <span>View</span>;
        }
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <h2>{title}</h2>
            {content}
        </>
    );
    }

    const companyQuery = loader("../../../graphql/queries/Company.graphql");

    function CompanyEdit(id) {
        const { loading, error, data } = useQuery(companyQuery, {
            variables: id
        });

        if (error) throw error;
        if (loading) return <Ellipsis />;

        return <Editor company={data.company} />;
    }

    const companiesQuery = loader("../../../graphql/queries/companies.graphql");

    function CompaniesTr() {
        const { loading, error, data } = useQuery(companiesQuery);

        if (error) throw error;
        if (loading) return <Ellipsis />;

        return data.companies.map(
        ({ id, companyName, companyType, npwp, brokerCompany }) => (
            <tr>
                <td>{id}</td>
                <td>{companyName}</td>
                <td>{companyType.typeName}</td>
                <td>{npwp}</td>
                <td>{brokerCompany?.companyName}</td>
            </tr>
        )
    );
}
