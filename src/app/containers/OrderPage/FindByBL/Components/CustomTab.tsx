import React from "react";

interface Props {
    title?: string;
    description?: string;
    index?: number;
    allowed?: boolean;
    onClick?: any;
    className?: string;
};

export default function CustomTab(props: Props) {
    return (
        <>
            <div className="position-relative">

                <div
                    className={"py-3 pl-3 pr-1 d-flex " + props.className}
                    onClick={props.onClick}
                >
                    <div>
                        <div className="font-weight-light-bolder fs-14px text-secondary">
                            {props.title}
                        </div>
                        <small className="text-sixth-gray fs-11px">
                            {props.description}
                        </small>
                    </div>

                </div>
            </div>
        </>
    );
}
