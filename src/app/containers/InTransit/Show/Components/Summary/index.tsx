import React from "react";

type IData = {
    label: any;
    value: any;
}

type IProps = {
    data: IData[];
}

export default class Summary extends React.Component<IProps> {
    
    render() {
        return (
            <div className="bg-white py-4 px-4 rounded-20px w-100 d-flex justify-content-between">
                { this.props.data.map(v => (
                    <>
                        <div className="px-3">
                            <div className="fs-12px text-capitalize mb-2">
                                { v.label }
                            </div>
                            <div className="fs-14px font-weight-light-bolder">
                                { v.value }
                            </div>
                        </div>
                    </>
                )) }
            </div>
        );
    }
}