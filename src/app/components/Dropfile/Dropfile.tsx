import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { ReactDropzoneStyles } from "../../../styles/Wizard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";

import { translations } from "../../../locales/i18n";
import { useTranslation } from "react-i18next";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsIcon } from "../Icon/Loadable";
import { GologsImage } from "../Image/Loadable";
import { PopupMessage } from "../PopupMessage/Loadable";
import { MiniMessage } from "../Label/MiniMessage/Loadable";


interface Props {
    onDrop?: any;
    showLoading?: boolean;
    showOnlyImageMessage?: boolean;
    onDelete?: any;
    fileName?: any;
    file?: any;
    hideRemoveButton?: boolean;
    isPreview?: boolean;
    mimeType?: string[];
}

export default function Dropfile(props: Props) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const onDrop = async acceptedFiles => {
        let i: number = 0;
        let fileIdx: number = 0;
        let regexImage: any = null;
        let mimeType: string = "";
        let fileMimeType: string = "";
        try {
            if(props.mimeType) {
                for(i = 0; i < props.mimeType.length;i++) {
                    mimeType = props.mimeType[i];
                    regexImage = new RegExp(".*" + mimeType + ".*");
                    for(fileIdx = 0;fileIdx < acceptedFiles.length;fileIdx++) {
                        fileMimeType = acceptedFiles[fileIdx].type;
                        if (!regexImage.test(fileMimeType)) {
                            setShowModal(true);
                            throw new Error("Invalid mime type");
                        }
                    }
                }
            }
            props.onDrop(acceptedFiles);
        } catch(e) {

        }
    };

    const onView = () => {
        if (props.file) {
            let url: any = null;;
            if (typeof props.file == "string") {
                url = props.file;
            } else {
                url = window.URL.createObjectURL(props.file)
            }
            let link = document.createElement("a")
            link.href = url
            link.target = "_blank"
            if (props.fileName) {
                link.download = props.fileName
            }

            link.click()
        }
    }
    
    const onDelete = () => {
        if (props.onDelete) {
        props.onDelete();
        }
    };

    const getExtension = () => {
        let result = "file"
        if (props.file) {
            let ext = props.file.type
            if (ext) {
                ext = ext.split("/")
                if (ext.length > 1) {
                    result = ext[1].toLowerCase();
                }
            }
        }


        return result;
    }

    return (
        <>
            <ReactDropzoneStyles />
            {!props.showLoading && !props.fileName && !props.isPreview && (
                <>
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>
                                    <GeneralTranslation slug="dragAndDropFiles" />
                                </p>
                            </div>
                        )}
                    </Dropzone>
                    {props.showOnlyImageMessage === true && (
                        <div className="w-100 mt-1">
                            <MiniMessage messageSlug="description.onlyImage" />
                        </div>
                    )}
                </>
            )}
            {!props.showLoading && props.fileName && (
                <div className="p-4 border border-1 border-fifth-gray rounded-10px d-flex justify-content-between align-items-center w-100">
                    <span className="d-flex align-items-center">
                        <h1 className="mr-3 position-relative">
                            <span className="d-inline-block mr-3">
                                <GologsImage
                                    name="secondaryBlackPaper.png"
                                    height={42}
                                    width="auto"
                                />
                            </span>
                            <span
                                className="position-absolute"
                                style={{
                                    top: "-0.25mm",
                                    left: "40%",
                                    width: "auto"
                                }}
                            >
                                {props.file && (
                                    <small
                                        style={{
                                            fontSize: "2.2mm",
                                            width: "max-content",
                                            paddingTop: "0.5mm",
                                            paddingBottom: "0.5mm"
                                        }}
                                        className="d-inline-block px-1 bg-danger text-white"
                                    >
                                        {props.file && getExtension()}
                                    </small>
                                )}
                            </span>
                        </h1>
                        <span>{props.fileName}</span>
                    </span>

                    <div className="w-50 pl-4">
                        {!props.hideRemoveButton && (
                            <a
                                onClick={onDelete}
                                className="d-inline-block float-right"
                            >
                                <GologsIcon
                                    name="darkTrash.svg"
                                    height={24}
                                    width="auto"
                                />
                            </a>
                        )}
                        {props.file && (
                            <span
                                onClick={onView}
                                className="d-inline-block mr-3 float-right"
                            >
                                <GologsIcon
                                    name="darkEye.svg"
                                    height={24}
                                    width="auto"
                                />
                            </span>
                        )}
                    </div>
                </div>
            )}

            {props.showLoading && (
                <div className="p-4 border border-1 border-fifth-gray rounded-10px d-flex justify-content-between align-items-center">
                    <span className="d-flex align-items-center">
                        <div className="mr-2">
                            <span
                                style={{ fontSize: "12mm" }}
                                className="d-inline-block mr-3 infinite-rotation"
                            >
                                <FontAwesomeIcon icon={faCircleNotch} />
                            </span>
                        </div>
                        <div style={{ fontSize: "5mm" }}>
                            {t(translations.entities.general.uploading)}...
                        </div>
                    </span>
                </div>
            )}

            {props.isPreview && !props.fileName && (
                <div className="p-4 border border-1 border-fifth-gray rounded-10px d-flex justify-content-between align-items-center w-100 h-105px">
                    <span className="d-flex align-items-center">
                        <div className="fs-18px">
                            <GeneralTranslation slug="fileNotUploaded" />
                        </div>
                    </span>
                </div>
            )}

            <PopupMessage
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                messageSlug="responseMessage.uploadedFileInvalid"
            />
        </>
    );
}