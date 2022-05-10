import React, { useState, useEffect } from "react";
import { PaymentConfirmation as PaymentConfirmationTemplate } from "../../../../../components/PaymentConfirmation/Loadable";
import moment from "moment";
import DeliveryOrder from "../../../../../../endpoints/DeliveryOrder";

type IDetails = {
    name: string;
    amount: number;
};

type IProps = {
    id: string;
};

export default function PaymentConfirmation(props: IProps) {    
    const [grandtotal, setGrandtotal] = useState(5610000);
    const [details, setDetails] = useState([]);
    const [data, setData] = useState({
        jobNumber: "",
        personName: ""
    });

    const getData = () => {
        DeliveryOrder.show(props.id)
            .then(resp => {
                let response: any = resp.data.deliveryOrder;
                let unit: any = {};
                unit.jobNumber = response.jobNumber;
                unit.personName = response.customerName;
                setData(unit);
            })
            .catch(error => {
                window.console.log(error);
            });
    };

    const onDownloadReceipt = async () => {
        let dt: any = {};
        try {
            dt = await DeliveryOrder.downloadInvoice(props.id);
        } catch (e) {}
    };
    
    useEffect(() => {
        let bills: any = [];
        bills.push({
            name: "DO Service",
            amount: 1200000
        });
        bills.push({
            name: "Administration Fee",
            amount: 25000
        });
        bills.push({
            name: "PPN Administration Fee",
            amount: 2500
        });
        setDetails(bills);
        getData();
    }, []);
    
    return (
        <PaymentConfirmationTemplate
            subjectSlug="requestDO.this"
            objectSlug="doRelease"
            personName={data.personName}
            jobNumber={data.jobNumber}
            details={details}
            grandtotal={grandtotal}
            onDownloadReceipt={onDownloadReceipt}
            date={moment(new Date()).format("YYYY-MM-DD HH:mm")}
            paymentMethod={"Virtual Account BCA"}
            bankReferenceId={"123456789"}
        />
    );  
}