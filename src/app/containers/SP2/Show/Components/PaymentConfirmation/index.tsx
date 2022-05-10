import React, { useState, useEffect } from "react";
import { PaymentConfirmation as PaymentConfirmationTemplate } from "../../../../../components/PaymentConfirmation/Loadable";
import moment from "moment";
import SP2 from "../../../../../../endpoints/SP2";

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
        personName: "",
        primarySubtotal: 0,
        platformFee: 0,
        vat: 0
    });
    
    const getData = async () => {
        let response: any = {};
        let unit: any = {};
        try {
            response = await SP2.show(props.id);
            unit.jobNumber = response.jobNumber;
            unit.personName = "";
            unit.primarySubtotal = response.subTotalByThirdParty;
            unit.platformFee = response.platformFee;
            unit.vat = response.vat
            setData(unit);
            setGrandtotal(response.grandTotal);
            let bills: any = [];
            bills.push({
                name: "SP2 Service",
                amount: unit.primarySubtotal
            });
            bills.push({
                name: "Administration Fee",
                amount: unit.platformFee
            });
            bills.push({
                name: "PPN Administration Fee",
                amount: unit.vat
            });
            setDetails(bills);
        } catch(e) {

        }
    };

    const onDownloadReceipt = async () => {
        let dt: any = {};
    };
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <PaymentConfirmationTemplate
            subjectSlug="SP2.this"
            objectSlug="SP2.release"
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
