import React from "react";

type IData = {
    label: any;
    value: any;
    className?: string;
}

type IProps = {
    data: IData[];
}

export default function Summary(props: IProps) {   
    return (
        <div className="bg-white py-4 px-4 rounded-20px w-100 d-flex justify-content-between">
            { props.data.map((v, i) => (
                <div key={"items" + i} className={"px-3 " + (v.className ? v.className : "")}>
                    <div className="fs-12px text-capitalize mb-2">
                        { v.label }
                    </div>
                    <div className="fs-14px font-weight-light-bolder">
                        { v.value }
                    </div>
                </div>
            )) }
        </div>
    );
}