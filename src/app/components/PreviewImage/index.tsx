import React from "react";
import { GologsButton } from "../Button/Loadable";
import { GologsImage } from "../Image/Loadable";

type IProps = {
    url: string;
    alt?: string;
}

export default function PreviewImage(props: IProps) {
    const onPreview = () => {
        window.open(props.url, "_blank");
    }
    
    return (
        <>
            {props.url && (
                <img
                    src={props.url}
                    className="rounded w-100"
                    alt={props.alt}
                />
            )}

            {!props.url && (
                <GologsImage name="noPreview.png" className="rounded w-100" />
            )}

            <div className="mt-2 d-flex justify-content-end">
                <GologsButton
                    variant="link-dark"
                    icon="darkEye.svg"
                    size="mini"
                    onClick={onPreview}
                />

                <GologsButton
                    variant="link-dark"
                    icon="darkDownload.svg"
                    size="mini"
                    onClick={onPreview}
                />
            </div>
        </>
    );
}
