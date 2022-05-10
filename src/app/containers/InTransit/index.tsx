import React from "react";
import { InTransitList } from "./List/Loadable";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function InTransit() {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${path}`} component={InTransitList}></Route>
            </Switch>
        </>
    );
}
