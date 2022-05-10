/* eslint-disable no-console */
import axios from "axios";
import config from "../config";

const getProfile = async npwp => {
    return await axios.get(
        `${config.urls.authServer}/api/NLE/GetCustomer?npwp=${npwp}`
    );
};

const getUserByNPWP: any = async npwp => {
    let person: any = null;
    let dt: any = null;
    let r: any = {
        companyName: ""
    };

    try {
        dt = await getProfile(npwp);
        dt = dt.data
        if(dt.company_name) {
            r.companyName = dt.company_name
        } else {
            if(dt.person) {
                person = dt.person;
                if(person.company) {
                    if(person.company.name) {
                        r.companyName = person.company.name;
                    }
                }
            }
        }
    } catch(e) {
        throw Error(e)
    }
    return r;
}


const Auth = {
    getProfile: getProfile,
    getUserByNPWP: getUserByNPWP,
    registration: async data => {
        const headers = {
            "Content-Type": "application/json"
        };
        return await axios.post(
            `${config.urls.authServer}/api/NLE/Registration`,
            data,
            {
              headers: headers
            }
        );
    },
    login: async data => {
        const headers = {
            "Content-Type": "application/json"
        };
        return await axios.post(`${config.urls.authServer}/api/Auth/login`, data, {
            headers: headers
        });
    },
    activation: async code => {
        return await axios.get(
            `${config.urls.authServer}/api/Email/Activation?activationCode=${code}`
        );
    },
    getToken: async () => {
        return await axios.get(`${config.urls.authServer}/api/NLE/GetAuthToken`);
    }
};

export default Auth;
