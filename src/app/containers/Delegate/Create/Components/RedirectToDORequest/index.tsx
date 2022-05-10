import React from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { Anchor } from "../../../../../components/Anchor/Loadable";

type IProps = {
    service: string;
}

export default function RedirectToDORequest(props: IProps) {
    return (
        <div className="fs-16px">
            <GeneralTranslation
                slug="prompt.contractNumberIsNotExist"
                className="mr-1"
            />

            {props.service === "DO" && (
                <Anchor
                    slug="instruction.fillDORequest"
                    pathname="/do-request/create"
                />
            )}
            {props.service === "SP2" && (
                <Anchor
                    slug="instruction.fillSP2Request"
                    pathname="/sp2-request/create"
                />
            )}
        </div>
    );
}
