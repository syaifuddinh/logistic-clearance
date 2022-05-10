import React, { Component } from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsIcon } from "../Icon/Loadable";
import { Title } from "../../../styles/Header";


type IProps = {
    variant?:string;
}

export default class Backward extends Component<IProps> {

    constructor(props) {
        super(props);
    }

    getClassName() {
        let r:string = "";

        return r;
    }

    backward() {
        window.history.back();
    }

    render() {
        return (
            <span onClick={this.backward} className={"d-inline-flex align-items-center " + this.getClassName()}>
                <span className="mr-2">
                    <GologsIcon 
                        width={30}
                        name="arrowLeft.svg" 
                    />
                </span>
                <div className="font-weight-bold md-fs-32px fs-24px">
                    <GeneralTranslation slug="back" />
                </div>
            </span>
        );
    }
}
