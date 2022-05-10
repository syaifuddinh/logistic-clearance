import React from "react";
import { useHistory } from "react-router-dom";
import MAuth from "../../../endpoints/Auth";

export default function Activate(props) {
    let history = useHistory();
    if (props.match && props.match.params && props.match.params.token) {
        MAuth.activation(props.match.params.token)
            .then(data => {
                history.push({
                    pathname: "/login",
                    state: {
                        message: "Anda berhasil melakukan aktivasi", 
                        erro: false 
                    }
                });
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.data && typeof error.response.data == "string") {
                        error.response.data = error.response.data.replace("ErrorFromServer:", ""); 
                    }
                }
                if (error.response && error.response.status === 401) {
                    history.push({
                        pathname: "/login",
                        state: { message: error.response.data, error: true }
                    });
                } else if (error.response && error.response.status === 400) {
                    history.push({
                        pathname: "/login",
                        state: { message: error.response.data, error: true }
                    });
                } else if (error.response && error.response.status === 200) {
                    history.push({
                        pathname: "/login",
                        state: {
                            message: "Anda berhasil melakukan aktivasi",
                            error: false
                        }
                    });
                } else {
                    history.push({
                        pathname: "/login",
                        state: { message: error.response.data, error: true }
                    });
                }
            });
    } else {
    }
    return <div></div>;
}
