import React from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";

export default class SP2ProformaInvoice extends React.Component {
   
    getHeader () {
        const { t } = useTranslation();
        
        return (
            <>
                <Helmet>
                    <title>{t(translations.entities.general.proformaInvoice)}</title>
                </Helmet>
                <Sidebar
                    header-name={t(translations.entities.general.proformaInvoice)}
                    subtitle={<GeneralTranslation slug="proformaInvoice" />}
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
                        src="http://test.go-logs.com/getProforma.php?proforma=202011180145"
                        className="w-100 h-800px"
                    ></iframe>
                </div>
            </>
        );
    }
}
