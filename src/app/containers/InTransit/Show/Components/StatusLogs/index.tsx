import React, { Component } from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import GologsWizard from "../../../../../components/Milestone/GologsWizard";

type IData = {
    label: any;
    value: any;
};

type IProps = {
    data: IData[];
    statusPosition: number;
};

export default class StatusLogs extends Component<IProps> {
    state = {
        data: []
    };

    constructor(props) {
        super(props);
        setTimeout(() => {
            let data: any = this.state.data;
            data = this.props.data.map(v => {
                let r: any = {};
                r.customTitle = (
                    <div className="fs-12px text-capitalize mb-2 mt-4 font-weight-light-bold">
                        {v.label}
                    </div>
                );
    
                r.customSubtitle = (
                    <div className="fs-12x text-primary-gray d-flex justify-content-center">
                        <div className="w-100px text-center">
                            {v.value}
                        </div>
                    </div>
                );
    
                return r;
            })
    
            
            this.setState({data : data});
        }, 400)
    }
    
    render() {
        return (
            <div className="bg-white py-4 px-4 rounded-20px w-100 ">
                <GeneralTranslation
                    slug="status"
                    className="d-block fs-16px text-capitalize"
                />

                <div className="mt-3 d-flex justify-content-center w-100">
                    <GologsWizard
                        type="secondary"
                        hideImage={true}
                        items={this.state.data}
                        rectangleWidth={11}
                        step={this.props.statusPosition - 1}
                    />
                </div>
            </div>
        );
    }
}