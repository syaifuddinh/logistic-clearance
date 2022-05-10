import React, { useState } from "react";

interface Props {
    contents: any[];
    className?: string;
    activeSection?: number;
    onClick?: any;
};

export default function Milestone(props: Props) {
    const [activeSection, setActiveSection] = useState(props.activeSection);
    let contents = props.contents;
    const change = index => {
        return () => {
            setActiveSection(index + 1);
            if (props.onClick) {
                props.onClick(index + 1);
            }
        };
    };

    const showItem = (name, index, selected) => {
        const unchosenClass = "text-secondary";
        const chosenClass = "text-light bg-secondary";
        let bonusClass;
        if (selected) {
            bonusClass = chosenClass;
        } else {
            bonusClass = unchosenClass;
        }
        return (
            <span
                onClick={change(index)}
                className={
                    "px-4 py-1 text-capitalize rounded-medium text-center " + bonusClass
                }
                style={{ width: 100 / props.contents.length + "%" }}
            >
                <span className="d-none d-md-block fs-14px">{name}</span>
                <span className="d-block d-md-none fs-11px">{name}</span>
            </span>
        );
    };

    return (
        <div className={"w-100 " + props.className}>
            <div className="w-100 d-inline-block border border-secondary rounded-large">
                <div
                    className="d-flex font-poppins font-weight-light-bolder letter-spacing-3"
                >
                    {props.contents &&
                        props.contents.map((x, i) =>
                            showItem(x.name, i, i + 1 == activeSection)
                        )}
                </div>
            </div>
        </div>
    );
}
