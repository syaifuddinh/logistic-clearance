import React, { Component } from "react";
import { ProformaInvoice as ProformaInvoiceTemplate } from "../../../../../components/ProformaInvoice/Loadable";

type IDetails = {
    name: string;
    amount: number;
}

type IProps = {
    dueDate: string;
    grandtotal: number;
    details: IDetails[];
    onDownloadProformaInvoice: any;
    onProceedPayment: any;
    onProofOfPaymentDrop: any;
    isShowProceedPaymentButton: boolean;
};

export default class ProformaInvoice extends Component<IProps> {
    render() {
        return (
            <ProformaInvoiceTemplate
                titleSlug="proformaInvoice"
                dueDate={this.props.dueDate}
                grandtotal={this.props.grandtotal}
                details={this.props.details}
                onDownloadProformaInvoice={this.props.onDownloadProformaInvoice}
                onProceedPayment={this.props.onProceedPayment}
                onProofOfPaymentDrop={this.props.onProofOfPaymentDrop}
                isShowProceedPaymentButton={
                    this.props.isShowProceedPaymentButton
                }
            />
        ); 
    }
}