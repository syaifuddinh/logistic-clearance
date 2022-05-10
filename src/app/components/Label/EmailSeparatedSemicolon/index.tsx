import React from "react";
import { MiniMessage } from "../MiniMessage/Loadable";
import { GeneralTranslation } from "../../Translation/Loadable"

export default function EmailSeparatedSemicolon() {
    return <MiniMessage
        content={
            <>
                <GeneralTranslation slug="instruction.emailSeparatedBySemiColon" />
            </>
        }
    />
}
