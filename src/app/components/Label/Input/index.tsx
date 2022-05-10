import React from "react";
import { GeneralTranslation } from "../../Translation/Loadable"
import { RedAsterisk } from "../../RedAsterisk/Loadable"

type IProps = {
    translationSlug?: string;
    showAsterisk?: boolean;
}

export default function InputLabel(props: IProps) {
    return (
        <div className="mb-3">
            {props.translationSlug && (
                <GeneralTranslation slug={props.translationSlug} className="text-capitalize" />
                )}
            {props.showAsterisk === true && (
                <RedAsterisk />
            )}
        </div>
    );
}
