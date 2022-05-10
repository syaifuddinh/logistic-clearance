import React from "react";
import { GologsButton } from "../../../../components/Button/Loadable";

export default function ExportButton() {

    return (
        <>
            <GologsButton
                contentByTranslation={true}
                translation="export"
                size="extra-small"
                variant="success"
            />
        </>
    );
}
