import React from "react";

export default function RedAsterisk() {
    return (
        <span
            className="text-danger font-weight-more-bolder ml-1 d-inline-block"
            style={{transform: "scale(1.6, 1.6)"}}
        >
            *
        </span>
    );
}
