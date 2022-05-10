import React, { useEffect, useState } from "react";
import SelectBox from "../../SelectBox/index";
import Contract from "../../../../endpoints/Master/Contract";

type IProps = {
    value?: any;
    onChange: any;
    translation: string;
    cargoOwnerName?: string; 
    serviceName?: string; 
};

export default function ContractNumberInput (props: IProps) {
    const [items, setItems] = useState([]);
    
    const getItems = async () => {
       let list: any = []; 
       const cargoOwnerName = props.cargoOwnerName ? props.cargoOwnerName.trim() : "";
       const serviceName = props.serviceName ? props.serviceName.trim() : "";
       list = await Contract.list();
       list = list.data;
       if(cargoOwnerName) {
           list = list.filter((param: any) => {
               const secondParty = param.secondParty ? param.secondParty.trim() : "";
               return secondParty === cargoOwnerName
           });
       }
       if(serviceName) {
           list = list.filter((param: any) => {
               const services = param.services ? param.services.trim() : "";
               return services === serviceName;
           });
       }
       list = list.map((param: any) => {
           let resp: any = {};
           resp.value = param.id;
           resp.label = param.contractNumber;
           resp.forwarderName = param.firstParty;

           return resp;
       })
       setItems(list);
    }
    
    useEffect(() => {
        getItems();
    }, []);

    return (
        <SelectBox
            variant="primary"
            items={items}
            value={props.value}
            onSelectedChange={e => {
                props.onChange(e);
            }}
            placeholderByTranslation={true}
            translation={props.translation}
            labelSlug={props.translation}
            showAsterisk={true}
        />
    );
}