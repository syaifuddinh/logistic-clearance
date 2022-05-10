import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import DeliveryOrder from "../../../../model/DeliveryOrder";
import DeliveryOrderEndpoint from "../../../../endpoints/DeliveryOrder";
import { Summary } from "../../../components/Summary/Loadable";
import { StatusLogs } from "../../../components/StatusLogs/Loadable";
import { PaymentConfirmation } from "./Components/PaymentConfirmation/Loadable";
import { ProformaInvoice } from "./Components/ProformaInvoice/Loadable";
import { DocumentRelease } from "./Components/DocumentRelease/Loadable";
import { Request } from "./Components/Request/Loadable";
import { Confirmation } from "../../../components/Confirmation/Loadable";
import { GologsTab } from "../../../components/Tab/Loadable";
import moment from "moment";
import GologsAlert from "../../../components/Alert/GologsAlert";
import { Redirect } from "react-router-dom";

export default class DORequestShow extends React.Component {
    state = {
        id: "",
        primaryEmail: "",
        secondaryEmail: "",
        summary: [],
        statusLogs: [],
        tabs: [],
        documents: [],
        containers: [],
        data: {
            jobNumber: "",
            service: "",
            jobCreatedDate: "",
            createdDate: "",
            completedDate: "",
            type: "",
            notifyPeople: "",
            cargoOwnerTaxId: "",
            cargoOwnerName: "",
            forwarderTaxId: "",
            forwarderName: "",
            terminalOperator: "",
            typeTransaction: "",
            blNumber: "",
            sppbNumber: "",
            doNumber: "",
            pibNumber: "",
            documentType: "",
            blDate: "",
            sppbDate: "",
            doDate: "",
            pibDate: "",
            dueDate: "",
            paidThru: "",
            shippingLineEmail: "",
            statusPosition: 0,
            customerName: "",
            containers: [],
            deliveryOrderAttachments: [],
            deliveryOrderLogs: [],
            blFile: "",
            suratKuasaFile: "",
            letterOfIndemnityFile: "",
            suratPeminjamanFile: "",
            deliveryOrderStatus: "",
            invoice: {
                details: [],
                grandtotal: 0
            },
            isDelegate: false
        },
        invoice: {
            accountNumber: ""
        },
        isShowPopupMessage: false,
        isShowDangerMessage: false,
        isShowSuccessMessage: false,
        successMessage: "",
        dangerMessage: "",
        files: {
            proofOfPayment: {
                file: null,
                fileName: ""
            }
        }
    };
    
    showDangerMessage = (translation) => {
        this.setState({"isShowDangerMessage": true})
        this.setState({"dangerMessage": <GeneralTranslation slug={translation} />})
        setTimeout(() => {
            this.setState({"isShowDangerMessage": false})
            this.setState({"dangerMessage": ""})
        }, 4000);
    }

    getUserInformation = () => {
        let email: any = "";
        let jsonData: any = {};
        let authUser = localStorage.getItem("authUser");
        if (authUser) {
            jsonData = JSON.parse(authUser);
            window.console.log(jsonData);
            email = jsonData.person.email;
        }

        this.setState({ primaryEmail: email });
        this.setState({ secondaryEmail: this.state.data.notifyPeople });
    }
                   
    getData = id => {
        DeliveryOrderEndpoint.show(id)
            .then(resp => {
                this.setState({ id: id });
                const dt = resp.data.deliveryOrder;
                let data: any = this.state.data;
                data = dt;
                data.invoice = {};
                data.invoice.details = [];
                data.invoice.grandtotal = 0;
                data.blNumber = dt.billOfLadingNumber;
                //    Data dummy
                data.dueDate = moment(new Date())
                .add(1, "days")
                    .format("YYYY-MM-DD HH:mm:ss");
                    
                    let invoice: any = this.state.invoice;
                    invoice.accountNumber = "1234 5678 9090";
                    this.setState({invoice : invoice});
                
                // ===========
                data.service = "DO Online";
                data.statusPosition = dt.positionStatus;
                data.jobNumber = dt.jobNumber;
                data.jobCreatedDate = dt.createdDate;
                data.createdDate = moment(new Date(dt.createdDate)).format(
                    "DD-MM-YYYY HH:mm:ss"
                );
                data.completedDate = dt.completedDate
                    ? dt.completedDate
                    : "In Progress";
                data.type = dt.deliveryOrderType;
                if (dt.deliveryOrderNotifies.length > 0) {
                    data.notifyPeople =
                        dt.deliveryOrderNotifies[0].email;
                }

                let containers: any = this.state.containers;
                containers = dt.deliveryOrderContainers.map(
                    v => {
                        let r: any = {};
                        r.containerNumber = v.containerNo;
                        r.sealNumber = v.sealNo;
                        r.sizeType = v.containerSize;
                        r.containerType = v.containerType;
                        r.grossWeight = v.grossWeight;
                        r.jenisMuat = v.loadType;
                        return r;
                    }
                );

                let attachments: any =
                    dt.deliveryOrderAttachments;
                let blData: any = attachments.find(
                    x => x.documentName == "BL"
                );
                if (blData) {
                    data.blFile = blData.fileName;
                }

                let suratKuasaData: any = attachments.find(
                    x => x.documentName == "SuratKuasa"
                );
                if (suratKuasaData) {
                    data.suratKuasaFile =
                        suratKuasaData.fileName;
                }

                let letterOfIndemnityData: any = attachments.find(
                    x => x.documentName == "LetterOfIndemnity"
                );
                if (letterOfIndemnityData) {
                    data.letterOfIndemnityFile =
                        letterOfIndemnityData.fileName;
                }

                let suratPeminjamanData: any = attachments.find(
                    x =>
                        x.documentName ==
                        "SuratPeminjamanKontainer"
                );
                if (suratPeminjamanData) {
                    data.suratPeminjamanFile =
                        suratPeminjamanData.fileName;
                }


                this.setState({ data: data });
                this.setState({ containers: containers });

                this.getTabs();
                this.getSummary();
                this.getStatusLogs();
                this.getUserInformation();
            })
            .catch(error => {
                window.console.log(error);
            });
    };

    getSummary = () => {
        let summary: any = this.state.summary;
        summary.push({
            label: <GeneralTranslation slug="jobNumber" />,
            value: this.state.data.jobNumber
        });
        summary.push({
            label: <GeneralTranslation slug="service" />,
            value: this.state.data.service,
            className: "w-150px"
        });
        summary.push({
            label: (
                <GeneralTranslation slug="createdDateAndTime" />
            ),
            value: this.state.data.createdDate
        });
        summary.push({
            label: (
                <GeneralTranslation slug="completedDateAndTime" />
            ),
            value: this.state.data.completedDate
        });
        summary.push({
            label: <GeneralTranslation slug="Type" />,
            value: this.state.data.type,
            className: "w-120px"
        });
        summary.push({
            label: <GeneralTranslation slug="notifyPeople" />,
            value: this.state.data.notifyPeople
        });

        this.setState({ summary: summary });
    };

    onDownloadReceipt = async () => {
        let dt: any = {}
        try {
            dt = await DeliveryOrderEndpoint.downloadInvoice(this.state.id);
        } catch(e) {

        }
    }

    getTabs = () => {
        let tabs: any = this.state.tabs;
        
        tabs = DeliveryOrder.statuses.map((v, i) => {
            let r: any = {};
            r.defaultIcon = v.defaultIcon;
            r.primaryIcon = v.primaryIcon;
            r.slug = i.toString();
            r.name = v.name;

            if (v.slug == "requestForm") {
                r.content = (
                    <Request id={this.state.id} />
                );
            } else if (v.slug == "confirmation") {
                r.content = (
                    <Confirmation 
                        primaryEmail={this.state.primaryEmail}
                        secondaryEmail={this.state.secondaryEmail}
                        creatorName={this.state.data.customerName}
                        subjectSlug="requestDO.yours"
                        objectSlug="shippingLine"
                    />
                );
            } else if (v.slug == "proformaInvoice") {
                r.content = (
                    <ProformaInvoice
                        id={this.state.id}
                        isShowProceedPaymentButton={
                            this.state.data.deliveryOrderStatus !== "DO_RELEASE"
                        }
                        onPaymentSubmited={() => {
                            this.getData(this.state.id);
                        }}
                    />
                );
            } else if (v.slug == "paymentConfirmation") {
                r.content = (
                    <PaymentConfirmation
                        id={this.state.id}
                    />
                    );
                } else if (v.slug == "doRelease") {
                    r.content = (
                        <DocumentRelease
                        id={this.state.id}
                    />
                );
            }
            return r;
        });
        
        this.setState({ tabs: tabs });
    };

    getStatusLogs = () => {
        let statusLogs: any = this.state.statusLogs;
        statusLogs = DeliveryOrder.statuses.map(v => {
            let r: any = {};

            r.label = v.name;
            if (v.slug == "confirmation") {
                r.label = (
                    <GeneralTranslation slug="confirmationFromShippingLine" />
                );
                // r.label = v.name;
            } else {
                r.label = v.name;
            }

            if (v.slug == "confirmation") {
                let confirmationLog: any = {};
                confirmationLog = this.state.data.deliveryOrderLogs.find(
                    (param: any) =>
                        param.activity.search("Update ProformaInvoiceAmount") > -1
                );
                if(confirmationLog) {
                    r.value = moment(
                        new Date(confirmationLog.modifiedDate)
                    ).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                } else {
                    r.value = (
                        <GeneralTranslation slug="waitingForConfirmationFromShippingLine" />
                    );
                }
            } else if (v.slug == "paymentConfirmation") {
                let paymentLog: any = {};
                paymentLog = this.state.data.deliveryOrderLogs.find(
                    (param: any) =>
                        param.activity ===
                        "Update Status DO from PROPORMA_INVOICE to PAYMENT_CONFIRMATION"
                );
                if (paymentLog) {
                    r.value = moment(
                        new Date(paymentLog.modifiedDate)
                    ).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                } else {
                    r.value = (
                        <GeneralTranslation slug="confirmationForYourPayment" />
                    );
                }
            } else if (v.slug == "proformaInvoice") {
                let proformaLog: any = {};
                proformaLog = this.state.data.deliveryOrderLogs.find(
                    (param: any) =>
                        param.activity ===
                        "Update Status DO from REQUEST to PROPORMA_INVOICE"
                );
                if(proformaLog) {
                    r.value = moment(
                        new Date(proformaLog.modifiedDate)
                    ).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                } else {
                    r.value = (
                        <GeneralTranslation slug="waitingForProformaInvoiceToCompletePayment" />
                    );
                }
            } else if (v.slug == "doRelease") {
                let releaseLog: any = {};
                releaseLog = this.state.data.deliveryOrderLogs.find(
                    (param: any) =>
                        param.positionStatus == 5
                );
                if(releaseLog) {
                    r.value = moment(
                        new Date(releaseLog.modifiedDate)
                    ).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                } else {
                    r.value = (
                        <GeneralTranslation slug="requestDO.releaseMessage" />
                    );
                }
            } else if (v.slug == "requestForm") {
                r.value = this.state.data.createdDate;
            }

            return r;
        });

        this.setState({ statusLogs: statusLogs });
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

    componentDidMount() {
        let data: any = this.state.data;

        data.dueDate = moment(new Date())
            .add(1, "days")
            .format("YYYY-MM-DD HH:mm:ss");
        data.invoice.primarySubtotal = 5500000;
        data.invoice.serviceFee = 100000;
        data.invoice.vat = 10000;
        data.invoice.secondarySubtotal = 110000;
        data.invoice.grandtotal = 5610000;

        this.setState({ data: data });


        let invoice: any = this.state.invoice;
        invoice.accountNumber = "1234 5678 9090";
        this.setState({ invoice: invoice });
    }

    showSuccessMessage = translation => {
        this.setState({"isShowSuccessMessage": true});
        this.setState({
            "successMessage": <GeneralTranslation slug={translation} />
        });
        setTimeout(() => {
            this.setState({"isShowSuccessMessage": false});
        }, 4000);
    };

    getHeader() {
        const { t } = useTranslation();

        return (
            <>
                <Helmet>
                    <title>
                        {t(
                            translations.sidebarMenu
                                .myTransaction
                        )}
                    </title>
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
                            statusPosition={this.state.data.statusPosition}
                        />
                    </div>

                    <div className="mt-3 text-left">
                        <GologsTab
                            key={this.state.tabs.length}
                            type="primary"
                            titleClass="md-fs-12px fs-9px"
                            allowed={this.state.data.statusPosition}
                            activeTab={(this.state.data.statusPosition >=
                            DeliveryOrder.statuses.length
                                ? DeliveryOrder.statuses.length - 1
                                : this.state.data.statusPosition - 1
                            ).toString()}
                            data={this.state.tabs}
                        />
                    </div>
                </div>
                {this.state.isShowDangerMessage && (
                    <GologsAlert
                        variant="danger"
                        content={this.state.dangerMessage}
                    />
                )}

                {this.state.isShowSuccessMessage && (
                    <GologsAlert
                        variant="success"
                        content={this.state.successMessage}
                    />
                )}

                {this.state.data.isDelegate === true && (
                    <Redirect
                        to={{
                            pathname: "/delegate/" + this.state.id
                        }}
                    />
                )}
            </>
        );
    }
}