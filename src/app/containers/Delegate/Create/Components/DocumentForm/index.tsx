import React from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { RedAsterisk } from "../../../../../components/RedAsterisk/Loadable";
import Dropfile from "../../../../../components/Dropfile/Dropfile";

type IProps = {
    data: any;
    onFileDrop?: any;
    onFileDelete?: any;
    isPreview?: boolean;
};

export default class DocumentForm extends React.Component<IProps>{
    render() {
        return (
            <>
                <div>
                    <div className="fs-18px">
                        <GeneralTranslation slug="wizard.bottom.uploadDocument" />
                    </div>

                    <div className="d-flex justify-content-between flex-wrap mt-3 w-100">
                        <div className="w-49">
                            <GeneralTranslation slug="mblHblFile" />
                            <RedAsterisk />
                            <div className="mt-2">
                                <Dropfile
                                    onDrop={e => {
                                        this.props.onFileDrop("mblHbl", e[0], "BL");
                                    }}
                                    onDelete={e => {
                                        this.props.onFileDelete("mblHbl");
                                    }}
                                    showLoading={
                                        this.props.data.mblHbl.isShowLoading
                                    }
                                    file={this.props.data.mblHbl.file}
                                    fileName={this.props.data.mblHbl.fileName}
                                    isPreview={this.props.isPreview === true}
                                    hideRemoveButton={
                                        this.props.isPreview === true
                                    }
                                />
                            </div>
                        </div>

                        <div className="w-49">
                            <GeneralTranslation slug="attorneyLetter" />
                            <RedAsterisk />
                            <div className="mt-2">
                                <Dropfile
                                    onDrop={e => {
                                        this.props.onFileDrop(
                                            "attorneyLetter",
                                            e[0],
                                            "LainLain"
                                        );
                                    }}
                                    onDelete={e => {
                                        this.props.onFileDelete(
                                            "attorneyLetter"
                                        );
                                    }}
                                    showLoading={
                                        this.props.data.attorneyLetter
                                            .isShowLoading
                                    }
                                    file={this.props.data.attorneyLetter.file}
                                    fileName={
                                        this.props.data.attorneyLetter.fileName
                                    }
                                    isPreview={this.props.isPreview === true}
                                    hideRemoveButton={
                                        this.props.isPreview === true
                                    }
                                />
                            </div>
                        </div>

                        <div className="w-49 mt-3">
                            <GeneralTranslation slug="letterOfIndemnity" />

                            <div className="mt-2">
                                <Dropfile
                                    onDrop={e => {
                                        this.props.onFileDrop(
                                            "letterOfIndemnity",
                                            e[0],
                                            "LetterOfIndemnity"
                                        );
                                    }}
                                    onDelete={e => {
                                        this.props.onFileDelete(
                                            "letterOfIndemnity"
                                        );
                                    }}
                                    showLoading={
                                        this.props.data.letterOfIndemnity
                                            .isShowLoading
                                    }
                                    file={
                                        this.props.data.letterOfIndemnity.file
                                    }
                                    fileName={
                                        this.props.data.letterOfIndemnity
                                            .fileName
                                    }
                                    isPreview={this.props.isPreview === true}
                                    hideRemoveButton={
                                        this.props.isPreview === true
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
