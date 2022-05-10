import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Show } from "./Show/Loadable";
import { List } from "./List/Loadable";
import { translations } from "../../../../locales/i18n";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function ContractPage() {
    const { t } = useTranslation();
    const { path } = useRouteMatch();

    return (
        <>
            <Helmet>
                <title>{t(translations.home.title)}</title>
            </Helmet>
            <Sidebar header-name={t(translations.sidebarMenu.contract)} />
            <Switch>
                <Route path={`${path}/:id`} component={Show} />
                <Route path={`${path}`} component={List} />
            </Switch>
        </>
    );
}
