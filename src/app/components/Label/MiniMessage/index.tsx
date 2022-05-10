import React from "react";
import { GeneralTranslation } from "../../Translation/Loadable";

type IProps = {
    content?: any;
    messageSlug?: string;
}

export default function MiniMessage(props: IProps) {
    return (
        <div className="fs-10px mt-1">
            <span>*</span>
            {props.content && props.content}
            {props.messageSlug && <GeneralTranslation slug={props.messageSlug} />}
        </div>
    );
}
