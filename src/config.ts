import { config } from "dotenv";
import User from "./model/User";

config();

export default {
    app: {
        id: process.env.REACT_APP_ID,
        name: process.env.npm_package_name,
        url: process.env.REACT_APP_URL,
        isDevelopment: process.env.REACT_APP_ENV === "development"
    },

    urls: {
        graphqlServer: process.env.REACT_APP_ENV,
        identityServer: process.env.REACT_APP_URLS_IDENTITY_SERVER,
        nlaBeacukaiServer:
            process.env.NLA_BEACUKAI_SERVER ||
            "https://esbbcext01.beacukai.go.id:9081/NLEMICROAPI-1.0/webresources/ceisa/kontainerbc20All",
        defaultGologServer:
            process.env.DEFAULT_GOLOG_SERVER || "http://13.213.73.45:4200",
        mixGologServer:
            process.env.MIX_GOLOG_SERVER ||
            "https://mix-dot-go-logs-304513.et.r.appspot.com",
        alternateServer:
            process.env.ALTERNATE_SERVER || "http://localhost:8888",
        shippingLineServer:
            process.env.SHIPPING_LINE_SERVER || "http://13.213.73.45:3700",
        sp2Server: process.env.SP2_SERVER || "http://13.213.73.45:3500",
        customClearanceServer:
            process.env.CUSTOM_CLEARANCE_SERVER || "http://13.213.73.45:4050",
        delegateNotificationServer:
            process.env.DELEGATE_NOTIFICATION_SERVER || "http://13.213.73.45:4100",
        masterServer: {
            inTransit:
                process.env.IN_TRANSIT_SERVER || "http://13.213.73.45:3811/api",
            port: process.env.SEA_PORT_SERVER || "http://13.213.73.45:3809/api",
            seaPort:
                process.env.SEA_PORT_SERVER || "http://13.213.73.45:3801/api",
            shippingLine:
                process.env.SEA_PORT_SERVER || "http://13.213.73.45:3802/api",
            shippingAgent:
                process.env.SHIPPING_AGENT_SERVER ||
                "http://13.213.73.45:3803/api",
            businessType:
                process.env.BUSINESS_TYPE_SERVER ||
                "http://13.213.73.45:3804/api",
            moduleGroup:
                process.env.MODULE_GROUP_SERVER ||
                "http://13.213.73.45:3808/api",
            container:
                process.env.CONTAINER_SERVER || "http://13.213.73.45:3805/api",
            depo: process.env.DEPO_SERVER || "http://13.213.73.45:3806/api",
            module: process.env.MODULE_SERVER || "http://13.213.73.45:3807/api",
            contract:
                process.env.CONTRACT_SERVER || "http://13.213.73.45:3810/api"
        },
        authServer: process.env.AUTH_SERVER || "http://13.213.73.45:3000"
    },
    headerBase: () => {
        User.logoutIfExpired();
        let authUser: any = localStorage.getItem("authUser");
        let headers: any = {};
        if (authUser) {
            authUser = JSON.parse(authUser);
            headers["Authorization"] =
                authUser.tokenType + " " + authUser.accessToken;
        }

        return headers;
    }
};
