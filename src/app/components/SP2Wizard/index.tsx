import React from "react";
import BottomWizard from "./Request";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../Sidebar/Loadable";
import { GeneralTranslation } from "../Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";

export default class Index extends React.Component {
    state = {
        id: null
    };

    constructor(props) {
        super(props);
        if (props.match) {
            const id = props.match.params.id;
            if (id) {
                this.changeState("id", id);
            }
        }
    }

    changeState = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    };
    
    getContent = (props) => {
        return (
            <>
                <BottomWizard 
                    requestStep={0}
                    statusStep={0}
                    isDocumentFound={false}
                    id={props.id}
                />
                <br />
            </>
        );
    }

    getHeader () {
        const { t } = useTranslation();
        
        return (
            <>
                <Helmet>
                    <title>{t(translations.sidebarMenu.SP2Request)}</title>
                </Helmet>
                <Sidebar
                    header-name={<GeneralTranslation slug="SP2.title" />}
                    subtitle={<GeneralTranslation slug="fillOutForm" />}
                />
            </>
        );
    }
    
    render () {
        return (
            <>
                <this.getHeader />
                <div className="gologs-container">
                    <this.getContent 
                        id={this.state.id}
                    />
                </div>            
            </>
        )
    }
}
