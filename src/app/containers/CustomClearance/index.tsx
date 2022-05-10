import React from "react";
import { CustomClearanceCreate } from "./Create/Loadable";
import { CustomClearanceRequestList } from "./List/Loadable";
import { CustomClearanceRequestShow } from "./Show/Loadable";
import { CustomClearanceSuccess } from "./Success/Loadable";
import { CustomClearanceGatePass } from "./GatePass/Loadable";
import { CustomClearanceInvoice } from "./Invoice/Loadable";
import { CustomClearanceProformaInvoice } from "./ProformaInvoice/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function RequestCustomClearance() {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route
                    path={`${path}/create`}
                    component={CustomClearanceCreate}
                />
                <Route
                    path={`${path}/success`}
                    component={CustomClearanceSuccess}
                ></Route>
                <Route
                    path={`${path}/gate-pass`}
                    component={CustomClearanceGatePass}
                ></Route>
                <Route
                    path={`${path}/proforma-invoice`}
                    component={CustomClearanceProformaInvoice}
                ></Route>
                <Route
                    path={`${path}/invoice`}
                    component={CustomClearanceInvoice}
                ></Route>
                <Route
                    path={`${path}/:id`}
                    component={CustomClearanceRequestShow}
                ></Route>
                <Route
                    path={`${path}`}
                    component={CustomClearanceRequestList}
                ></Route>
            </Switch>
        </>
    );
}
