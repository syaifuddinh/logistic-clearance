import React from "react";
import BottomWizard from "./RequestBL";
import { GeneralTranslation } from "../Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/i18n";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../Sidebar/Loadable";

export default class Index extends React.Component {
    state = {
        id: null
    };
    
    constructor(props) {
        super(props);
        if (props.match) {
            const id = props.match.params.id;
            if (id) {
                this.changeState("id", id)
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
                    id={props.id}
                    email=""
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
                    <title>{t(translations.requestDO.title)}</title>
                </Helmet>
                <Sidebar
                    header-name={t(translations.requestDO.title)}
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
