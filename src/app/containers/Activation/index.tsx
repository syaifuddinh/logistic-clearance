/* eslint-disable no-console */
import React, { Component } from "react";
import MAuth from "../../../endpoints/Auth";
import { useHistory } from "react-router-dom";

type MyProps = {
    location?: any;
    match?: any;
};

class Activation extends Component<MyProps> {
    componentWillMount() {
        let history = useHistory();

        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.token
        ) {
            MAuth.activation(this.props.match.params.token)
            .then(data => {
                window.location.href = "/home";
            })
            .catch(error => {
                history.push({
                    pathname: "/login",
                    state: { errorMessage: "error" }
                });

                if (error.response && error.response.status === 401) {
                } else if (error.response && error.response.status === 400) {
                } else {
                }
            });
        }
    }
    render() {
        return <div></div>;
    }
}

export default Activation;
