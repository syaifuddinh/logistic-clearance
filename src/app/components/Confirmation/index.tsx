import React from "react";
import { GeneralTranslation } from "../Translation/Loadable";
import { GologsImage } from "../Image/Loadable";
import { CustomerServiceInfo } from "../CustomerServiceInfo/Loadable";
import { Row, Col } from "react-bootstrap";


type IProps = {
    creatorName: string
    subjectSlug: any
    objectSlug: any
    primaryEmail?: string;
    secondaryEmail?: string;
};

export default function Confirmation(props: IProps) {    
    return (
        <>
            <GeneralTranslation
                slug="statusConfirmation"
                className="fs-18px font-weight-light-bolder"
            />

            <Row>
                <Col xs={12} md={7} className="pt-5">
                    <div className="fs-14px">
                        <div>
                            <GeneralTranslation slug="hi" className="mr-1" />
                            {props.creatorName},
                        </div>
                        <div>
                            <GeneralTranslation slug={props.subjectSlug} />
                            <GeneralTranslation
                                slug="description.acceptedBy"
                                className="mr-1 ml-1"
                            />
                            <GeneralTranslation slug={props.objectSlug} />
                            ,
                            <GeneralTranslation
                                slug="description.sentEmail"
                                className="mr-1 ml-1"
                            />
                            <span className="text-second-secondary mr-1">
                                {props.primaryEmail}
                            </span>
                            {props.secondaryEmail && (
                                <>
                                    <GeneralTranslation
                                        slug="and"
                                        className="mr-1"
                                    />
                                    <span className="text-second-secondary">
                                        {props.secondaryEmail}
                                    </span>
                                </>
                            )}
                            .
                            <GeneralTranslation
                                slug="pleaseKindlyCheckIt"
                                className="ml-1"
                            />
                        </div>
                    </div>
                </Col>

                <Col xs={5} className="d-none d-md-block">
                    <GologsImage
                        name="doConfirmed.svg"
                        height={241}
                        width="auto"
                    />
                </Col>
            </Row>

            <Row className="fs-14px mt-15px md-mt-0px">
                <Col xs={12}>
                    <CustomerServiceInfo />
                </Col>
            </Row>
        </>
    );  
}