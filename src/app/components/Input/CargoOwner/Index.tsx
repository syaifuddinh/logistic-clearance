import React, { useEffect, useState } from "react";
import SelectBox from "../../SelectBox/index";
import CargoOwner from "../../../../endpoints/Company/CargoOwner";

type IProps = {
    value?: any;
    onChange: any;
    translation: string;
};

export default function CargoOwnerInput(props: IProps) {
    const [items, setItems] = useState([]);

    const getDocumentTypes = async () => {
       let list: any = [];
       list = await CargoOwner.list();
       list = list.map((param: any) => {
           let resp: any = {};
           resp.value = param.id;
           resp.label = param.companyName;

           return resp;
       })
       setItems(list);
    }
    
    useEffect(() => {
        getDocumentTypes();
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