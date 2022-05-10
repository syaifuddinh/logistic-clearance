import React, { Component } from "react";
import { GeneralTranslation } from "../../Translation/Loadable";
import { GologsIcon } from "../../Icon/Loadable";

type IProps = {
    value: string;
    className?: string;
};

export default class CopyButton extends Component<IProps> {
    state = {
        isShowMessage: false
    };
    
    copy = () => {
        let input: any = document.createElement("textarea");
        input.value = this.props.value;
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        this.setState({isShowMessage : true})
        setTimeout(() => {
            this.setState({isShowMessage : false})
        }, 2000);
    }

    render() {
        return (
            <div
                onClick={this.copy}
                className={"d-inline-block " + (this.props.className ? this.props.className : "")}
            >
                <div className="d-flex align-items-center">
                    <GologsIcon 
                        width={24}
                        height={24}
                        name="purpleCopy.svg"
                    />
                    <GeneralTranslation
                        slug="copy"
                        className="ml-2 fs-24px text-second-primary font-weight-light-bolder d-block"
                    />
                </div>
                { 
                    this.state.isShowMessage && (
                        <div className="mt-1 w-100 bg-primary text-white px-2 py-1 fs-10px rounded-8px font-weight-light-bolder text-center">
                            <GeneralTranslation slug="copied" />
                        </div>
                    )
                }
            </div>
        );
    }
}
