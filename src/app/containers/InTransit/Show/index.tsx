import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import SP2 from "../../../../model/SP2";
import { Summary } from "./Components/Summary/Loadable";
import { StatusLogs } from "./Components/StatusLogs/Loadable";
import { PaymentConfirmation } from "./Components/PaymentConfirmation/Loadable";
import { DocumentRelease } from "./Components/DocumentRelease/Loadable";
import { GologsTab } from "../../../components/Tab/Loadable";
import moment from "moment";
import Review from "../../../components/SP2Wizard/RequestBL/Review";
import ProformaInvoice from "../../../components/SP2Wizard/RequestBL/ProformaInvoice";

export default class SP2RequestShow extends React.Component {
    state = {
        summary: [],
        statusLogs: [],
        tabs: [],
        documents: [],
        data: {
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
            statusPosition: 0,
            containers: [],
            invoice: {
                grandtotal : 0
            }
        }, 
        invoice : {
            accountNumber : ""
        }
    };

    componentDidMount() {
        let data:any = this.state.data;
        data.statusPosition = 2;
        data.jobNumber = "JOB012345";
        data.createdDate = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
        data.completedDate = "In Progress";
        data.type = "Fill out form";
        data.notifyPeople = "doni@gmail.com";

        data.cargoOwnerTaxId = "020053708056000";
        data.cargoOwnerName =  "PT Epson Indonesia";
        data.forwarderTaxId = "018245894059000";
        data.forwarderName = "020053708056000";
        data.terminalOperator =  "TPK Koja";
        data.typeTransaction =  "Import Standard";
        data.blNumber = "BL00012312321";
        data.sppbNumber = "475012/KPU.01/2020";
        data.doNumber = "JKTA13210001";
        data.pibNumber = "PIB900012";
        data.documentType = "SPPB PIB 2.0";
        data.pibDate =  new Date();
        data.blDate =  new Date();
        data.sppbDate =  new Date();
        data.doDate =  new Date();
        data.paidThru =  new Date();
        data.dueDate =  moment(new Date()).add(1, "days").format("YYYY-MM-DD HH:mm:ss");
        data.invoice.primarySubtotal = 5500000;
        data.invoice.serviceFee = 100000;
        data.invoice.vat = 10000;
        data.invoice.secondarySubtotal = 110000;
        data.invoice.grandtotal = 5610000;
        data.containers = [
            {
                mbl: "HDMUAWJT0001",
                vesselNumber: "CMA",
                voyageNumber: "0001",
                vesselName: "CMA CGM AFRICA THREE",
                eta: "2021-08-30 21:00:322",
                containerSize: "40",
                containerType: "ISO TANK",
                containerNumber: "PCIU0013902",
                statusName: "Payment Outstanding",
                isDanger: true
            },
            {
                mbl: "HDMUAWJT0002",
                vesselNumber: "MAERSK",
                voyageNumber: "0001",
                vesselName: "MAERSK YAMUNA",
                eta: "2021-08-30 21:00:322",
                containerSize: "40",
                containerType: "HIGH CUBE",
                containerNumber: "DRYU2623893",
                statusName: "Valid",
                color: "danger"
            },
            {
                mbl: "HDMUAWJT0003",
                vesselNumber: "BAI",
                voyageNumber: "0001",
                vesselName: "BAI CHAY BRIDGE",
                eta: "2021-08-30 21:00:322",
                containerSize: "20",
                containerType: "OPEN TOP",
                containerNumber: "WHSU5368096",
                statusName: "Payment Settle",
                color: "danger",
                isSuccess: true
            }
        ];
        
        this.setState({data : data})
        
        let documents: any = this.state.documents;
        documents.push({
            jobNumber : "JOB0001",
            dateAndTime : moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
            uploader : "Shipping Line",
            description : "SP2"
        });
        this.setState({documents : documents});

        let invoice: any = this.state.invoice;
        invoice.accountNumber = "1234 5678 9090";
        this.setState({invoice : invoice});
        
        setTimeout(() => {
            
            let summary:any = this.state.summary
            summary.push({
                label : <GeneralTranslation slug="jobNumber" />,
                value : this.state.data.jobNumber
            })
            summary.push({
                label : <GeneralTranslation slug="service" />,
                value : this.state.data.service
            })
            summary.push({
                label : <GeneralTranslation slug="createdDate" />,
                value : this.state.data.createdDate
            })
            summary.push({
                label : <GeneralTranslation slug="completedDate" />,
                value : this.state.data.completedDate
            })
            summary.push({
                label : <GeneralTranslation slug="Type" />,
                value : this.state.data.type
            })
            summary.push({
                label : <GeneralTranslation slug="notifyPeople" />,
                value : this.state.data.notifyPeople
            })

            this.setState({summary : summary})

            let statusLogs:any = this.state.statusLogs
            statusLogs = SP2.statuses.map((v, i) => {
                let r:any = {};
                
                if (v.slug == "sp2Release") {
                    r.label = "Document Release"
                } else {
                    r.label = v.name;
                }
                
                if (v.slug == "paymentConfirmation") {
                    r.value = <GeneralTranslation slug="completeYourPayment" />;
                } else if (v.slug == "sp2Release") {
                    r.value = <GeneralTranslation slug="SP2.releaseMessage" />;
                }

                if (i <= this.state.data.statusPosition - 1) {
                    r.value = moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
                }

                return r;
            })

            this.setState({statusLogs : statusLogs})

            let tabs:any = this.state.tabs
            tabs = SP2.statuses.map((v, i) => {
                let r:any = {};
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
                        <Review
                            containers={this.state.data.containers}
                            paidThru={this.state.data.paidThru}
                            cargoOwnerTaxId={this.state.data.cargoOwnerTaxId}
                            cargoOwnerName={this.state.data.cargoOwnerName}
                            forwarderTaxId={this.state.data.forwarderTaxId}
                            forwarderName={this.state.data.forwarderName}
                            typeTransaction={this.state.data.typeTransaction}
                            terminalOperator={this.state.data.terminalOperator}
                            blNumber={this.state.data.blNumber}
                            documentType={this.state.data.documentType}
                            sppbNumber={this.state.data.sppbNumber}
                            pibNumber={this.state.data.pibNumber}
                            doNumber={this.state.data.doNumber}
                            pibDate={this.state.data.pibDate}
                            sppbDate={this.state.data.sppbDate}
                            doDate={this.state.data.doDate}
                            date={this.state.data.blDate}
                        />
                    );
                } else if (v.slug == "proformaInvoice") {
                    r.content = (
                        <ProformaInvoice
                            invoice={this.state.data.invoice}
                            containers={this.state.data.containers}
                            paidThru={this.state.data.paidThru}
                            cargoOwnerTaxId={this.state.data.cargoOwnerTaxId}
                            cargoOwnerName={this.state.data.cargoOwnerName}
                            forwarderTaxId={this.state.data.forwarderTaxId}
                            forwarderName={this.state.data.forwarderName}
                            typeTransaction={this.state.data.typeTransaction}
                            terminalOperator={this.state.data.terminalOperator}
                            blNumber={this.state.data.blNumber}
                            documentType={this.state.data.documentType}
                            sppbNumber={this.state.data.sppbNumber}
                            pibNumber={this.state.data.pibNumber}
                            doNumber={this.state.data.doNumber}
                            pibDate={this.state.data.pibDate}
                            sppbDate={this.state.data.sppbDate}
                            doDate={this.state.data.doDate}
                            date={this.state.data.blDate}
                        />
                    );
                } else if (v.slug == "paymentConfirmation") {
                    r.content = (
                        <PaymentConfirmation
                            dueDate={this.state.data.dueDate}
                            totalPayment={this.state.data.invoice.grandtotal}
                            virtualAccountNumber={
                                this.state.invoice.accountNumber
                            }
                        />
                    );
                } else if (v.slug == "sp2Release") {
                    r.content = (
                        <DocumentRelease
                            data={this.state.documents}
                        />
                    );
                }
                return r;
            })

            this.setState({tabs : tabs})
        }, 100)

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
                    <div>
                        <Summary data={this.state.summary} />
                    </div>

                    <div className="mt-3">
                        <StatusLogs
                            data={this.state.statusLogs}
                            statusPosition={this.state.data.statusPosition}
                        />
                    </div>

                    <div className="mt-3 text-left1">
                        <GologsTab
                            type="primary"
                            titleClass="fs-12px"
                            activeTab={(this.state.data.statusPosition >=
                            SP2.statuses.length
                                ? SP2.statuses.length - 1
                                : this.state.data.statusPosition
                            ).toString()}
                            data={this.state.tabs}
                        />
                    </div>
                </div>
            </>
        );
    }
}