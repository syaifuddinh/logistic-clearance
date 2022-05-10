import React from "react";
import { DelegateCreate } from "./Create/Loadable";
import { DelegateList } from "./List/Loadable";
import { DelegateShow } from "./Show/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function Delegate() {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route
                    path={`${path}/create`}
                    component={DelegateCreate}
                ></Route>
                <Route path={`${path}/list`} component={DelegateList}></Route>
                <Route path={`${path}/:id`} component={DelegateShow}></Route>
            </Switch>
        </>
    );
}
