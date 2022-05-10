import React, { Component } from "react";
import { Form } from "react-bootstrap";
import {
    CMark
} from "../../../../styles/WizardBottom";
import iCheck from "../../../../assets/icons/check.svg";

type IProps = {
    onChange?: any;
    checked?: boolean;
    value?: any;
    variant?: string;
};

class GologsCheckbox extends Component<IProps> {
    state = {
        id : "",
        isSelected : false,
        checked : false
    };

    componentDidMount() {
        let id = Math.round(Math.random() * 999999999) 
        this.setState({id : id})
        this.setState({checked : this.props.checked ? true : false})

    }

    onInputChecked = () => {
        let el:any = window.document.getElementById(this.state.id)
        this.setState({checked : el.checked})

    }


    render() {
        return (
            <>
                {this.props.variant == "primary" && (
                    <>
                        <label
                            htmlFor={this.state.id}
                            className={"d-inline-flex justify-content-center align-items-center w-24px h-22px rounded-4px position-relative border-primary border-2px " + (this.state.checked ? "bg-primary" : "")}
                        >
                            <CMark src={iCheck} show={this.state.checked} />
                        </label>
                    </>
                )}
                <Form.Check
                    type="checkbox"
                    id={this.state.id}
                    className={!(!this.props.variant || this.props.variant == "default") ? "d-none" : ""}
                    checked={this.props.checked}
                    value={this.props.value}
                    onChange={(e) => {
                        this.onInputChecked()
                        this.props.onChange(e);
                    }}
                />

            </>
        );
    }
}

export default GologsCheckbox;
