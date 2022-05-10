import ServiceType from "./ServiceType";
import MAuth from "../endpoints/Auth";

const get = () => {
    let jsonData: any = {};
    let authUser = localStorage.getItem("authUser");
    if (authUser) {
        jsonData = JSON.parse(authUser);
    }

    return jsonData;
};

const getPerson = () => {
    let r: any = {};
    const jsonData = get();
    if (jsonData) {
        if (jsonData.person) {
            r = jsonData.person;
        }
    }

    return r;
};

const getCompany = () => {
    let r: any = {};
    const jsonData = getPerson();
    if (jsonData.company) r = jsonData.company;

    return r;
};

const getCompanyType = () => {
    let r: any = null;
    const jsonData = get();
    if (jsonData) {
        if (jsonData.person && jsonData.person.company) {
            r = jsonData.person.company.type;
        }
    }

    return r;
};

const getCompanyName = () => {
    let r: any = "";
    const jsonData = getCompany();
    if (jsonData) {
        if (jsonData.name) {
            r = jsonData.name;
        }
    }

    return r;
};

const getPersonName = () => {
    let r: any = null;
    const jsonData = get();
    if (jsonData) {
        if (jsonData.person) {
            r = jsonData.person.fullName;
        }
    }

    return r;
};

const getPersonPhone = () => {
    let r: any = null;
    const jsonData = get();
    if (jsonData) {
        if (jsonData.person) {
            r = jsonData.person.phone;
        }
    }

    return r;
};

const getPersonEmail = () => {
    let r: any = null;
    const jsonData = get();
    if (jsonData) {
        if (jsonData.person) {
            r = jsonData.person.email;
        }
    }

    return r;
};

const getNPWP = () => {
    let r: string = "";
    const jsonData = get();
    if (jsonData) {
        if (jsonData.person) {
            if (jsonData.person.company) {
                if (jsonData.person.company.npwp) {
                    r = jsonData.person.company.npwp;
                }
            }
        }
    }

    return r;
};

const logout = (isRedirect = true) => {
    localStorage.removeItem("authUser");
    ServiceType.removeChosen();
    if (isRedirect === true) window.location.href = "/login";
};

const bypassLogin = async () => {
    const fullPath = window.location.href;
    const doRequestPattern = /.*do-request\/.+/;
    const sp2RequestPattern = /.*sp2-request\/.+/;
    const customClearanceRequestPattern = /.*custom-clearance-request\/.+/;
    const customClearancePattern = /.*custom-clearance\/.+/;
    const findByBlPattern = /.*find-by-bl\/.+/;
    const orderPattern = /.*order\/.+/;
    const delegatePattern = /.*delegate\/.+/;
    const forwarderPattern = /.*forwarder\/.+/;
    let isBypass = false;
    let params: any = {}
    let role: any = "cargoOwner";
    const companyType = getCompanyType();
    isBypass = doRequestPattern.test(fullPath);
    if(!isBypass) {
      isBypass = findByBlPattern.test(fullPath);
    }
    if(!isBypass) {
      isBypass = findByBlPattern.test(fullPath);
    }
    if(!isBypass) {
      isBypass = sp2RequestPattern.test(fullPath);
    }
    if(!isBypass) {
      isBypass = delegatePattern.test(fullPath);
    }
    if(!isBypass) {
      isBypass = forwarderPattern.test(fullPath);
    }
    if(!isBypass) {
      isBypass = customClearanceRequestPattern.test(fullPath);
    }
    if(!isBypass) {
      isBypass = customClearancePattern.test(fullPath);
    }
    if (
      doRequestPattern.test(fullPath) === true || 
        sp2RequestPattern.test(fullPath) === true ||
        customClearanceRequestPattern.test(fullPath) === true ||
        customClearancePattern.test(fullPath) === true ||
        delegatePattern.test(fullPath) === true
    ) {
        role = "cargoOwner";
    } else if(findByBlPattern.test(fullPath) === true || orderPattern.test(fullPath) === true) {
        role = "shippingLine";
    } else if(forwarderPattern.test(fullPath) === true) {
        role = "forwarder";
      }
      
      if(role === "cargoOwner") {
        ServiceType.setChosen("import");
        if(isBypass === true && companyType && companyType !== "CargoOwner" && companyType !== "Forwarder") {
            logout(false);
        }
    } else if(role === "shippingLine") {
        if(isBypass === true && companyType && companyType !== "ShippingLine") {
            logout(false);
        }
        
    } else if(role === "forwarder") {
        if(isBypass === true && companyType && companyType !== "Forwarder") {
            logout(false);
        }
        
    }
    const jsonData = get();
    if(isBypass === true && !jsonData.person) {
        ServiceType.removeChosen();
        if(role == "cargoOwner") {
            params.email = "karnoto234@outlook.com";
            params.password = "GoLogs@123";
        } else if(role == "shippingLine") {
            params.email = "bambang.priantoro@outlook.com";
            params.password = "GoLogs@123";
        } else if(role == "forwarder") {
            params.email = "forwarder@outlook.com";
            params.password = "GoLogs@123";
        }
        await MAuth.login(params).then((data) => {
            document.cookie = "cookie=ok";
            localStorage.setItem("authUser", JSON.stringify(data.data));
        });
    }
}

const logoutIfExpired = async () => {
    let r: string = "";
    const today = new Date();
    let jsonData: any = null;
    let isRemember: boolean = false;
    jsonData = get();
    
    if(window.document.cookie) {
        isRemember = true;
    }
    if (jsonData) {
        if (jsonData.expires) {
            const expiredDate = new Date(jsonData.expires);
            if (today >= expiredDate) {
                logout();
            } else {
                if (isRemember === false) {
                    logout();
                }
            }
        }
    }
    await bypassLogin();

    return r;
};

const User = {
    get: get,
    getPersonName: getPersonName,
    getPersonEmail: getPersonEmail,
    getPersonPhone: getPersonPhone,
    getCompanyType: getCompanyType,
    getCompanyName: getCompanyName,
    getNPWP: getNPWP,
    getPerson: getPerson,
    getCompany: getCompany,
    logoutIfExpired: logoutIfExpired,
    logout: logout
};

export default User;
