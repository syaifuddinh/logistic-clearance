import React, { useState, useEffect } from "react";
import SP2 from "../../../../../../endpoints/SP2";
import RequestTemplate from "../../../../../components/SP2Wizard/RequestBL/Review";

type IProps = {
    id: any;
};

export default function Request(props: IProps) {
    const [key, setKey] = useState("1");
    const [data, setData] = useState({
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
        documentType: {
            label: ""
        },
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
            grandtotal: 0,
            serviceFee: 0,
            vat: 0,
            primarySubtotal: 0,
            secondarySubtotal: 0
        },
        paymentDetails: []
    });

    const getData = async () => {
        let unit: any = {};
        let notifies: any = [];
        try {
            const response = await SP2.show(props.id);
            if (response.notifies) {
                notifies = response.notifies;
                notifies = notifies.map(param => {
                    return param.email;
                });
                unit.notifyEmails = notifies.join(";");
            }
            unit.statusLogs = response.logs;
            unit.proformaInvoiceNo = response.proformaInvoiceNo;
            unit.createdDate = response.createdDate;
            unit.jobNumber = response.jobNumber;
            unit.statusPosition = response.statusPosition;
            unit.cargoOwnerTaxId = response.cargoOwnerTaxId;
            unit.cargoOwnerName = response.cargoOwnerName;
            unit.forwarderTaxId = response.forwarderTaxId;
            unit.forwarderName = response.forwarderName;
            unit.terminalOperator = response.terminalOperator;
            unit.typeTransaction = response.typeTransaction;
            unit.blNumber = response.blNumber;
            unit.sppbNumber = response.sppbNumber;
            unit.doNumber = response.doNumber;
            unit.pibNumber = response.pibNumber;

            if (response.dueDate) {
                unit.dueDate = response.dueDate;
                unit.paidThru = new Date(response.dueDate);
            }
            if (response.pibDate) {
                unit.pibDate = new Date(response.pibDate);
            }

            if (response.blDate) {
                unit.blDate = new Date(response.blDate);
            }
            
            if (response.sppbDate) {
                unit.sppbDate = new Date(response.sppbDate);
            }
            
            if (response.doDate) {
                unit.doDate = new Date(response.doDate);
            }
            
            unit.documentType = {
                label: response.documentType
            };
            unit.invoice = {};
            unit.invoice.serviceFee = 0;
            unit.invoice.vat = 0;
            unit.invoice.secondarySubtotal = 0;
            unit.invoice.grandtotal = 0;
            if (response.subTotalByThirdParty) unit.invoice.primarySubtotal = response.subTotalByThirdParty;
            if (response.vat) unit.invoice.vat = response.vat;
            if (response.platformFee) unit.invoice.secondarySubtotal = parseInt(response.platformFee) + parseInt(response.vat);
            if (response.grandTotal) unit.invoice.grandtotal = response.grandTotal;
            unit.containers = response.containers;
            unit.containers = unit.containers.map(param => {
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
            setData(unit);
            setKey("2");
        } catch(e) {

        }
    }

    useEffect(() => {
        if(props.id) {
            getData();
        }
    }, []);
    
    return (
        <>
            <RequestTemplate
                key={key}
                notifyEmails={data.notifyEmails}
                containers={data.containers}
                paidThru={data.paidThru}
                cargoOwnerTaxId={data.cargoOwnerTaxId}
                cargoOwnerName={data.cargoOwnerName}
                forwarderTaxId={data.forwarderTaxId}
                forwarderName={data.forwarderName}
                typeTransaction={data.typeTransaction}
                terminalOperator={data.terminalOperator}
                blNumber={data.blNumber}
                documentType={data.documentType}
                sppbNumber={data.sppbNumber}
                pibNumber={data.pibNumber}
                doNumber={data.doNumber}
                pibDate={data.pibDate}
                sppbDate={data.sppbDate}
                doDate={data.doDate}
                date={data.blDate}
            />
        </>
    );

}