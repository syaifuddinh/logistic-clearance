import React from "react";
import { translations } from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Container } from "../../../styles/Menu";
import { Order as ShippingLineOrderMenu } from "./Components/ShippingLine/Order/Loadable";
import { Order as ForwarderOrderMenu } from "./Components/Forwarder/Order/Loadable";
import MenuLink from "./MenuLink";
import GologsLogout from "../Header/Components/GologsLogout";

export default function Menu() {
    const { t } = useTranslation();

    const CargoOwner = () => {
        return (
            <>
                <MenuLink
                    title={t(translations.sidebarMenu.dashboard)}
                    icon={require("../../../assets/icons/dashboard.svg")}
                    active={false}
                    hasChild={false}
                    child={false}
                    url="/home"
                />
                <MenuLink
                    title={"Order"}
                    icon={require("../../../assets/icons/order.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                        <>
                            <MenuLink
                                title={"Assign Order"}
                                icon={require("../../../assets/icons/assign-order.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/delegate/create"
                            />
                            <MenuLink
                                title={"My Transaction"}
                                icon={require("../../../assets/icons/draft.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/delegate/list"
                            />
                        </>
                    }
                />
                <MenuLink
                    title={t(translations.sidebarMenu.doOnline)}
                    icon={require("../../../assets/icons/do.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                        <>
                            <MenuLink
                                title={t(translations.sidebarMenu.doRequest)}
                                icon={require("../../../assets/icons/requestdo.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/do-request/create"
                            />
                            <MenuLink
                                title={t(
                                    translations.sidebarMenu.myTransaction
                                )}
                                icon={require("../../../assets/icons/mytransaction.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/transaction"
                            />
                        </>
                    }
                />

                <MenuLink
                    title={t(translations.sidebarMenu.SP2)}
                    icon={require("../../../assets/icons/sp2.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                        <>
                            <MenuLink
                                title={t(translations.sidebarMenu.SP2Request)}
                                icon={require("../../../assets/icons/requestdo.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/sp2-request/create"
                            />
                            <MenuLink
                                title={t(
                                    translations.sidebarMenu.myTransaction
                                )}
                                icon={require("../../../assets/icons/mytransaction.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/sp2-request"
                            />
                        </>
                    }
                />

                <MenuLink
                    title={t(translations.sidebarMenu.customClearance)}
                    icon={require("../../../assets/icons/requestdo.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                        <>
                            <MenuLink
                                title={t(
                                    translations.sidebarMenu.customClearance
                                )}
                                icon={require("../../../assets/icons/requestdo.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/custom-clearance-request/create"
                            />
                            <MenuLink
                                title={t(
                                    translations.sidebarMenu.myTransaction
                                )}
                                icon={require("../../../assets/icons/mytransaction.svg")}
                                active={false}
                                hasChild={false}
                                child={true}
                                url="/custom-clearance-request"
                            />
                        </>
                    }
                />
            </>
        );
    };

    const Forwarder = () => {
        return (
            <>
                <MenuLink
                    title={t(translations.sidebarMenu.dashboard)}
                    icon={require("../../../assets/icons/dashboard.svg")}
                    active={false}
                    hasChild={false}
                    child={false}
                    url="/home"
                />

                <MenuLink
                    title={t(translations.sidebarMenu.doOnline)}
                    icon={require("../../../assets/icons/do.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                    <>
                        <MenuLink
                            title={t(translations.sidebarMenu.myTransaction)}
                            icon={require("../../../assets/icons/mytransaction.svg")}
                            active={false}
                            hasChild={false}
                            child={true}
                            url="/transaction"
                        />
                    </>
                    }
                />

                <MenuLink
                    title={t(translations.sidebarMenu.SP2)}
                    icon={require("../../../assets/icons/sp2.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                    <>
                        <MenuLink
                            title={t(translations.sidebarMenu.myTransaction)}
                            icon={require("../../../assets/icons/mytransaction.svg")}
                            active={false}
                            hasChild={false}
                            child={true}
                            url="/sp2-request"
                        />
                    </>
                    }
                />
            </>
        );
    };

    const ShippingLine = () => {
        return (
            <>
                <MenuLink
                    title={t(translations.sidebarMenu.dashboard)}
                    icon={require("../../../assets/icons/dashboard.svg")}
                    active={false}
                    hasChild={false}
                    child={false}
                    url="/home"
                />
                
                <ShippingLineOrderMenu />
            </>
        );
    };
    
    const Support = () => {
        return (
            <>
                <MenuLink
                    title={t(translations.sidebarMenu.inTransit)}
                    icon={require("../../../assets/icons/order.svg")}
                    active={false}
                    hasChild={false}
                    child={false}
                    url="/in-transit"
                />
            </>
        );
    };

    const Admin = () => {
        return (
            <>
                <MenuLink
                    title={t(translations.sidebarMenu.masterData)}
                    icon={require("../../../assets/icons/greenDatabase.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                        <>
                            <MenuLink
                                title={t(translations.sidebarMenu.shippingLine)}
                                icon={require("../../../assets/icons/colorfulShippingline.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/shipping_line"
                            />
                            <MenuLink
                                title={t(
                                    translations.sidebarMenu.shippingAgent
                                )}
                                icon={require("../../../assets/icons/colorfulAgent.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/shipping_agent"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.depo)}
                                icon={require("../../../assets/icons/colorfulDepo.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/depo"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.container)}
                                icon={require("../../../assets/icons/colorfulContainer.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/container"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.port)}
                                icon={require("../../../assets/icons/colorfulPort.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/port"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.businessType)}
                                icon={require("../../../assets/icons/colorfulSuitcase.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/business_type"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.modulesGroup)}
                                icon={require("../../../assets/icons/colorfulModule.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/modules_group"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.modules)}
                                icon={require("../../../assets/icons/oceanCube.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/modules"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.contract)}
                                icon={require("../../../assets/icons/oceanLetter.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/contract"
                            />
                            <MenuLink
                                title={t(translations.entities.general.rateByContract)}
                                icon={require("../../../assets/icons/oceanLetter.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/rate_by_contract"
                            />
                            <MenuLink
                                title={t(translations.entities.general.ratePlatformFee)}
                                icon={require("../../../assets/icons/oceanLetter.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/rate_platform_fee"
                            />
                            <MenuLink
                                title={t(translations.entities.general.transaction)}
                                icon={require("../../../assets/icons/oceanLetter.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/transaction"
                            />
                            <MenuLink
                                title={t(translations.entities.general.transactionType)}
                                icon={require("../../../assets/icons/oceanLetter.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/transaction_type"
                            />
                            <MenuLink
                                title={t(translations.sidebarMenu.credit)}
                                icon={require("../../../assets/icons/sunriseWallet.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/credit"
                            />
                            <MenuLink
                                title={t(
                                    translations.sidebarMenu.menuManagement
                                )}
                                icon={require("../../../assets/icons/colorfulMenu.svg")}
                                hasChild={false}
                                child={true}
                                url="/master_data/menu_management"
                            />
                        </>
                    }
                />

                <MenuLink
                    title={t(translations.sidebarMenu.userManagement)}
                    icon={require("../../../assets/icons/colorfulProfile.svg")}
                    active={false}
                    hasChild={true}
                    child={false}
                    url="#"
                    children={
                        <>
                            <MenuLink
                                title={t(translations.sidebarMenu.userRole)}
                                hasChild={false}
                                child={true}
                                url="/user_management/user_role"
                            />

                            <MenuLink
                                title={t(
                                    translations.sidebarMenu
                                        .userRoleConfiguration
                                )}
                                hasChild={false}
                                child={true}
                                url="/user_management/user_role_configuration"
                            />

                            <MenuLink
                                title={t(translations.sidebarMenu.user)}
                                hasChild={false}
                                child={true}
                                url="/user_management/user"
                            />

                            <MenuLink
                                title={t(translations.sidebarMenu.userLog)}
                                hasChild={false}
                                child={true}
                                url="/user_management/userLog"
                            />
                        </>
                    }
                />
            </>
        );
    };

    let authUser = localStorage.getItem("authUser");
    let jsonData: any = {};
    if (authUser) {
        jsonData = JSON.parse(authUser);
    }
    return (
        <div>
            <Container>
                {jsonData.person &&
                jsonData.person.company &&
                jsonData.person.company.type === "CargoOwner" ? (
                    <CargoOwner />
                ) : null}

                {jsonData.person &&
                jsonData.person.company &&
                jsonData.person.company.type === "Forwarder" ? (
                    <Forwarder />
                ) : null}

                {jsonData.person &&
                jsonData.person.company &&
                jsonData.person.company.type === "ShippingLine" ? (
                    <ShippingLine />
                ) : null}

                {jsonData.person &&
                jsonData.person.company &&
                (jsonData.person.company.type === "Support" ||
                    jsonData.person.company.type === "Admin") ? (
                    <Support />
                ) : null}

                {jsonData.person &&
                jsonData.person.company &&
                (jsonData.person.company.type === "Admin" ||
                    jsonData.person.company.type === "Support") ? (
                    <Admin />
                ) : null}
                <GologsLogout />
            </Container>
        </div>
    );
}
