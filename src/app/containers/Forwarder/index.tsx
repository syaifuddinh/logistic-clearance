import React, { useEffect, useState } from "react";
import TransactionDelegate from "../../../endpoints/TransactionDelegate";
import { Redirect } from "react-router-dom";

export default function RequestForwarder(props) {
    const [url, setUrl] = useState("");
    const [isRedirect, setIsRedirect] = useState(false);
    
    const redirectTransaction = async () => {
        let data: any = {};
        let redirectUrl: string = "";
        if(props.match) {
            if(props.match.params) {
                const id = props.match.params.id;
                try { 
                    data = await TransactionDelegate.show(id);
                    switch(data.serviceName) {
                        case "DO":
                            redirectUrl = "/do-request/" + id + "/continue";
                            break;
                        case "SP2":
                            redirectUrl = "/sp2-request/" + id + "/continue";
                            break;
                    }
                    setUrl(redirectUrl);
                    if(redirectUrl) setIsRedirect(true);
                } catch(e) {

                }
            }
        }
    }

    useEffect(() => {
        redirectTransaction();
    }, []);

    
    return (
        <>
            {isRedirect === true && (
                <Redirect
                    to={{
                        pathname: url
                    }}
                />
            )}
        </>
    );
}
