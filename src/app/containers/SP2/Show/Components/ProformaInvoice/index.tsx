import React, { Component } from "react";
import { ProformaInvoice as ProformaInvoiceTemplate } from "../../../../../components/ProformaInvoice/Loadable";
import SP2 from "../../../../../../endpoints/SP2";
import Email from "../../../../../../endpoints/Email";
import CargoOwner from "../../../../../../endpoints/Company/CargoOwner";
import TransactionDelegate from "../../../../../../endpoints/TransactionDelegate";
import InTransit from "../../../../../../endpoints/Master/InTransit";
import UserModel from "../../../../../../model/User";
import SP2Model from "../../../../../../model/SP2";
import { PopupMessage } from "../../../../../components/PopupMessage/Loadable";

type IProps = {
    id: string;
    onPaymentSubmited: any;
};

export default class ProformaInvoice extends Component<IProps> {
    state = {
        data: {
            jobNumber: "",
            notifyEmails: "",
            containers: [],
            proformaInvoiceNo: "",
            createdDate: "",
            dueDate: "",
            grandtotal: 0,
            primarySubtotal: 0,
            platformFee: 0,
            vat: 0,
            createdBy: "",
            isDelegate: false
        }, 
        grandtotal: 0,
        details: [],
        isShowPopupMessage: false
    }

    componentDidMount() {
        this.getData(this.props.id);
    }
    
    updateDelegateStatus = async () => {
        const companyType = UserModel.getCompanyType();
        let id: any = this.props.id;
        if(companyType === "Forwarder") {
            try {
                await TransactionDelegate.updateStatus(id, 4, SP2Model.getDelegateStatusByIndex(4));
                await TransactionDelegate.updateStatus(id, 5, SP2Model.getDelegateStatusByIndex(5));
            } catch(e) {
                
            }
        }
    }
    
    setBill = () => {
        let invoice: any = {};
        let data: any = this.state.data;
        let details: any = [];
        invoice.serviceFee = 0;
        invoice.vat = 0;
        invoice.secondarySubtotal = 0;
        invoice.grandtotal = 0;
        if (data.primarySubtotal)
            invoice.primarySubtotal = data.primarySubtotal;
        if (data.vat) invoice.vat = data.vat;
        if (data.platformFee)
            invoice.secondarySubtotal =
                parseInt(data.platformFee) + parseInt(data.vat);
        if (data.grandtotal) invoice.grandtotal = data.grandtotal;
        this.setState({ grandtotal: invoice.grandtotal });

        details.push({
            name: "SP2 Service",
            amount: data.primarySubtotal
        });
        details.push({
            name: "Administration Fee",
            amount: data.platformFee
        });
        details.push({
            name: "PPN Administration Fee",
            amount: data.vat
        });
        this.setState({ details: details });
    }
    
    getData = async (id: string) => {
        let dt: any = {};
        let notifies: any = [];
        let data: any = this.state.data;
        this.setState({data: data});
        try {
            dt = await SP2.show(id);    
            if(dt.notifies) {
                notifies = dt.notifies;
                notifies = notifies.map(param => {
                    return param.email;
                });
                data.notifyEmails = notifies.join(";");
            }
        
            data.proformaInvoiceNo = dt.proformaInvoiceNo;
            data.jobNumber = dt.jobNumber;
            data.createdDate = dt.createdDate;
            data.createdBy = dt.createdBy;
            data.isDelegate = dt.isDelegate;
            if (dt.dueDate) {
                data.dueDate = dt.dueDate;
            }
            if (dt.subTotalByThirdParty)
                data.primarySubtotal = dt.subTotalByThirdParty;
            if (dt.vat) data.vat = dt.vat;
            if (dt.grandTotal) data.grandtotal = dt.grandTotal;
            if (dt.platformFee) data.platformFee = dt.platformFee;

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
            this.setState({data: data});
            this.setBill();
        } catch (e) {
            
        }
    }
    
    downloadProformaInvoice = async () => {
        let response: any = {};
        let proformaInvoiceUrl: any = "";
        // Dummy data
        try { 
            response = await SP2.getBillingDetail(
                1,
                "202111030015"
            );
            if (response.detailBilling) {
                proformaInvoiceUrl = response.detailBilling.link;
                window.open(proformaInvoiceUrl, "_blank");
            }
            // ==============================
        } catch(e) {

        }
    }
    
    updateDirectStatus = async () => {
        let id: any = this.props.id;
        let jobNumber: any = this.state.data.jobNumber;
        let status: number = 3;
        const companyType = UserModel.getCompanyType();
        if(companyType === "CargoOwner") {
            try {
                await SP2.updateStatus(id, jobNumber, status);
                await SP2.updateStatus(id, jobNumber, 4);
            } catch(e) {
    
            }
        }
    };

    proceedPayment = async () => {
        let jobNumber: any = this.state.data.jobNumber;
        let emails: any = [];
        let gatePassUrl: any = "";
        let containers: any = [];
        if (this.state.data.notifyEmails) {
            emails = this.state.data.notifyEmails.split(";");
        }
        if (this.state.data.isDelegate === true) {
            const cargoOwnerName = this.state.data.createdBy;
            const cargoOwner = await CargoOwner.showByName(cargoOwnerName);
            if (cargoOwner) {
                emails.push(cargoOwner.companyEmail);
            }
        }
        containers = this.state.data.containers.map((param: any) => {
            return param.containerNumber;
        });
        gatePassUrl = SP2.getGatePassUrl(
            this.state.data.proformaInvoiceNo,
            containers
        );
        try {
            await this.updateDirectStatus();
            await this.updateDelegateStatus();
            try {
                await Email.afterSP2Released(emails, jobNumber, gatePassUrl);
            } catch(e) {
                let message: any = "System couldn't send email notification after user proceed payment. ";
                message += e.message;

                InTransit.store({
                    service: "SP2",
                    status: "SP2 Released",
                    jobNumber: jobNumber,
                    jobCreatedDate: this.state.data.createdDate,
                    errorMessage: message
                });
            }
            this.setState({ isShowPopupMessage: true });
            this.props.onPaymentSubmited();
        } catch (e) {
            let message: any = "System can't proceed payment. "
            message += e.message;
            
            InTransit.store({
                service: "SP2",
                status: "Proforma Invoice",
                jobNumber: jobNumber,
                jobCreatedDate: this.state.data.createdDate,
                errorMessage: message
            });        
        }
    };
    
    render() {
        return (
            <>
                <ProformaInvoiceTemplate
                    key={this.state.data.dueDate}
                    titleSlug="proformaInvoice"
                    dueDate={this.state.data.dueDate}
                    grandtotal={this.state.grandtotal}
                    details={this.state.details}
                    onProceedPayment={this.proceedPayment}
                    onDownloadProformaInvoice={this.downloadProformaInvoice}
                    onProofOfPaymentDrop={() => {}}
                    isShowProceedPaymentButton={true}
                />

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