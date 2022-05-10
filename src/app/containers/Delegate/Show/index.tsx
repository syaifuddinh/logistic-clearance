import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import User from "../../../../model/User";
import SP2 from "../../../../model/SP2";
import DeliveryOrder from "../../../../model/DeliveryOrder";
import TransactionDelegate from "../../../../endpoints/TransactionDelegate";
import Storage from "../../../../endpoints/Storage";
import { Summary } from "../../../components/Summary/Loadable";
import { StatusLogs } from "../../../components/StatusLogs/Loadable";
import { Request as DORequest } from "../../../containers/DO/Show/Components/Request/Loadable";
import { ProformaInvoice as DOProformaInvoice } from "../../../containers/DO/Show/Components/ProformaInvoice/Loadable";
import { DocumentRelease as DODocumentRelease } from "../../../containers/DO/Show/Components/DocumentRelease/Loadable";
import { PaymentConfirmation as DOPaymentConfirmation } from "../../../containers/DO/Show/Components/PaymentConfirmation/Loadable";
import { Request as SP2Request } from "../../../containers/SP2/Show/Components/Request/Loadable";
import { ProformaInvoice as SP2ProformaInvoice } from "../../../containers/SP2/Show/Components/ProformaInvoice/Loadable";
import { PaymentConfirmation as SP2PaymentConfirmation } from "../../../containers/SP2/Show/Components/PaymentConfirmation/Loadable";
import { DocumentRelease as SP2DocumentRelease } from "../../../containers/SP2/Show/Components/DocumentRelease/Loadable";
import { GologsTab } from "../../../components/Tab/Loadable";
import { Confirmation } from "../../../components/Confirmation/Loadable";
import moment from "moment";
import { PopupMessage } from "../../../components/PopupMessage/Loadable";
import { ReviewForm } from "../Create/Components/ReviewForm/Loadable";

export default class DelegateShow extends React.Component {
    state = {
        summary: [],
        statusLogs: [],
        tabs: [],
        documents: [],
        data: {
            id: "",
            statusLogs: [],
            jobNumber: "",
            serviceName: "",
            contractNumber: "",
            freightForwarderName: "",
            blDocument: "",
            letterOfIndemnity: "",
            attorneyLetter: "",
            positionStatusName: "",
            notifyEmails: [],
            createdBy: "",
            createdDate: "",
            modifiedBy: "",
            modifiedDate: "",
            notifyPeopleEmails: "",
            positionStatus: 0,
            containers: [],
            invoice: {
                grandtotal : 0
            },
            paymentDetails: []
        }, 
        invoice : {
            accountNumber : ""
        },
        isShowPopupMessage: false,
        statusesModel: [],
        primaryEmail: "",
        secondaryEmail: "",
        translation: {
            subject: ""
        }
    };

    constructor(props) {
        super(props);
        if (props.match) {
            const id = props.match.params.id;
            if (id) {
                this.getData(id);
            }
        }
    }

    setConfirmationData = () => {
        let translation: any = this.state.translation;
        const service = this.state.data.serviceName;
        switch (service) {
            case "DO":
                translation.subject = "requestDO.yourDelegate";
                break;
            case "SP2":
                translation.subject = "SP2.yourDelegate";
                break;
        }
        this.setState({ translation: translation });
        this.setState({ primaryEmail: this.state.data.notifyEmails.join(", ") });
        this.setState({ secondaryEmail: User.getPersonEmail() });
    }

    setStatusesModel = () => {
        let statusesModel: any = this.state.statusesModel;
        const service = this.state.data.serviceName;
        switch(service) {
            case "DO":
                statusesModel = DeliveryOrder.delegateStatuses;
                break;
            case "SP2":
                statusesModel = SP2.delegateStatuses;
                break;
        }
        this.setState({ statusesModel: statusesModel });
    }
    
    getData = async (id: string) => {
        let dt: any = {};
        let data: any = this.state.data;
        let blName: any = "";
        let attorneyName: any = "";
        let indemnityLetterName: any = "";
        data.id = id;
        this.setState({data: data});
        try {
            dt = await TransactionDelegate.show(id);
            data = dt;
            data.freightForwarder = dt.frieghtForwarderName;
            blName = dt.blDocument;
            attorneyName = dt.attorneyLetter;
            indemnityLetterName = dt.letterOfIndemnity;
            data.notifyPeopleEmails = data.notifyEmails.join(";");
            data.mblHbl = {};
            data.attorneyLetter = {};
            data.letterOfIndemnity = {};
            data.mblHbl.file = null;
            data.attorneyLetter.file = null;
            data.letterOfIndemnity.file = null;
            try {
                if(blName) {
                    data.mblHbl.fileName = "MBL / HBL.pdf";;
                    data.mblHbl.file = await Storage.downloadFile(blName);
                }
                if(attorneyName) {
                    data.attorneyLetter.fileName = "Attorney Letter.pdf";
                    data.attorneyLetter.file = await Storage.downloadFile(attorneyName);
                }
                if(indemnityLetterName) {
                    data.letterOfIndemnity.fileName = "Letter Of Indemnity.pdf";
                    data.letterOfIndemnity.file = await Storage.downloadFile(indemnityLetterName);
                }
                
            } catch(e) {

            }
            data.statusLogs = dt.logs;
            this.setState({data: data});
            this.setStatusesModel();
            this.setConfirmationData();
            this.getSummary();
            this.getStatusLogs();
            this.getTabs();
        } catch (e) {
            
        }
    }

    getStatusLogs = () => {
        let statusLogs: any = this.state.statusLogs;
        let statusesModel: any = this.state.statusesModel;
        statusLogs = statusesModel.map((v, i) => {
            let r: any = {};
            const statusLogs = this.state.data.statusLogs;
            let unit: any = {};
            let date: any = "";
            
            unit = statusLogs.find((param: any) => param.positionStatus == i + 1);
            r.label = v.name;
            if(unit) {
                date = new Date(unit.createdDate);
                date = moment(date).format("DD/MM/YYYY HH:mm:ss");
            } else {
                if(i === 0) {
                    date = new Date(this.state.data.createdDate);
                    date = moment(date).format("DD/MM/YYYY HH:mm:ss");
                } else{
                    date = "";
                }
            }
            r.value = date;

            return r;
        });

        this.setState({ statusLogs: [] });
        this.setState({ statusLogs: statusLogs });
    }

    getSummary = () => {
        let summary: any = this.state.summary;
        let completedDateLabel: any = "";
        summary = [];
        summary.push({
            label: <GeneralTranslation slug="jobNumber" />,
            value: this.state.data.jobNumber
        });
        summary.push({
            label: <GeneralTranslation slug="service" />,
            value: this.state.data.serviceName,
            className: "w-90px"
        });
        summary.push({
            label: <GeneralTranslation slug="createdDate" />,
            value: moment(this.state.data.createdDate).format("DD-MM-YYYY HH:mm:ss")
        });
        if(this.state.data.positionStatus < 6) {
            completedDateLabel = <GeneralTranslation slug="inProgress" />;
        } else {
            completedDateLabel = moment(this.state.data.modifiedDate).format(
                "DD-MM-YYYY HH:mm:ss"
            );
        }
        summary.push({
            label: <GeneralTranslation slug="completedDate" />,
            value: completedDateLabel,
            className: "text-capitalize"
        });
        summary.push({
            label: <GeneralTranslation slug="Type" />,
            value: "Delegate",
            className: "w-130px"
        });
        summary.push({
            label: <GeneralTranslation slug="notifyPeople" />,
            value: this.state.data.notifyPeopleEmails,
            className: "w-210px"
        });

        this.setState({ summary: summary });
    }
    
    getTabs = () => {
        let statusesModel: any = this.state.statusesModel;
        let tabs: any = this.state.tabs;
        let data: any = this.state.data;
        const serviceName = this.state.data.serviceName;
        const companyType = User.getCompanyType();
        data.service = {};
        data.service.label = serviceName;
        data.notifyPeopleEmail = data.notifyPeopleEmails;
        tabs = statusesModel.map((v, i) => {
            let r: any = {};
            r.defaultIcon = v.defaultIcon;
            r.primaryIcon = v.primaryIcon;
            r.slug = i.toString();
            
            r.name = v.name;

            if (v.slug == "delegate") {
                r.content = <ReviewForm data={data} />;
            } else if (v.slug == "confirmationFromThirdParty") {
                switch(companyType) {
                    case "CargoOwner":
                        r.content = (
                            <Confirmation
                                primaryEmail={this.state.primaryEmail}
                                secondaryEmail={this.state.secondaryEmail}
                                creatorName={this.state.data.createdBy}
                                subjectSlug={this.state.translation.subject}
                                objectSlug="actor.ppjk"
                            />
                        );
                        break;
                    case "Forwarder":
                        switch(serviceName) {
                            case "DO":
                                r.content = <DORequest id={this.state.data.id} />;
                                break
                            case "SP2":
                                r.content = <SP2Request id={this.state.data.id} />;
                                break
                        }
                        break;
                    default:
                        r.content = (
                            <Confirmation
                                primaryEmail={this.state.primaryEmail}
                                secondaryEmail={this.state.secondaryEmail}
                                creatorName={this.state.data.createdBy}
                                subjectSlug={this.state.translation.subject}
                                objectSlug="actor.ppjk"
                            />
                        );
                }
            } 
            
            switch(serviceName) {
                case "DO":
                    switch(v.slug) {
                        case "confirmationFromShippingLine":
                            r.content = (
                                <Confirmation
                                    primaryEmail={this.state.primaryEmail}
                                    secondaryEmail={this.state.secondaryEmail}
                                    creatorName={this.state.data.createdBy}
                                    subjectSlug="requestDO.yours"
                                    objectSlug="shippingLine"
                                />
                            );
                            break;
                        case "proformaInvoice":
                            r.content = (
                                <DOProformaInvoice
                                    id={this.state.data.id}
                                    isShowProceedPaymentButton={true}
                                    onPaymentSubmited={() => {
                                    }}
                                />
                            );
                            break;
                        case "paymentConfirmation":
                            r.content = (
                                <DOPaymentConfirmation
                                    id={this.state.data.id}
                                />
                            );
                            break;
                        case "documentRelease":
                            r.content = (
                                <DODocumentRelease
                                    id={this.state.data.id}
                                />
                            );
                            break;
                    }
                    break;
            }
            
            switch(serviceName) {
                case "SP2":
                    switch(v.slug) {
                        case "proformaInvoice":
                            r.content = (
                                <SP2ProformaInvoice
                                    id={this.state.data.id}
                                    onPaymentSubmited={() => {}}
                                />
                            );
                            break;
                        case "paymentConfirmation":
                            r.content = (
                                <SP2PaymentConfirmation
                                    id={this.state.data.id}
                                />
                            );
                            break;
                        case "documentRelease":
                            r.content = (
                                <SP2DocumentRelease id={this.state.data.id} />
                            );
                            break;
                    }
                    break;
            }
            
            return r;
        });

        this.setState({ tabs: tabs });
    }

    getHeader () {
        const { t } = useTranslation();
        
        return (
            <>
                <Helmet>
                    <title>{t(translations.sidebarMenu.myTransaction)}</title>
                </Helmet>
                <Sidebar showBackwardButton={true} />
            </>
        );
    }

    render() {
        return (
            <>
                <this.getHeader />
                <div className="gologs-container">
                    <Summary data={this.state.summary} />

                    <div className="mt-3">
                        <StatusLogs
                            key={this.state.statusLogs.length}
                            data={this.state.statusLogs}
                            statusPosition={this.state.data.positionStatus}
                        />
                    </div>

                    <div className="mt-3 text-left">
                        <GologsTab
                            type="primary"
                            titleClass="fs-12px"
                            allowed={this.state.data.positionStatus}
                            activeTab={(this.state.data.positionStatus >=
                            this.state.statusesModel.length
                                ? this.state.statusesModel.length - 1
                                : this.state.data.positionStatus - 1
                            ).toString()}
                            data={this.state.tabs}
                        />
                    </div>
                </div>

                <PopupMessage
                    show={this.state.isShowPopupMessage}
                    onClose={() => {
                        this.setState({ isShowPopupMessage: false });
                    }}
                    messageSlug="responseMessage.paymentSubmited"
                />
            </>
        );
    }
}