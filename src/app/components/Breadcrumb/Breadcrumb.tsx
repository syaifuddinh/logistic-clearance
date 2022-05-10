import React from "react";
import { Breadcrumb as B } from "react-bootstrap";

interface Props {
    items: any;
}

export default function Breadcrumb(props: Props) {

    return (
        <>
            <div className="d-flex">
            <B className="pl-0">
                {props.items.map(x => (
                    <B.Item className="text-capitalize" href="#">
                    {x.name}
                    </B.Item>
                ))}
            </B>
            </div>
        </>
    );
}
