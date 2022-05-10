import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";

type IProps = {
    onChange?: any;
    value?: any;
    variant?: string;
    placeholder?: string;
    translation?: string;
    placeholderByTranslation?: boolean;
};

class GologsTextarea extends Component<IProps> {
    state = {
        id: "",
        isSelected: false,
        checked: false
    };

    getContent(props) {
        const { t } = useTranslation();
        
        const getPlaceholder = () => {
            let r:string = 
            t(translations.entities.general.enterMessageHere) +  "...";
            
            return r;
        }
        
        return (
            <Form.Control
                value={props.value}
                onChange={props.onChange}
                placeholder={getPlaceholder()}
                as="textarea"
                rows={3}
            />
        );
    }

    render() {
        return (
            <>
                <this.getContent 
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </>
        );
    }
}

export default GologsTextarea;
