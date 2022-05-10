import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { translations } from "../../../locales/i18n";
import { Sidebar } from "../../components/Sidebar/Loadable";
import ShippingLine from "./Components/ShippingLine";
import { OrderShowPage } from "./Show/Loadable";
import { FindByBL } from "./FindByBL/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function OrderPage(props) {
    const { t } = useTranslation();

    let content;
    let { path } = useRouteMatch();
    const url = window.location.pathname;

    content = (
        <>
            <Helmet>
                <title>{t(translations.home.title)}</title>
            </Helmet>
            <Sidebar header-name={t(translations.order.title)} />

            <div className="gologs-container">
                <ShippingLine />
            </div>
        </>
    );
    
    return (
        <>
            <Switch>
                {/.+order\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(
                    url
                ) && <Route path={`${path}/:id`} component={OrderShowPage} />}
                
                {/.+find-by-bl.+/.test(url) && (
                    <Route
                        path={`${path}/find-by-bl/:bl`}
                        component={FindByBL}
                    />
                )}
                <Route path={`${path}`}>{content}</Route>
            </Switch>
        </>
    );
}
