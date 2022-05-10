import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Image } from "../../../../styles/Sidebar";

import {
    Notification as Notif,
    NotificationIcon
} from "../../../../styles/Header";

export default function Notification(props) {
    const [showItem, setShowItem] = useState(false);

    const switchItem = () => setShowItem(!showItem);

    const getListItem = (title, description, created_at) => {
        return (
            <ListGroup.Item className="d-flex">
            <Image
                className="mr-3"
                style={{ height: "10mm", width: "auto" }}
                src={require("../../../../assets/icons/do.svg")}
            />
            <div>
                <div>
                    <a href="#" className="font-weight-bold text-secondary">
                        {title}
                    </a>
                </div>
                <div>
                    <small className="text-muted">{description}</small>
                </div>

                <div>
                    <small className="text-very-muted">{created_at}</small>
                </div>
            </div>
            </ListGroup.Item>
        );
    };

    return (
        <Notif className="md-w-52px md-h-52px w-35px h-35px">
            <div className="position-relative">
                <div
                    className="position-absolute bg-red text-white d-flex justify-content-center align-items-center rounded-circle font-weight-bold"
                    style={{
                    width: "6mm",
                    height: "6mm",
                    fontSize: "2.6mm",
                    top: "-2.4mm",
                    right: "-2.4mm"
                    }}
                >
                    <span>3</span>
                </div>
                <div
                    className="position-absolute rounded"
                    style={{
                    width: "100mm",
                    top: "135%",
                    right: "0mm",
                    zIndex: 1000
                    }}
                >
                    {showItem && (
                    <ListGroup className="position-relative" style={{ zIndex: 1000 }}>
                        <ListGroup.Item>
                            <h6 className="mt-2">NOTIFICATIONS</h6>
                        </ListGroup.Item>
                        {getListItem(
                        "DO Online",
                        "Jhon Doe has upload Proof of payment and waiting for upload DO Online",
                        "2 Hours Ago"
                        )}
                        {getListItem("SP2", "Jhon Doe has created SP2", "2 Hours Ago")}>
                    </ListGroup>
                    )}
                </div>
                <NotificationIcon
                    src={require("../../../../assets/icons/notification.svg")}
                    onClick={switchItem}
                    className="md-h-52px h-35px"
                />
            </div>
        </Notif>
    );
}
