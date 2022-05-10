import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import SP2 from "../../../../model/SP2";
import SP2Endpoint from "../../../../endpoints/SP2";
import { Summary } from "../../../components/Summary/Loadable";
import { StatusLogs } from "../../../components/StatusLogs/Loadable";
import { PaymentConfirmation } from "./Components/PaymentConfirmation/Loadable";
import { ProformaInvoice } from "./Components/ProformaInvoice/Loadable";
import { DocumentRelease } from "./Components/DocumentRelease/Loadable";
import { Request } from "./Components/Request/Loadable";
import { GologsTab } from "../../../components/Tab/Loadable";
import moment from "moment";
import { PopupMessage } from "../../../components/PopupMessage/Loadable";
import { Redirect } from "react-router-dom";

export default class SP2RequestShow extends React.Component {
    state = {
        summary: [],
        statusLogs: [],
        tabs: [],
        documents: [],
        data: {
            id: "",
            statusLogs: [],
            proformaInvoiceNo: "",
            jobNumber: "",
            service: "SP2",
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
            notifyEmails: "",
            
            statusPosition: 0,
            containers: [],
            invoice: {
                grandtotal : 0
            },
            paymentDetails: [],
            isDelegate: false
        }, 
        invoice : {
            accountNumber : ""
        },
        isShowPopupMessage: false
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
    
    getData = async (id: string) => {
        let dt: any = {};
        let notifies: any = [];
        let data: any = this.state.data;
        data.id = id;
        this.setState({data: data});
        try {
            dt = await SP2Endpoint.show(id);

            // Hardcoded
            data.completedDate = "In Progress";
            data.type = "Fill out form";
            // =============================================
            
            if(dt.notifies) {
                notifies = dt.notifies;
                notifies = notifies.map(param => {
                    return param.email;
                });
                data.notifyEmails = notifies.join(";");
            }
            data.isDelegate = dt.isDelegate;
            data.statusLogs = dt.logs;
            data.proformaInvoiceNo = dt.proformaInvoiceNo;
            data.createdDate = dt.createdDate;
            data.jobNumber = dt.jobNumber;
            data.statusPosition = dt.statusPosition;
            data.cargoOwnerTaxId = dt.cargoOwnerTaxId;
            data.cargoOwnerName = dt.cargoOwnerName;
            data.forwarderTaxId = dt.forwarderTaxId;
            data.forwarderName = dt.forwarderName;
            data.terminalOperator = dt.terminalOperator;
            data.typeTransaction = dt.typeTransaction;
            data.blNumber = dt.blNumber;
            data.sppbNumber = dt.sppbNumber;
            data.doNumber = dt.doNumber;
            data.pibNumber = dt.pibNumber;
            
            if(dt.dueDate) {
                data.dueDate = dt.dueDate;
                data.paidThru = new Date(dt.dueDate);
            }
            if(dt.pibDate) {
                data.pibDate = new Date(dt.pibDate);
            }

            if (dt.blDate) {
                data.blDate = new Date(dt.blDate);
            }

            if (dt.sppbDate) {
                data.sppbDate = new Date(dt.sppbDate);
            }

            if (dt.doDate) {
                data.doDate = new Date(dt.doDate);
            }
            
            data.documentType = {
                label: dt.documentType
            };
            
            
            data.invoice.serviceFee = 0;
            data.invoice.vat = 0;
            data.invoice.secondarySubtotal = 0;
            data.invoice.grandtotal = 0;
            if (dt.subTotalByThirdParty) data.invoice.primarySubtotal = dt.subTotalByThirdParty;
            if (dt.vat) data.invoice.vat = dt.vat;
            if (dt.platformFee) data.invoice.secondarySubtotal =
            parseInt(dt.platformFee) +
            parseInt(dt.vat);
            if (dt.grandTotal) data.invoice.grandtotal = dt.grandTotal;
            data.containers = dt.containers;
            data.containers = data.containers.map(param => {
                let resp: any = {};

                resp.mbl = param.blNumber;
                resp.vesselNumber = param.vesselNumber;
                resp.voyageNumber = param.voyageNumber;
                resp.vesselName = param.vesselName;
                resp.eta = "";
                resp.containerSize = param.containerSize;
                resp.containerType = param.containerType;
                resp.containerNumber = param.containerNumber;

                return resp;
            });
            data.paymentDetails.push({
                name: "SP2 Service",
                amount: dt.subTotalByThirdParty
            });
            data.paymentDetails.push({
                name: "Administration Fee",
                amount: dt.platformFee
            });
            data.paymentDetails.push({
                name: "PPN Administration Fee",
                amount: dt.vat
            });
            this.setState({data: data});
            this.getTabs();
            this.getSummary();
            this.getStatusLogs();
        } catch (e) {
            
        }
    }

    componentDidMount() {    
        let invoice: any = this.state.invoice;
        invoice.accountNumber = "1234 5678 9090";
        this.setState({invoice : invoice});
    }

    getStatusLogs = () => {
        setTimeout(() => {
            let statusLogs: any = this.state.statusLogs;
            statusLogs = SP2.statuses.map((v, i) => {
                let r: any = {};
                if (v.slug == "sp2Release") {
                    r.label = "Document Release";
                } else {
                    r.label = v.name;
                }
    
                if (v.slug == "paymentConfirmation") {
                    r.value = <GeneralTranslation slug="completeYourPayment" />;
                } else if (v.slug == "sp2Release") {
                    r.value = <GeneralTranslation slug="SP2.releaseMessage" />;
                }
    
                if (i <= this.state.data.statusPosition - 1) {
                    if(v.slug === "requestForm") {
                        r.value = moment(new Date(this.state.data.createdDate)).format("DD/MM/YYYY HH:mm:ss");
                    } else if(v.slug === "proformaInvoice") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 2
                        );
                        if(status) {
                            r.value = moment(new Date(status.createdDate)).format("DD/MM/YYYY HH:mm:ss");
                        }
                     } else if (v.slug === "paymentConfirmation") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 3
                        );
                        if (status) {
                            r.value = moment(
                                new Date(status.createdDate)
                            ).format("DD/MM/YYYY HH:mm:ss");
                        } else {
                            r.value = (
                                <GeneralTranslation slug="completeYourPayment" />
                            );
                        }
                    }  else if (v.slug === "sp2Release") {
                        let status: any = {};
                        status = this.state.data.statusLogs.find(
                            (param: any) => param.positionStatus === 4
                        );
                        if (status) {
                            r.value = moment(
                                new Date(status.createdDate)
                            ).format("DD/MM/YYYY HH:mm:ss");
                        } else {
                            r.value = (
                                <GeneralTranslation slug="SP2.releaseMessage" />
                            );
                        }
                    } else {
                        r.value = moment(new Date()).format(
                            "DD/MM/YYYY HH:mm:ss"
                        );
                    }
                }
    
                return r;
            });
    
            this.setState({ statusLogs: [] });
            this.setState({ statusLogs: statusLogs });
            window.console.log(this.state.statusLogs);
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
            value: this.state.data.service,
            className: "w-120px"
        });
        summary.push({
            label: <GeneralTranslation slug="createdDate" />,
            value: moment(this.state.data.createdDate).format(
                "DD-MM-YYYY HH:mm:ss"
            ),
            className: "w-160px"
        });
        summary.push({
            label: <GeneralTranslation slug="completedDate" />,
            value: this.state.data.completedDate,
            className: "w-200px"
        });
        summary.push({
            label: <GeneralTranslation slug="Type" />,
            value: this.state.data.type,
            className: "w-150px"
        });
        summary.push({
            label: <GeneralTranslation slug="notifyPeople" />,
            value: this.state.data.notifyEmails,
            className: "w-220px"
        });

        this.setState({ summary: summary });
    }
    
    getTabs = () => {
        
            let tabs: any = this.state.tabs;
            tabs = SP2.statuses.map((v, i) => {
                let r: any = {};
                r.defaultIcon = v.defaultIcon;
                r.primaryIcon = v.primaryIcon;
                r.slug = i.toString();
                if (v.slug == "sp2Release") {
                    r.name = "Document Release";
                } else {
                    r.name = v.name;
                }

                if (v.slug == "requestForm") {
                    r.content = (
                        <Request
                            id={this.state.data.id}
                        />
                    );
                } else if (v.slug == "proformaInvoice") {
                    r.content = (
                            <ProformaInvoice
                                id={this.state.data.id}
                                onPaymentSubmited={() => {
                                    this.getData(this.state.data.id);
                                }}
                            />
                        );
                    } else if (v.slug == "paymentConfirmation") {
                        r.content = (
                            <PaymentConfirmation
                                id={this.state.data.id}
                            />
                        );
                        } else if (v.slug == "sp2Release") {
                            r.content = <DocumentRelease
                                id={this.state.data.id}
                            />;
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
                            statusPosition={this.state.data.statusPosition}
                        />
                    </div>

                    <div className="mt-3 text-left">
                        <GologsTab
                            type="primary"
                            titleClass="fs-12px"
                            allowed={this.state.data.statusPosition}
                            activeTab={(this.state.data.statusPosition >=
                            SP2.statuses.length
                                ? SP2.statuses.length - 1
                                : this.state.data.statusPosition - 1
                            ).toString()}
                            data={this.state.tabs}
                        />
                    </div>
                </div>
                {this.state.data.isDelegate === true && (
                    <Redirect
                        to={{
                            pathname: "/delegate/" + this.state.data.id
                        }}
                    />
                )}
            </>
        );
    }
}