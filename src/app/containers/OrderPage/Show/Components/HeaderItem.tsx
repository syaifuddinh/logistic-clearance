import React from "react";

interface Props {
    title?: any;
    description?: string;
    offset?: number;
};

export default function HeaderItem(props: Props) {
    let offset = props.offset;
    if (!offset) {
        offset = 0;
    }

    return (
        <>
            <div>
                <div className={"mb-" + offset}>
                    <div 
                        className="text-muted text-capitalize fs-12px" 
                    >
                    {props.title}
                    </div>
                </div>

                <div>
                    <div className="fs-14px">{props.description}</div>
                </div>
            </div>
        </>
    );
}
