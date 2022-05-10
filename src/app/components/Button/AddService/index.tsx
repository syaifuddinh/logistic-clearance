import React, { useState, useEffect } from "react";
import { GologsButton } from "../Loadable";
import { Redirect } from "react-router-dom";
import Storage from "../../../../endpoints/Storage";


type ServiceData = {
    blNumber?: string;
    blDate?: any;
    notifyEmail?: string;
}

type IProps = {
    disabled?: boolean;
    onCloseUrl: string;
    serviceData: ServiceData;
}

export default function AddServiceButton(props: IProps) {
    const [isAddService, setIsAddService] = useState(false);

    useEffect(() => {
        let data: any = {};
        window.localStorage.setItem("successTransactionOnCloseUrl", props.onCloseUrl);
        if(props.serviceData) {
            data = props.serviceData;
            Storage.storeServiceData(
                data.blNumber,
                data.blDate,
                data.notifyEmail
            )
        }
    });
    
    return (
        <span>
            <GologsButton
                variant="secondary"
                disabled={props.disabled === true ? true : false}
                contentByTranslation={true}
                onClick={async () => {
                    setIsAddService(true);
                }}
                translation="instruction.addServices"
            />

            {isAddService === true && (
                <Redirect
                    to={{
                        pathname: "/add-service"
                    }}
                />
            )}
        </span>
    );
}
