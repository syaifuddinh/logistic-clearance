/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React, { useEffect, useState } from "react";
import Oidc from "oidc-client";
import ServiceType from "../model/ServiceType";
import User from "../model/User";
import Dictionary from "../model/Dictionary";
// import { AuthProvider } from "oidc-react";
import { Helmet } from "react-helmet-async";
import { Redirect, Switch, Route, BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "styles/global-styles";
import { LoginPage } from "./containers/LoginPage/Loadable";
import { RegistrationPage } from "./containers/RegistrationPage/Loadable";
import { RegistrationSuccessPage } from "./containers/RegistrationPage/Success/Loadable";
import { HomePage } from "./containers/HomePage/Loadable";
import { OrderPage } from "./containers/OrderPage/Loadable";
import { RequestDO } from "./containers/DO/Loadable";
import { RequestForwarder } from "./containers/Forwarder/Loadable";
import { Delegate } from "./containers/Delegate/Loadable";
import { RequestSP2 } from "./containers/SP2/Loadable";
import { RequestCustomClearance } from "./containers/CustomClearance/Loadable";
import { ServiceTypePage } from "./containers/ServiceType/Loadable";
import { DOSuccess } from "./containers/DO/Success/Loadable";
import { DODelegateSuccess } from "./containers/DO/Success/Delegate/Loadable";
import { SP2DelegateSuccess } from "./containers/SP2/Success/Delegate/Loadable";
import { AddService } from "./containers/AddService/Loadable";
import { Transaction } from "./containers/Transaction/Loadable";
import { Draft } from "./containers/Draft/Loadable";
import { AssignOrder } from "./containers/AssignOrder/Loadable";
import { UserProfile } from "./containers/User/Profile/Loadable";
import { Companies } from "./containers/Companies/Loadable";
import { InTransit } from "./containers/InTransit/Loadable";
import { NotFoundPage } from "./components/NotFoundPage/Loadable";

import { MasterDataPage } from "./containers/MasterData/Loadable";
import Activation from "./containers/Activation/Activate";

import config from "../config";
import PageOf from "./containers/PageOf";

function PrivateRoute({ component: Component, authed, ...rest }) {
    const [isAuthed, setIsAuthed] = useState(false)
    const [isStart, setIsStart] = useState(false)

    useState(async () => {
        let userLogged: boolean = false;
        let user: any = {};
        await User.logoutIfExpired();
        user = User.get();
        userLogged = user.person ? true : false;
        setIsAuthed(userLogged);
        setIsStart(true);
    })
    
    return (
        <>
        { isStart === true && (
            <>
                <Route
                    {...rest}
                    render={props =>
                        isAuthed === true ? (
                            <Component {...props} />
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {
                                        from: props.location,
                                        message: "Session expired, please login first.",
                                        error: true
                                    }
                                }}
                            />
                        )
                    }
                />
            </>
        ) }
        </>
    );
}

export function App() {
    if (config.app.isDevelopment) {
        Oidc.Log.level = Oidc.Log.DEBUG;
        Oidc.Log.logger = console;
    } else {
        Oidc.Log.level = Oidc.Log.ERROR;
    }
    let authUser = localStorage.getItem("authUser") === null ? false : true;

    const setDefaultLang = () => {
        const chosen = Dictionary.getChosen();
        let slug:any = null;
        if (Dictionary.index.length > 0) {
            if (!chosen) {
                slug = Dictionary.index[0].slug;
                Dictionary.setChosen(slug);
            }
        }
    }
    
    const checkServiceType = () => {
        let result:any = true;
        let authUser = localStorage.getItem("authUser");
        let jsonData: any = {};
        setDefaultLang();
        if (authUser) {
            jsonData = JSON.parse(authUser);
        }

        if (
            jsonData.person &&
            jsonData.person.company &&
            jsonData.person.company.type === "CargoOwner"
        ) {
            result = ServiceType.getChosen()
        }

        return result;
    }

    return (
        <BrowserRouter>
            <Helmet titleTemplate="%s | Go-Logs" defaultTitle="Go-Logs">
                <meta name="description" content="Go-Logs application" />
            </Helmet>

            <Switch>
                <Route
                    exact
                    path="/registration"
                    component={RegistrationPage}
                />
                <Route
                    exact
                    path="/registration/success"
                    component={RegistrationSuccessPage}
                />
                <Route path="/activationcode/:token" component={Activation} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/" component={LoginPage} />
                <Route authed={authUser} path="/home" component={HomePage} />
                <Route
                    authed={authUser}
                    path="/master_data"
                    component={PageOf(MasterDataPage)}
                />
                {/* Support page */}
                <Route path="/in-transit" component={PageOf(InTransit)} />
                {/* ========================================= */}
                {/* Master data routing */}
                <PrivateRoute
                    path="/order"
                    authed={authUser}
                    component={PageOf(OrderPage)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/do-request"
                    component={PageOf(RequestDO)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/delegate"
                    component={PageOf(Delegate)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/sp2-request"
                    component={PageOf(RequestSP2)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/custom-clearance-request"
                    component={PageOf(RequestCustomClearance)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/choose-service-type"
                    component={PageOf(ServiceTypePage)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/do-success"
                    component={PageOf(DOSuccess)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/do-delegate-success"
                    component={PageOf(DODelegateSuccess)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/sp2-delegate-success"
                    component={PageOf(SP2DelegateSuccess)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/add-service"
                    component={PageOf(AddService)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/transaction"
                    component={PageOf(Transaction)}
                />
                <PrivateRoute
                    authed={authUser}
                    path="/transaction/:tab"
                    component={PageOf(Transaction)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/draft"
                    component={PageOf(Draft)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/assign-order"
                    component={PageOf(AssignOrder)}
                />

                <PrivateRoute
                    authed={authUser}
                    path="/user-profile"
                    component={PageOf(UserProfile)}
                />

                <Route
                    exact
                    strict
                    path={[
                        "/companies/:id(\\d+)/:action*",
                        "/companies/:id(\\d+)?"
                    ]}
                    component={PageOf(Companies)}
                />
                <Route
                    exact
                    strict
                    path="/forwarder/:id/continue"
                    component={RequestForwarder}
                />
                <Route
                    exact
                    strict
                    path="/custom-clearance/:id"
                    render={({ match }) => { 
                        const id = match.params.id; 
                        let response: any = "";
                        if(id) {
                            response = (
                                <Redirect
                                    to={{
                                        pathname: "/custom-clearance-request/" + id
                                    }}
                                />
                            );
                        }
                        return response;
                    }}
                />
                <Route component={NotFoundPage} />
            </Switch>
            {!checkServiceType() && (
                <Redirect
                    to={{
                        pathname: "/choose-service-type"
                    }}
                />
            )}
            {/* </AuthProvider> */}
            <GlobalStyle />
        </BrowserRouter>
    );
}
