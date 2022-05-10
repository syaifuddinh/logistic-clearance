import React, { Component } from "react";
import { GeneralTranslation } from "../../../../../components/Translation/Loadable";
import { GologsIcon } from "../../../../../components/Icon/Loadable";
import { GologsImage } from "../../../../../components/Image/Loadable";
import { CopyButton } from "../../../../../components/Button/Copy/Loadable";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import NumberFormat from "react-number-format";

type IProps = {
    virtualAccountNumber: string;
    dueDate: string;
    totalPayment: number;
};

export default class PaymentConfirmation extends Component<IProps> {
    state = {
        dueDate : "",
        remainingTime : "",
        interval : 0
    };

    constructor(props) {
        super(props);

        setTimeout(() => {
            let dueDate:any = new Date(this.props.dueDate);
            dueDate = moment(dueDate);
            let formattedDueDate = dueDate.format("DD MMM YYYY, HH:mm")
            this.setState({ dueDate: formattedDueDate });
        }, 200);
        
        

    }

    countRemainingTime() {
        let dueDate: any = new Date(this.props.dueDate);
        dueDate = moment(dueDate);
        let now: any = moment(new Date());

        let timeleft: number = dueDate.diff(now);

        let hours: number = Math.floor(
            (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes: number = Math.floor(
            (timeleft % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds: number = Math.floor((timeleft % (1000 * 60)) / 1000);
        let remainingTime: string = hours + ":" + minutes + ":" + seconds;
        window.console.log(remainingTime);
        this.setState({ remainingTime: remainingTime });
    }
    
    componentDidMount() {
        let i: any = setInterval(
            () => {
                this.countRemainingTime();
            }, 1000
        )
        this.setState({interval : i})
    }
    componentWillUnmount() {
        clearInterval(this.state.interval)
    }
    
    render() {
        return (
            <>
                <GeneralTranslation
                    slug="paymentAndConfirmation"
                    className="fs-18px font-weight-light-bolder"
                />

                <Row className="mt-3 d-flex rounded-20px bg-semi-primary">
                    <Col 
                        className="p-4" 
                        xs="8"
                    >
                        <GeneralTranslation
                            slug="completeYourPaymentBefore"
                            className="fs-14px mb-3"
                        />
                        <div className="fs-24px">{this.state.dueDate}</div>
                    </Col>
                    <Col
                        className="p-4 rounded-20px bg-primary text-white d-flex align-items-center justify-content-center"
                        xs="4"
                    >
                        <GologsIcon
                            width={48}
                            height={48}
                            name="whiteClock.svg"
                        />
                        <div className="ml-2">
                            <GeneralTranslation
                                slug="remainingTime"
                                className="fs-14px"
                            />
                            <div className="font-weight-light-bolder fs-24px">
                                { this.state.remainingTime }
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5 d-flex">
                    <Col xs="12">
                        <GologsImage
                            name="primaryBankMandiri.svg"
                            width={212.32}
                            height={64}
                        />

                        <div className="fs-14px text-primary-gray font-weight-light-bolder">
                            Bank Mandiri
                        </div>
                    </Col>
                </Row>

                <Row className="mt-5 d-flex">
                    <Col xs="12">
                        <GeneralTranslation
                            slug="virtualAccountNumber"
                            className="fs-16px font-weight-light-bolder text-primary-gray"
                        />
                    </Col>
                </Row>

                <Row className="mt-2 d-flex align-items-center">
                    <Col 
                        xs="6" 
                        className="r-3"
                    >
                        <div className="p-3 rounded-20px bg-semi-primary font-weight-bold w-100 d-flex justify-content-center fs-32px">
                            {this.props.virtualAccountNumber}
                        </div>
                    </Col>

                    <Col 
                        xs="6" 
                        className="d-flex align-items-center"
                    >
                        <CopyButton value={this.props.virtualAccountNumber} />
                    </Col>
                </Row>

                <Row className="mt-5 d-flex">
                    <Col xs="12">
                        <GeneralTranslation
                            slug="totalPayment"
                            className="fs-16px font-weight-light-bolder text-primary-gray"
                        />
                    </Col>
                </Row>

                <Row className="mt-2 d-flex align-items-center">
                    <Col 
                        xs="12" 
                        md="4" 
                        className="r-3"
                    >
                        <div className="p-3 font-weight-bold w-100 fs-32px">
                            <NumberFormat
                                value={this.props.totalPayment}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"IDR "}
                            />
                        </div>
                    </Col>

                    <Col 
                        xs="12" 
                        md="8" 
                        className="d-flex align-items-center"
                    >
                        <GeneralTranslation
                            slug="seePaymentDetail"
                            className="ml-2 fs-14px text-second-primary font-weight-light-bolder"
                        />
                    </Col>
                </Row>

                <Row className="mt-5 d-flex">
                    <Col xs="12">
                        <GeneralTranslation
                            slug="paymentCanBeTransferedThrough"
                            className="fs-16px font-weight-light-bolder text-primary-gray"
                        /> :
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col 
                        xs="12" 
                        className="d-flex"
                    >
                        <GologsImage
                            name="secondaryBankMandiri.svg"
                            width={"auto"}
                            height={30.73}
                            className="mr-3"
                            />
                                            
                        <GologsImage
                            name="himbara.svg"
                            width={"auto"}
                            height={33}
                            className="mr-3"
                        />

                        <GologsImage
                            name="mandiriOnline.svg"
                            width={"auto"}
                            height={33}
                            className="mr-3"
                        />
                    </Col>
                </Row>
            </>
        );  
    }
}