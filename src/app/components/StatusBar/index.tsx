import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type IList = {
    slug?: any;
    name: any;
};

interface Props {
    activeSection: number;
    subtitle?: any;
    list: IList[];
};

export default function StatusBar(props: Props) {
    let sections: number[] = [];
    let activePoint: string = "";
    for (let i = 0; i < props.list.length; i++) {
        sections.push(i + 1);
    }

    if(props.activeSection > 0) {
        let actived: any = props.list.find(
            (x, i) => i == props.activeSection - 1
        );
        if (actived) {
            activePoint = actived.name;
        }
    } else {
        activePoint = "Draft";
    }

    return (
        <>
            <div>
                <span className="d-inline-block mb-2 text-center w-100">
                    {activePoint}
                </span>{" "}
            </div>
            <div className="d-flex flex-column justify-content-center position-relative w-100 ">
                <div
                    className="d-flex justify-content-between"
                    style={{ zIndex: 10 }}
                >
                    {props.list.length &&
                        sections
                        .map((x, i) => {
                            let result: any = x;
                            let colorClass: string = "bg-gray";
                            if (
                                props.activeSection &&
                                x <= props.activeSection
                            ) {
                                result = (
                                    <span style={{ fontSize: "1.7mm" }}>
                                        <FontAwesomeIcon icon={faCheck} />{" "}
                                    </span>
                                );
                                colorClass = "bg-primary text-white";
                            }
                            return (
                                <>
                                    <div
                                        style={{
                                            width: "4.8mm",
                                            height: "4.8mm",
                                            fontSize: "2.3mm",
                                            zIndex: 10
                                        }}
                                        className={
                                            "font-weight-bold d-inline-flex justify-content-center align-items-center rounded-circle " +
                                            colorClass
                                        }
                                    >
                                        {result}
                                    </div>
                                    {i < props.list.length - 1 && (
                                        <hr
                                            className={
                                                "pull-left position-absolute " +
                                                (i < props.activeSection - 1
                                                    ? "border-primary"
                                                    : "border-gray")
                                            }
                                            style={{
                                                width:
                                                    100 /
                                                        (props.list.length -
                                                            1) +
                                                    "%",
                                                top: "-40%",
                                                left:
                                                    (100 /
                                                        (props.list.length -
                                                            1)) *
                                                        i +
                                                    "%"
                                            }}
                                        />
                                    )}
                                </>
                            );
                        })}
                </div>
            </div>
            
            { props.subtitle && (
                <div>
                    <span className="d-inline-block mt-2 text-center w-100">
                        {props.subtitle}
                    </span>{" "}
                </div>
            ) }
        </>
    );
}
