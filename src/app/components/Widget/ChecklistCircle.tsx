import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ChecklistCircle(props) {

    return (
        <>
            <div 
                className={props.className ? props.className : ""} 
                style={props.style ? props.style : {}}
            >
                <div className="w-32px h-32px position-relative radius-20px bg-primary d-inline-flex justify-content-center align-items-center border-2 border-white">
                    <span className="text-white fs-14px">
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                </div>
            </div>
        </>
    );
}
