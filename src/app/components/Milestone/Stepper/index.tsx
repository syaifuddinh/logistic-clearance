import React from "react";
import {  RowX, ItemTitle } from "../../../../styles/Wizard";
import {
    CircleInner,
    CircleOuter,
    Rectangle,
    CMark
} from "../../../../styles/WizardBottom";
import iCheck from "../../../../assets/icons/check.svg";
import { GeneralTranslation } from "../../Translation/Loadable";

type IItems = {
    slug?: string;
    name?: string;
};

interface Props {
    items: IItems[];
    step: number;
};

export default function Stepper(props: Props) {
    return (
        <RowX className="">
        {
            props.items &&
                props.items.map((v, i) => (
                <div
                    className={"d-flex flex-column " + (i == 0 || i == props.items.length - 1 ? "w-50" : "w-100")}
                    key={"item" + i}
                >
                    <div className={"d-flex position-relative align-items-center justify-content-center " + (i == 0 ? "" : (i == props.items.length - 1 ? "" : ""))}>
                    { i != 0 && (
                        <Rectangle
                            show={i == 0 ? false : true}
                            active={i <= props.step}
                            className={"w-50"}
                            style={i == props.items.length - 1 ? {right: "50%"} : {left: 0}}
                        />
                    ) }
                    <CircleOuter active={i <= props.step}>
                        <CMark 
                            src={iCheck} 
                            show={i < props.step} 
                        />
                        <CircleInner show={i == props.step} />
                    </CircleOuter>
                    { i != props.items.length - 1 && (
                        <Rectangle
                            show={i == props.items.length - 1 ? false : true}
                            active={i < props.step}
                            className={"w-50"}
                            style={i == 0 ? {left: "50%"} : {left: "50%"}}
                        />
                    ) }
                    </div>
                    <ItemTitle className="text-capitalize fs-11px md-fs-15px">
                    {v.slug ? <GeneralTranslation slug={v.slug} /> : v.name}
                    </ItemTitle>
                </div>
                ))
        }
        </RowX>
    );
}
