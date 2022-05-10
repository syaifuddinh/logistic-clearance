import React from "react";

interface Props {
    title?: string;
    description?: string;
    index?: number;
    allowed?: boolean;
    onClick?: any;
    className?: string;
}

export default function CustomTab(props: Props) {
    return (
        <>
            <div className="position-relative">
                <div
                    className={"py-3 pl-3 pr-1 d-flex " + props.className}
                    onClick={props.onClick}
                >
                    <div className="mr-2">
                        <div
                            className="fs-12px d-inline-flex justify-content-center align-items-center font-weight-bold bg-gray text-muted rounded-circle"
                            style={{
                                width: "6mm",
                                height: "6mm"
                            }}
                        >
                            {props.index}
                        </div>
                    </div>
                    <div>
                        <div className="font-weight-light-bolder fs-14px text-secondary">
                            {props.title}
                        </div>
                        <small className="text-sixth-gray fs-11px">
                            {props.description}
                        </small>
                    </div>
                </div>
                {!props.allowed === true && (
                    <div
                        className="cursor-not-allowed position-absolute w-100 h-100 rounded-40px bg-transparent"
                        style={{
                            left: 0,
                            top: 0,
                            zIndex: 50
                        }}
                    ></div>
                )}
            </div>
        </>
    );
}
