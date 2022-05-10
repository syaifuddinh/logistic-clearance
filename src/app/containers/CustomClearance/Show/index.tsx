import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import CustomClearance from "../../../../model/CustomClearance";
import CustomClearanceEndpoint from "../../../../endpoints/CustomClearance";
import StorageEndpoint from "../../../../endpoints/Storage";
import { Summary } from "../../../components/Summary/Loadable";
import { StatusLogs } from "../../../components/StatusLogs/Loadable";
import { PaymentConfirmation } from "./Components/PaymentConfirmation/Loadable";
import { DocumentRelease } from "./Components/DocumentRelease/Loadable";
import { GologsTab } from "../../../components/Tab/Loadable";
import { Review } from "../Create/Components/Review/Loadable";
import { ProformaInvoice } from "./Components/ProformaInvoice/Loadable";
import { Confirmation } from "./Components/Confirmation/Loadable";
import moment from "moment";

type IProps = {
    match?: any;
}

export default class CustomClearanceRequestShow extends React.Component<IProps> {
    state = {
        id: "",
        summary: [],
        statusLogs: [],
        tabs: [],
        documents: [],
        data: {
            statusLogs: [],
            proformaInvoiceNo: "",

            jobNumber: "",
            service: "Custom Clearance",
            createdDate: "",
            completedDate: "",
            type: "",
            notifyPeople: "",
            cargoOwnerOrCustomerTaxId: "",
            ppjkTaxId: "",
            cargoOwnerOrCustomerNib: "",
            ppjkNib: "",
            contractType: "",
            blNumber: "",
            blDate: "",
            phoneNotification: "",
            emailNotification: "",
            requestDate: "",
            documentTypeLabel: "",
            customsOfficeLabel: "",
            pibTypeLabel: "",
            importTypeLabel: "",
            paymentTypeLabel: "",
            
            dueDate: "",
            paidThru: "",
            notifyEmails: "",
            
            statusPosition: 0,
            paymentDetails: []
        }, 
        files: {
            packingList: {},
            invoice: {},
            bl: {}
        },
        invoice : {
            accountNumber : "",
            grandtotal: 0,
            primarySubtotal: 0,
            secondarySubtotal: 0,
            serviceFee: 0,
            vat: 0
        }
    };
    
    getData = async (id: string) => {
        let dt: any = {};
        let notifies: any = [];
        let data: any = this.state.data;
        let invoice: any = this.state.invoice;
        let paymentDetails: any = [];
        let files: any = {};
        this.setState({id: id});
        try {
            dt = await CustomClearanceEndpoint.show(id);
            // Hardcoded
            data.completedDate = "In Progress";
            data.type = "Fill out form";
            // =============================================
            
            if (dt.notifyEmail) {
                notifies = dt.notifyEmail;
                data.notifyEmails = notifies.join(";");
            }
            data.statusLogs = dt.logs;
            data.proformaInvoiceNo = dt.proformaInvoiceNo;
            data.createdDate = new Date(dt.createdDate);
            data.jobNumber = dt.jobNumber;
            data.statusPosition = dt.positionStatus;
            data.cargoOwnerOrCustomerTaxId = dt.cargoOwnerNpwp;
            data.ppjkTaxId = dt.ppjkNpwp;
            data.cargoOwnerOrCustomerNib = dt.cargoOwnerNib;
            data.ppjkNib = dt.ppjkNib;
            data.emailNotification = data.notifyEmails;
            data.phoneNotification = dt.phone;
            data.blNumber = dt.blNumber;
            data.blDate = dt.blDate;
            data.requestDate = dt.requestDate;

            data.documentTypeLabel = dt.documentTypeName;
            data.customsOfficeLabel = dt.customsOfficeName;
            data.pibTypeLabel = dt.pibTypeName;
            data.importTypeLabel = dt.importTypeName;
            data.paymentMethodLabel = dt.paymentMethodName;
            data.items = dt.items.map(params => {
                const response = params;
                response.qty = params.quantity;
                
                return response;
            });

            // Proforma Invoice
            invoice.primarySubtotal = 0;
            invoice.vat = 0;
            invoice.secondarySubtotal = 0;
            invoice.grandtotal = 0;
            // ==================================

            files.packingList = {};
            if(dt.packingList) {
                files.packingList.file = await StorageEndpoint.downloadFile(dt.packingList);
                files.packingList.fileName = "Packing List.pdf";
            }

            files.invoice = {};
            if(dt.invoice) {
                files.invoice.file = await StorageEndpoint.downloadFile(dt.invoice);
                files.invoice.fileName = "Invoice.pdf";
            }
            
            files.bl = {};
            if(dt.bl) {
                files.bl.file = await StorageEndpoint.downloadFile(dt.bl);
                files.bl.fileName = "Invoice.pdf";
            }

            this.setState({files: files});
            this.setState({data: data});
            this.setState({invoice: invoice});
            this.getTabs();
            this.getSummary();
            this.getStatusLogs();
            this.getDocuments();
        } catch (e) {
            
        }
    }

    componentDidMount() {    

        let invoice: any = this.state.invoice;
        invoice.accountNumber = "1234 5678 9090";
        this.setState({invoice : invoice});
        
        if (this.props.match) {
            const id = this.props.match.params.id;
            if (id) {
                this.getData(id);
            }
        }
    }

    getDocuments = () => {
        let documents: any = this.state.documents;
        documents.push({
            jobNumber: this.state.data.jobNumber,
            dateAndTime: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
            uploader: "System",
            description: "SPPB",
            onClick: () => {}
        });

        this.setState({ documents: documents });
    }

    getStatusLogs = () => {
        setTimeout(() => {
            let statusLogs: any = this.state.statusLogs;
            statusLogs = CustomClearance.statuses.map((v, i) => {
                let r: any = {};
                
                r.label = v.name;
    
                if (v.slug == "paymentConfirmation") {
                    r.value = <GeneralTranslation slug="completeYourPayment" />;
                } else if (v.slug == "documentRelease") {
                    r.value = <GeneralTranslation slug="customClearance.releaseMessage" />;
                } else if (v.slug == "confirmation") {
                    r.value = <GeneralTranslation slug="description.waitingConfirmation" />;
                } else if (v.slug == "proformaInvoice") {
                    r.value = (
                        <GeneralTranslation slug="waitingForProformaInvoiceToCompletePayment" />
                    );
                }
    
                if (i <= this.state.data.statusPosition - 1) {
                    if(v.slug === "requestForm") {
                        r.value = moment(new Date(this.state.data.createdDate)).format("DD/MM/YYYY HH:mm:ss");
                    } else if(v.slug === "confirmation") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 2
                        );
                        if(status) {
                            r.value = moment(new Date(status.logDate)).format("DD/MM/YYYY HH:mm:ss");
                        }
                    } else if(v.slug === "proformaInvoice") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 3
                        );
                        if(status) {
                            r.value = moment(new Date(status.logDate)).format("DD/MM/YYYY HH:mm:ss");
                        }
                    } else if(v.slug === "paymentConfirmation") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 4
                        );
                        if(status) {
                            r.value = moment(new Date(status.logDate)).format("DD/MM/YYYY HH:mm:ss");
                        }
                    } else if(v.slug === "documentRelease") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 5
                        );
                        if(status) {
                            r.value = moment(new Date(status.logDate)).format("DD/MM/YYYY HH:mm:ss");
                        }
                    } else {
                        r.value = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
                    }
                }
    
                return r;
            });
    
            this.setState({ statusLogs: statusLogs });
        }, 100);
    }

    getSummary = () => {
        let summary: any = this.state.summary;
        summary = [];
        summary.push({
            label: <GeneralTranslation slug="jobNumber" />,
            value: this.state.data.jobNumber
        });
        summary.push({
            label: <GeneralTranslation slug="service" />,
            value: this.state.data.service
        });
        summary.push({
            label: <GeneralTranslation slug="createdDate" />,
            value: moment(this.state.data.createdDate).format("DD-MM-YYYY HH:mm:ss")
        });
        summary.push({
            label: <GeneralTranslation slug="completedDate" />,
            value: this.state.data.completedDate
        });
        summary.push({
            label: <GeneralTranslation slug="Type" />,
            value: this.state.data.type
        });
        summary.push({
            label: <GeneralTranslation slug="notifyPeople" />,
            value: this.state.data.notifyEmails
        });

        this.setState({ summary: summary });
    }
    
    getTabs = () => {
        
            let tabs: any = this.state.tabs;
            tabs = CustomClearance.statuses.map((v, i) => {
                let r: any = {};
                r.defaultIcon = v.defaultIcon;
                r.primaryIcon = v.primaryIcon;
                r.slug = i.toString();
                if (v.slug == "documentRelease") {
                    r.name = "Document Release";
                } else {
                    r.name = v.name;
                }

                if (v.slug == "requestForm") {
                    r.content = (
                        <Review
                            data={this.state.data}
                            files={this.state.files}
                        />
                    );
                } else if (v.slug == "confirmation") {
                    r.content = (
                        <Confirmation
                            primaryEmail={this.state.data.emailNotification}
                        />
                    );
                }  else if (v.slug == "proformaInvoice") {
                    r.content = (
                        <ProformaInvoice
                            id={this.state.id}
                            key={this.state.id}
                            onPaymentSubmited={() => {
                                this.getData(this.state.id);
                            }}
                        />
                    );
                } else if (v.slug == "paymentConfirmation") {
                    r.content = (
                        <PaymentConfirmation
                            jobNumber={this.state.data.jobNumber}
                            date={moment(new Date(this.state.data.createdDate)).format("YYYY-MM-DD HH:mm")}
                            paymentMethod={"Virtual Account BCA"}
                            bankReferenceId={"123456789"}
                            details={this.state.data.paymentDetails}
                            grandtotal={this.state.invoice.grandtotal}
                        />
                    );
                } else if (v.slug == "documentRelease") {
                    r.content = <DocumentRelease data={this.state.documents} />;
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
                    <Summary
                        key={this.state.summary.length}
                        data={this.state.summary}
                    />

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
                            titleClass="fs-12px"
                            activeTab={(this.state.data.statusPosition >=
                            CustomClearance.statuses.length
                                ? CustomClearance.statuses.length - 1
                                : this.state.data.statusPosition - 1
                            ).toString()}
                            data={this.state.tabs}
                        />
                    </div>
                </div>
            </>
        );
    }
}