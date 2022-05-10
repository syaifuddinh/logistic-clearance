import React, { Component } from "react";
import Gologs from "../../../model/Gologs";
import { GeneralTranslation } from "../Translation/Loadable";

type IProps = {
    className?: string;
}

export default class CustomerServiceInfo extends Component<IProps> {
    render() {
        return (
            <div className={this.props.className ? this.props.className : ""}>
                <div>
                    <GeneralTranslation
                        slug="ifYouHaveAnyTroubles"
                        className="mr-1"
                    />
                </div>
                <div>
                    <span className="mr-1 text-second-secondary">
                        {Gologs.customerServiceEmail}
                    </span>
                    <GeneralTranslation slug="or" className="mr-1" />
                    <GeneralTranslation slug="callUs" className="mr-1" />

                    <GeneralTranslation slug="at" className="mr-1" />

                    <span className="mr-1 text-second-secondary">
                        {Gologs.customerServicePhone}
                    </span>
                </div>
            </div>
        );
    }
}
