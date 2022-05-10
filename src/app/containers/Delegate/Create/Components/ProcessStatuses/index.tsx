import React from "react";
import GologsWizard from "../../../../../components/Milestone/GologsWizard";
import DeliveryOrder from "../../../../../../model/DeliveryOrder";
import SP2 from "../../../../../../model/SP2";

type IProps = {
    service: string;
};

export default function ProcessStatuses(props: IProps) {
    return (
        <div className="bg-white rounded-20px px-4 py-3">
            <div className="p-3">
                <GologsWizard
                    items={
                        props.service.toUpperCase() === "DO" ? DeliveryOrder.delegateStatuses : (props.service.toUpperCase() === "SP2" ? SP2.delegateStatuses : [])
                    }
                    step={0}
                />
            </div>
        </div>
    );
}
