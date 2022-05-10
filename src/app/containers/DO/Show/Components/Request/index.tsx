import React, { useState, useEffect } from "react";
import RequestTemplate from "../../../../OrderPage/Show/Components/Request";
import DeliveryOrder from "../../../../../../endpoints/DeliveryOrder";

type IProps = {
    id: any;
};

export default function Request(props: IProps) {
    const [data, setData] = useState({
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
        }
    });
    const [containers, setContainers] = useState([]);    

    const getData = () => {
        DeliveryOrder.show(props.id)
            .then(resp => {
                let response: any = resp.data.deliveryOrder;
                let unit: any = {};
                let containerItems: any = [];
                const attachments = response.deliveryOrderAttachments;
                let blData: any = {};
                let suratKuasaData: any = {};
                let letterOfIndemnityData: any = {};
                let suratPeminjamanData: any = {};
                let notifyEmails: any = response.deliveryOrderNotifies;
                notifyEmails = notifyEmails.map((param: any) => param.email);
                unit.notifyPeople = notifyEmails.join(";");
                unit.jobNumber = response.jobNumber;
                unit.statusPosition = response.positionStatus;
                unit.deliveryOrderStatus = response.deliveryOrderStatus;
                unit.shippingLineEmail = response.shippingLineEmail;
                unit.isDelegate = response.isDelegate;
                unit.jobCreatedDate = response.createdDate;
                unit.billOfLadingNumber = response.billOfLadingNumber;
                unit.deliveryOrderNumber = response.deliveryOrderNumber;
                unit.shipper = response.shipper;
                unit.vessel = response.vessel;
                unit.voyageNumber = response.voyageNumber;
                unit.consignee = response.consignee;
                unit.portOfLoading = response.portOfLoading;
                unit.portOfDischarge = response.portOfDischarge;
                unit.notifyPartyName = response.notifyPartyName;
                containerItems = response.deliveryOrderContainers.map(v => {
                    let r: any = {};
                    r.containerNumber = v.containerNo;
                    r.sealNumber = v.sealNo;
                    r.sizeType = v.containerSize;
                    r.containerType = v.containerType;
                    r.grossWeight = v.grossWeight;
                    r.jenisMuat = v.loadType;
                    return r;
                });

                blData = attachments.find(x => x.documentName == "BL");
                if (blData) {
                    unit.blFile = blData.fileName;
                }

                suratKuasaData = attachments.find(
                    x => x.documentName == "SuratKuasa"
                );
                if (suratKuasaData) {
                    unit.suratKuasaFile = suratKuasaData.fileName;
                }

                letterOfIndemnityData = attachments.find(
                    x => x.documentName == "LetterOfIndemnity"
                );
                if (letterOfIndemnityData) {
                    unit.letterOfIndemnityFile = letterOfIndemnityData.fileName;
                }

                suratPeminjamanData = attachments.find(
                    x => x.documentName == "SuratPeminjamanKontainer"
                );
                if (suratPeminjamanData) {
                    unit.suratPeminjamanFile = suratPeminjamanData.fileName;
                }
                setData(unit);
                setContainers(containerItems);
            })
            .catch(error => {
                window.console.log(error);
            });
    }

    useEffect(() => {
        if(props.id) {
            getData();
        }
    }, []);
    
    return (
        <>
            <RequestTemplate
                showNotifyPeopleOnBottom={true}
                data={data}
                containers={containers}
                blFile={data.blFile}
                suratKuasaFile={data.suratKuasaFile}
                letterOfIndemnityFile={data.letterOfIndemnityFile}
                suratPeminjamanFile={data.suratPeminjamanFile}
            />
        </>
    );

}