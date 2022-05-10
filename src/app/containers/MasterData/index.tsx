import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ShippingLinePage } from "./ShippingLine/Loadable";
import { ShippingAgentPage } from "./ShippingAgent/Loadable";
import { ContainerPage } from "./Container/Loadable";
import { DepoPage } from "./Depo/Loadable";
import { PortPage } from "./Port/Loadable";
import { BusinessTypePage } from "./BusinessType/Loadable";
import { ModulesGroupPage } from "./ModulesGroup/Loadable";
import { ModulesPage } from "./Modules/Loadable";
import { ContractPage } from "./Contract/Loadable";
import { RateByContractPage } from "./RateByContract/Loadable";
import { RatePlatformFeePage } from "./RatePlatformFee/Loadable";
import { TransactionPage } from "./Transaction/Loadable";
import { TransactionTypePage } from "./TransactionType/Loadable";

export default function MasterDataPage() {
    let { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route
                    path={`${path}/shipping_line`} 
                    component={ShippingLinePage} 
                />
                <Route
                    path={`${path}/shipping_agent`} 
                    component={ShippingAgentPage} 
                />
                <Route
                    path={`${path}/depo`} 
                    component={DepoPage} 
                />
                <Route
                    path={`${path}/container`} 
                    component={ContainerPage} 
                />
                <Route
                    path={`${path}/port`} 
                    component={PortPage} 
                />
                <Route
                    path={`${path}/business_type`} 
                    component={BusinessTypePage} 
                />
                <Route
                    path={`${path}/modules_group`} 
                    component={ModulesGroupPage} 
                />
                <Route
                    path={`${path}/modules`} 
                    component={ModulesPage} 
                />
                <Route
                    path={`${path}/contract`} 
                    component={ContractPage} 
                />
                <Route
                    path={`${path}/rate_by_contract`} 
                    component={RateByContractPage} 
                />
                <Route
                    path={`${path}/rate_platform_fee`} 
                    component={RatePlatformFeePage} 
                />
                <Route
                    path={`${path}/transaction`} 
                    component={TransactionPage} 
                />
                <Route
                    path={`${path}/transaction_type`} 
                    component={TransactionTypePage} 
                />
            </Switch>
        </div>
    );
}
