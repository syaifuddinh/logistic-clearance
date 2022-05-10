import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../components/Sidebar/Loadable";
import { Container } from "../../../styles/RequestDO";
import { Wizard } from "../../components/Delegate/Loadable";

export default function AssignOrder() {
    let content = (
        <Container>
            <Wizard />
        </Container>
    );

    return (
        <>
            <Helmet>
                <title>{"Assign Order"}</title>
            </Helmet>
            <Sidebar header-name={"Assign Order"} />
            {content}
        </>
    );
}
