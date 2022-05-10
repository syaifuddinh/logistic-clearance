import React from "react";
import { GologsButton } from "../../../../../components/Button/Loadable";
import GologsAlert from "../../../../../components/Alert/GologsAlert";
import { Redirect } from "react-router-dom";
import { TransactionSuccessModal } from "../../../../../components/Modal/TransactionSuccess/Loadable";
import { PopupMessage } from "../../../../../components/PopupMessage/Loadable";
import Email from "../../../../../../endpoints/Email";
import TransactionDelegate from "../../../../../../endpoints/TransactionDelegate";
import InTransit from "../../../../../../endpoints/Master/InTransit";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";

type IProps = {
    data: any;
    isValid: any;
    nextStep: any;
    previousStep: any;
    stepper: number;
};

export default class ButtonBar extends React.Component<IProps>{
    state = {
        displayDraftAlert: false,
        redirectToTransaction: false,
        redirectToAddServicePage: false,
        redirectToSuccessPage: false,
        isShowDangerMessage: false,
        showModal: false,
        isSuccess: false,
        titleModal: "",
        subTitleModal: "",
        successDraftMessage: "",
        successRedirectUrl: "",
        dangerMessage: ""
    };

    showDefaultDangerMessage = () => {
        this.setState({isShowDangerMessage: true});
        this.setState({ dangerMessage: "responseMessage.errorDefault" });
        setTimeout(() => {
            this.setState({isShowDangerMessage: false});
        }, 6000);
    }
    
    handleCloseModal = () => {
        this.setState({showModal: false});
    }
    
    moveToAddServicePage = () => {
        this.setState({ redirectToAddServicePage: true });
    }
    
    moveToSuccessPage = () => {
        this.setState({ redirectToSuccessPage: true });
    }
    
    handleShowModal = () => {
        this.setState({
            titleModal: "Request DO Success!",
            subTitleModal: "Would you like to add new services?"
        });
        this.setState({showModal: true});
    }

    onSkipAddService = () => {
        this.setState({ isSuccess: true });
    };
    
    sendEmailNotification = async (jobNumber) => {
        let blNumber: any = "";
        let notifyEmails: any = [];
        const forwarderEmail = this.props.data.forwarderEmail;
        const forwarderEmailParams = [forwarderEmail]; 
        if (this.props.data.notifyPeopleEmail) {
            notifyEmails = this.props.data.notifyPeopleEmail.split(";");
        }
        try {
            await Email.afterSubmitDelegateForForwarder(
                jobNumber,
                forwarderEmailParams,
                blNumber
            );
            await Email.afterSubmitDelegate(
                jobNumber,
                notifyEmails,
                blNumber
            );
        } catch(e) {
            InTransit.store({
                service: "DO Delegate",
                errorMessage:
                    "System can't send notification email after user Submit DO Delegate - " +
                    e.message
            });
        }
    }
    
    onSubmit = async (saveAsDraft: boolean) => {
        let params: any = {};
        let dt: any = {};
        params.saveAsDraft = saveAsDraft;
        params.blNumber = this.props.data.blNumber;
        params.serviceName = this.props.data.service.value;
        params.contractNumber = this.props.data.contractNumber;
        params.frieghtForwarderName = this.props.data.freightForwarder;
        params.blDocument = this.props.data.mblHbl.generatedFileName;
        params.letterOfIndemnity = this.props.data.letterOfIndemnity.generatedFileName;
        params.attorneyLetter = this.props.data.attorneyLetter.generatedFileName;
        params.notifyEmails = [];
        if(this.props.data.notifyPeopleEmail) {
            params.notifyEmails = this.props.data.notifyPeopleEmail.split(";");
        }
        if(saveAsDraft === false) {
            params.positionStatus = 1;
            params.positionStatusName = "Delegate";
        } else if(saveAsDraft === true) {
            params.positionStatus = 0;
            params.positionStatusName = "Draft";
        }
        try {
            dt = await TransactionDelegate.store(params);
            const jobNumber = dt.jobNumber;
            window.localStorage.setItem(
                "latestJobNumber",
                jobNumber
            );
            await this.sendEmailNotification(jobNumber);
        } catch(e) {
            throw new Error(e)
        }
    }

    submitDirectly = async () => {
        try {
            await this.onSubmit(false)
        } catch(e) {
            let errorMessage: string = "System can't Submit Delegate. ";
            let params: any = {};
            errorMessage += e.message;

            params["Contract Number"] = this.props.data.contractNumber;
            params["Freight Forwarder"] = this.props.data.freightForwarder.label;
            params["Service"] = this.props.data.service.value;
            params["Notify People Email"] = this.props.data.notifyPeopleEmail;
            params["MBL / HBL"] = this.props.data.mblHbl.generatedFileName;
            params["Attorney Letter"] = this.props.data.attorneyLetter.generatedFileName;
            params["Letter Of Indemnity"] = this.props.data.letterOfIndemnity.generatedFileName;
            
            InTransit.store({
                service: "Delegate",
                status: "Delegate",
                errorMessage: errorMessage,
            }, params);
            this.showDefaultDangerMessage();
            throw new Error(e);
        }
    }

    saveAsDraft = async () => {
        let successDraftMessage: string = "";
        let successRedirectUrl: string = "";
        try {
            await this.onSubmit(true);
            this.setState({isDraftMessage: true});
            if(this.props.data.service.value === "DO") {
                successDraftMessage = "delegate.doDraftMessage";
                successRedirectUrl = "/transaction?tab=draft";
            } else if(this.props.data.service.value === "SP2") {
                successDraftMessage = "delegate.sp2DraftMessage";
                successRedirectUrl = "/sp2-request?tab=draft";
            }
            this.setState({successDraftMessage: successDraftMessage});
            this.setState({successRedirectUrl: successRedirectUrl});
            this.setState({ displayDraftAlert: true });
        } catch(e) {
            let errorMessage: string = "System can't Submit Delegate as Draft. ";
            let params: any = {};
            errorMessage += e.message;

            params["Contract Number"] = this.props.data.contractNumber;
            params[
                "Freight Forwarder"
            ] = this.props.data.freightForwarder.label;
            params["Service"] = this.props.data.service.value;
            params["Notify People Email"] = this.props.data.notifyPeopleEmail;
            params["MBL / HBL"] = this.props.data.mblHbl.generatedFileName;
            params[
                "Attorney Letter"
            ] = this.props.data.attorneyLetter.generatedFileName;
            params[
                "Letter Of Indemnity"
            ] = this.props.data.letterOfIndemnity.generatedFileName;

            InTransit.store(
                {
                    service: "Delegate",
                    status: "Delegate",
                    errorMessage: errorMessage
                },
                params
            );
            this.showDefaultDangerMessage();
        }
    }
    
    render() {
        return (
            <>
                <div className="d-flex justify-content-end">
                    {this.props.stepper > 0 && (
                        <GologsButton
                            variant="link-primary"
                            onClick={this.props.previousStep}
                            contentByTranslation={true}
                            translation="wizard.bottom.previous"
                        />
                    )}
                    {this.props.stepper < 2 && (
                        <GologsButton
                            variant="primary"
                            onClick={this.props.nextStep}
                            contentByTranslation={true}
                            disabled={
                                (this.props.stepper === 0 &&
                                    (!this.props.data.contractNumber ||
                                        !this.props.data.service.value ||
                                        !this.props.data.freightForwarder
                                            )) ||
                                (this.props.stepper === 1 &&
                                    (!this.props.data.mblHbl.fileName ||
                                        !this.props.data.attorneyLetter
                                            .fileName))
                            }
                            translation="wizard.bottom.nextStep"
                        />
                    )}

                    {this.props.stepper === 2 && (
                        <GologsButton
                            variant="outline-primary"
                            onClick={this.saveAsDraft}
                            contentByTranslation={true}
                            translation="saveAsDraft"
                            className="mr-1"
                        />
                    )}

                    {this.props.stepper === 2 && (
                        <>
                            {this.props.data.service.value === "DO" && (
                                <TransactionSuccessModal
                                    titleSlug="delegate.doSuccess"
                                    subtitleSlug="prompt.addNewService"
                                    onSkipAddService={this.onSkipAddService}
                                    buttonSlug="wizard.bottom.submitRequest"
                                    buttonVariant="primary"
                                    onClick={this.submitDirectly}
                                    successTransactionUrl="/do-delegate-success"
                                    serviceData={{
                                        notifyEmail: this.props.data
                                            .emailAddress
                                    }}
                                />
                            )}

                            {this.props.data.service.value === "SP2" && (
                                <TransactionSuccessModal
                                    titleSlug="delegate.sp2Success"
                                    subtitleSlug="prompt.addNewService"
                                    onSkipAddService={this.onSkipAddService}
                                    buttonSlug="wizard.bottom.submitRequest"
                                    buttonVariant="primary"
                                    onClick={async () => {
                                        await this.onSubmit(false);
                                    }}
                                    successTransactionUrl="/sp2-delegate-success"
                                    serviceData={{
                                        notifyEmail: this.props.data
                                            .emailAddress
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>

                <PopupMessage
                    show={this.state.displayDraftAlert}
                    onClose={() => {
                        this.setState({ displayDraftAlert: false });
                        window.location.href = this.state.successRedirectUrl;
                    }}
                    messageSlug={this.state.successDraftMessage}
                />

                {this.state.isSuccess &&
                    this.props.data.service.value === "DO" && (
                        <Redirect
                            to={{
                                pathname: "/do-delegate-success"
                            }}
                        />
                    )}
                {this.state.isSuccess &&
                    this.props.data.service.value === "SP2" && (
                        <Redirect
                            to={{
                                pathname: "/sp2-delegate-success"
                            }}
                        />
                    )}

                {this.state.isShowDangerMessage && (
                    <GologsAlert
                        variant="danger"
                        content={<GeneralTranslation slug={this.state.dangerMessage} />}
                    />
                )}
            </>
        );
    }
}
