import React from "react";
import { Stepper } from "../../../../../components/Milestone/Stepper/Loadable";
import DeliveryOrder from "../../../../../../model/DeliveryOrder";

type IProps = {
    step: number;
};

export default function Instructions(props: IProps) {
    return (
        <>
            <Stepper
                step={props.step}
                items={DeliveryOrder.delegateInstructions}
            />
        </>
    );
}
