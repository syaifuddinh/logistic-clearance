import React, { Component } from "react";
import { Collapse } from "../Loadable"
import { GeneralTranslation } from "../../Translation/Loadable";
import Dropfile from "../../Dropfile/Dropfile";

type IProps = {
    onProofOfPaymentDrop: any;
};

export default class ProofOfPayment extends Component<IProps> {
    state = {
        files: {
            proofOfPayment: {
                showLoading: false,
                file: null,
                fileName: ""
            }
        },
        content: null,
        phone: null,
        selectedBank: {
            image: null
        }
    };

    
    onDropFile = (fieldName, value) => {
        let files: any = this.state.files;
        files[fieldName].file = value;
        files[fieldName].fileName = value.name;
        this.setState({ files: files });
        this.openForm();
        window.console.log(value);
        window.console.log(files);
        this.props.onProofOfPaymentDrop(value, value.name);
    }
    
    onDeleteFile = (fieldName) => {
        let files: any = this.state.files;
        files[fieldName] = {};
        this.setState({ files: files });
        this.openForm();
        this.props.onProofOfPaymentDrop(null, "");
    }

    componentDidMount() {
        this.openForm();
        let authUser: any = localStorage.getItem("authUser");
        if (authUser) {
            authUser = JSON.parse(authUser);
            if (authUser.person) {
                this.setState({ phone: authUser.person.phone });
            }
        }
    }

    openForm = () => {
        let content: any = this.state.content;
        content = (
            <div>
                <Dropfile
                    onDrop={e => {
                        this.onDropFile("proofOfPayment", e[0]);
                    }}
                    onDelete={e => {
                        this.onDeleteFile("proofOfPayment");
                    }}
                    showLoading={
                        this.state.files.proofOfPayment.showLoading
                    }
                    file={this.state.files.proofOfPayment.file}
                    fileName={this.state.files.proofOfPayment.fileName}
                    mimeType={["image"]}
                    showOnlyImageMessage={true}
                />
            </div>
        );
        this.setState({ content: content });
    };


    render() {
        return (
            <>
                <Collapse
                    title={
                        <GeneralTranslation slug="paymentMethod.proofOfPayment.title" />
                    }
                    subtitle={
                        <GeneralTranslation slug="paymentMethod.proofOfPayment.subtitle" />
                    }
                    content={this.state.content}
                />
            </>
        );
    }
}
