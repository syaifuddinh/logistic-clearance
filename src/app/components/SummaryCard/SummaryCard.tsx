import React from "react";
import { Card, Image } from "react-bootstrap";

interface Props {
    title?: any;
    description?: any;
    imageName?: string;
};

export default function SummaryCard(props) {
    const showImage = imageName => (
        <Image
            className="w-auto pull-right"
            style={{ height: "14mm" }}
            src={require("../../../assets/images/" + imageName)}
        />
    );

    return (
        <>
            <Card className="shadow-sm rounded-20px">
                <Card.Body>
                    <Card.Subtitle className="text-sixth-gray mb-2">
                        <span className="text-capitalize fs-14px">{props.title}</span>
                    </Card.Subtitle>
                    <Card.Text className="position-relative">
                    <span className="fs-32px">{props.description}</span>
                    <div
                        className="position-absolute"
                        style={{ right: 0, top: "-5mm" }}
                    >
                        {props.imageName && showImage(props.imageName)}
                    </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
