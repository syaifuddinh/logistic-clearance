import React from "react";
import { SP2RequestList } from "./List/Loadable";
import { SP2RequestShow } from "./Show/Loadable";
import { SP2Success } from "./Success/Loadable";
import { SP2GatePass } from "./GatePass/Loadable";
import { SP2Invoice } from "./Invoice/Loadable";
import { SP2ProformaInvoice } from "./ProformaInvoice/Loadable";

import { useTranslation } from "react-i18next";

import { SP2Wizard } from "../../components/SP2Wizard/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function RequestSP2() {
    const { t } = useTranslation();
    const { path } = useRouteMatch();

    let content = <SP2Wizard />;
    return (
        <>
            <Switch>
                <Route path={`${path}/create`}>{content}</Route>
                <Route path={`${path}/success`} component={SP2Success}></Route>
                <Route path={`${path}/gate-pass`} component={SP2GatePass}></Route>
                <Route path={`${path}/proforma-invoice`} component={SP2ProformaInvoice}></Route>
                <Route path={`${path}/invoice`} component={SP2Invoice}></Route>
                <Route path={`${path}/:id/continue`} component={SP2Wizard}></Route>
                <Route path={`${path}/:id`} component={SP2RequestShow}></Route>
                <Route path={`${path}`} component={SP2RequestList}></Route>
            </Switch>
        </>
    );
}
