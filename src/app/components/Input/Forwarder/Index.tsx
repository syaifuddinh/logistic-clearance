import React, { useEffect, useState } from "react";
import SelectBox from "../../SelectBox/index";
import Forwarder from "../../../../endpoints/Company/Forwarder";

type IProps = {
    value?: any;
    onChange: any;
    translation: string;
};

export default function ForwarderInput (props: IProps) {
    const [items, setItems] = useState([]);
    
    const getItems = async () => {
       let list: any = []; 
       list = await Forwarder.list();
       list = list.map((param: any) => {
           let resp: any = {};
           resp.value = param.id;
           resp.label = param.companyName;
           resp.email = param.companyEmail;

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
        />
    );
}