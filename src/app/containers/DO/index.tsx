import React from "react";
import { DORequestShow } from "./Show/Loadable";

import { Wizard } from "../../components/Wizard/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function RequestDO() {
    const { path } = useRouteMatch();

    let content = <Wizard />;

    return (
        <>
            <Switch>
                <Route path={`${path}/create`}>{content}</Route>
                <Route path={`${path}/:id/continue`} component={Wizard}></Route>
                <Route path={`${path}/:id`} component={DORequestShow}></Route>
            </Switch>
        </>
    );
}
