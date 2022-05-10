import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";

export default class CustomClearanceGatePass extends React.Component {
   

    getHeader () {
        const { t } = useTranslation();
        
        return (
            <>
                <Helmet>
                    <title>{t(translations.entities.general.gatePass)}</title>
                </Helmet>
                <Sidebar
                    header-name={t(translations.entities.general.gatePass)}
                    subtitle={<GeneralTranslation slug="gatePass" />}
                />
            </>
        );
    }
    
    render() {
        return (
            <>
                <this.getHeader />
                <div className="gologs-container pb-4">
                    <iframe
                        src="http://test.go-logs.com/getGatePass.php?123123"
                        className="w-100 h-800px"
                    ></iframe>
                </div>
            </>
        );
    }
}
