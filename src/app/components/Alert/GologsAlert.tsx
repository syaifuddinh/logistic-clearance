import React from "react";
import { Alert } from "react-bootstrap";
import { GeneralTranslation } from "../Translation/Loadable";

interface Props {
    slug?: string;
    content?: any;
    variant?: string;
};

export default function GologsAlert(props: Props) {  
    return (
        <div
            className="d-flex justify-content-center position-fixed fixed-top"
            style={{marginTop : '3mm', zIndex : 10000}}
        >
            <Alert
                className="d-inline-block"
                variant={props.variant ? props.variant : "success"}
            >
                <div className="text-center font-weight-bold">
                    { props.content && (
                        <>
                            { props.content }
                        </>
                    ) }
                    { props.slug && !props.content && (
                        <>
                            <GeneralTranslation slug={props.slug} />
                        </>
                    ) }
                </div>
            </Alert>
        </div>
    );
}
