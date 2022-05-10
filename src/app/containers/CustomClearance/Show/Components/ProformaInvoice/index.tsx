import React, { Component } from "react";
import { ProformaInvoice as ProformaInvoiceTemplate } from "../../../../../components/ProformaInvoice/Loadable";
import CustomClearance from "../../../../../../endpoints/CustomClearance";
import Email from "../../../../../../endpoints/Email";
import CargoOwner from "../../../../../../endpoints/Company/CargoOwner";
import TransactionDelegate from "../../../../../../endpoints/TransactionDelegate";
import InTransit from "../../../../../../endpoints/Master/InTransit";
import UserModel from "../../../../../../model/User";
import CustomClearanceModel from "../../../../../../model/CustomClearance";
import { PopupMessage } from "../../../../../components/PopupMessage/Loadable";
import moment from "moment";

type IProps = {
    id: string;
    onPaymentSubmited: any;
};

export default class ProformaInvoice extends Component<IProps> {
    state = {
        data: {
            jobNumber: "",
            blNumber: "",
            emails: "",
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
    };

    componentDidMount() {
        this.getData(this.props.id);
    }

    updateDelegateStatus = async () => {
        const companyType = UserModel.getCompanyType();
        let id: any = this.props.id;
        if (companyType === "Forwarder") {
            try {
                await TransactionDelegate.updateStatus(
                    id,
                    4,
                    CustomClearanceModel.getDelegateStatusByIndex(4)
                );
                await TransactionDelegate.updateStatus(
                    id,
                    5,
                    CustomClearanceModel.getDelegateStatusByIndex(5)
                );
            } catch (e) {}
        }
    };

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
            name: "CustomClearance Service",
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
    };

    getData = async (id: string) => {
        let ajax: any = {};
        let data: any = this.state.data;
        this.setState({ data: data });
        try {
            ajax = await CustomClearance.show(id);
            const today = new Date();
            const dueDate = moment(today).add(3, "days").format("YYYY-MM-DD");
            data.dueDate = dueDate;
            data.jobNumber = ajax.jobNumber;
            data.blNumber = ajax.blNumber;
            if(ajax.notifyEmail) {
                data.emails = ajax.notifyEmail;
            }

            this.setState({ data: data });
        } catch (e) {}
    };

    downloadProformaInvoice = async () => {
    };

    updateDirectStatus = async () => {
        let id: any = this.props.id;
        try {
            await CustomClearance.updateStatus(
                id,
                4,
                CustomClearanceModel.getStatusByIndex(4)
            );
            await CustomClearance.updateStatus(
                id,
                5,
                CustomClearanceModel.getStatusByIndex(5)
            );
        } catch (e) {}
    };

    sendEmailNotification = async () => {
        const jobNumber = this.state.data.jobNumber;
        const blNumber = this.state.data.blNumber;
        let emails: any = this.state.data.emails;
        await Email.afterPaymentConfirmationCustomClearance(jobNumber, emails, blNumber);
        await Email.afterReleaseCustomClearance(jobNumber, emails, blNumber);
    }


    proceedPayment = async () => {
        let jobNumber: any = this.state.data.jobNumber;
        let emails: any = [];
        if (this.state.data.emails) {
            emails = this.state.data.emails;
        }
        if (this.state.data.isDelegate === true) {
            const cargoOwnerName = this.state.data.createdBy;
            const cargoOwner = await CargoOwner.showByName(cargoOwnerName);
            if (cargoOwner) {
                emails.push(cargoOwner.companyEmail);
            }
        }
        try {
            await this.updateDirectStatus();
            await this.updateDelegateStatus();
            this.sendEmailNotification();
            this.setState({ isShowPopupMessage: true });
            this.props.onPaymentSubmited();
        } catch (e) {
            let message: any = "System can't proceed payment. ";
            message += e.message;

            InTransit.store({
                service: "CustomClearance",
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
