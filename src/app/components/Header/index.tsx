import React, { useState } from "react";
import Notification from "./Components/Notification";
import GologsProfile from "./Components/GologsProfile";
import GologsLang from "./Components/GologsLang";
import GologsService from "./Components/GologsService";
import {
    Container,
    Title,
    HeaderNav
} from "../../../styles/Header";
import { Backward } from "../../components/Backward/Loadable";

export default function Header(props) {

    return (
        <Container style={{ zIndex: 100 }}>
            <div className="d-flex justify-content-between w-100 pr-4 position-relative">
                <div
                    className="d-none d-md-block text-capitalize"
                    style={{ marginLeft: "80mm" }}
                >
                    <Title className="md-fs-32px fs-25px">{props.title}</Title>
                    {props.subtitle && (
                        <div className="md-fs-14px fs-10px mt-1 letter-spacing-3 text-capitalize">
                            {props.subtitle}
                        </div>
                    )}
                    {props.showBackwardButton && <Backward />}
                </div>
                <div className="d-md-none ml-3 text-capitalize">
                    <Title className="md-fs-32px fs-25px">{props.title}</Title>
                    {props.showBackwardButton && <Backward />}
                </div>
                <HeaderNav
                    className="md-position-static position-absolute"
                    style={{
                        top: "-19mm",
                        right: "5mm"
                    }}
                >
                    <div>
                        <GologsService />
                    </div>

                    <div className="ml-2">
                        <GologsLang />
                    </div>
                    <div className="ml-2">
                        <Notification />
                    </div>
                    <div className="ml-2">
                        <GologsProfile />
                    </div>
                </HeaderNav>
            </div>
        </Container>
    );
}
