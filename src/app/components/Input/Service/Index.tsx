import React, { useEffect, useState } from "react";
import SelectBox from "../../SelectBox/index";
import Forwarder from "../../../../endpoints/Company/Forwarder";

type IProps = {
    value?: any;
    onChange: any;
    labelSlug?: string;
    showAsterisk?: boolean;
};

export default function ServiceInput (props: IProps) {
    const [items, setItems] = useState([]);
    
    const getItems = async () => {
       let list: any = []; 
       list = [
           { label: "DO", value: "DO" },
           { label: "SP2", value: "SP2" }
       ];
       
       setItems(list);
    }
    
    useEffect(() => {
        getItems();
    }, []);

    return (
        <SelectBox
            labelSlug={props.labelSlug ? props.labelSlug : ""}
            showAsterisk={props.showAsterisk ? props.showAsterisk : false}
            variant="primary"
            items={items}
            value={props.value}
            onSelectedChange={e => {
                props.onChange(e);
            }}
            placeholderByTranslation={true}
            translation="service"
        />
    );
}