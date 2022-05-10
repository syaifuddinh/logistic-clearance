import React from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Image } from "../../../styles/Sidebar";
import Service from "../../../model/Service";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../components/Translation/Loadable";
import { GologsButton } from "../../components/Button/Loadable";
import ChecklistCircle from "../../components/Widget/ChecklistCircle";
import { Redirect } from "react-router-dom";


export default class AddService extends React.Component {
    state = {
        isRedirect: false,
        urlRedirected: "",
        onCloseUrl: "",
        jobNumber: "",
        selected: [],
        isAllSelected: false
    };

    isSelected = (slug) => {
        let r: boolean = false;
        const idxSelected = this.state.selected.findIndex(x => x == slug)
        if (idxSelected > -1) {
            r = true;
        }

        return r;
        
    }

    onIsAllSelectedChange = () => {
        const r = !this.state.isAllSelected;
        let selected:string[] = this.state.selected;
        let activedServices: any = Service.index.filter(param => !param.isDisabled);
        if (r) {
            selected = [];
            selected = activedServices.map(v => v.slug);
        } else {
            selected = [];
        }
        this.setState({ isAllSelected: r });
        this.setState({ selected : selected });
    }
    
    onSelect = (slug:any) => {
        return () => {
            let selected:any = this.state.selected;
            let services: any = Service.index.find(param => param.slug === slug);
            const idxSelected = selected.findIndex(x => x == slug);
            if(services) {
                if(!services.isDisabled) {
                    if (idxSelected == -1) {
                        selected.push(slug)
                        this.setState({selected : selected})
                    } else {
                        selected = selected.filter(x => x != slug)
                        this.setState({selected : selected})
                    }
                }
            }
        }
    }    
    
    componentDidMount() {
        let successTransactionOnCloseUrl: any = window.localStorage.getItem(
            "successTransactionOnCloseUrl"
        );
        let onCloseUrl: string = this.state.onCloseUrl;
        if(successTransactionOnCloseUrl) {
            onCloseUrl = successTransactionOnCloseUrl;
        } else {
            onCloseUrl = "/home";
        }
        this.setState({ onCloseUrl: onCloseUrl });
    }
    
    redirectToTransaction = () => {
        this.setState({isTransactionRedirect : true});
    }

    onProceedOrder = () => {
        let i: number = 0;
        let service: any = {};
        let currentServiceIndex: number = -1;
        let urlRedirected: string = "";
        for(i = 0;i < Service.index.length;i++) {
            service = Service.index[i];
            currentServiceIndex = this.state.selected.findIndex(param => param === service.slug);
            if(currentServiceIndex > -1) {
                urlRedirected = service.url;
                this.setState({isRedirect: true})
                this.setState({ urlRedirected: urlRedirected });
                break;
            }
        }
    }
    
    onClose = () => {
        const urlRedirected = this.state.onCloseUrl;        
        this.setState({isRedirect: true})
        this.setState({ urlRedirected: urlRedirected });
    }
    
    getContent = props => {
        const { t } = useTranslation();
            
        let content = (
            <div className="gologs-container">
                <Card>
                    <Card.Body>
                        <Card.Text className="p-4">
                            <Row>
                                <Col xs={12}>
                                    <p className="text-center fs-18px">
                                        <GeneralTranslation slug="instruction.addNewService" />
                                    </p>
                                </Col>

                                {Service.index.map((v, idx) => (
                                    <Col xs={12} md={4} className="mt-2 mt-4">
                                        <div
                                            className="position-relative  w-70mm h-70mm mr-4 d-inline-block"
                                            onClick={props.onSelect(v.slug)}
                                        >
                                            <div
                                                className={
                                                    "d-flex flex-column px-4 border-muted align-items-center justify-content-center radius-10px h-100 " +
                                                    (v.isDisabled === true
                                                        ? "cursor-not-allowed "
                                                        : "hover hover-primary ") +
                                                    (props.isSelected &&
                                                    props.isSelected(v.slug)
                                                        ? "border-primary"
                                                        : "")
                                                }
                                            >
                                                <Image
                                                    style={{
                                                        width: "auto",
                                                        filter:
                                                            v.isDisabled ===
                                                            true
                                                                ? "grayscale(100%)"
                                                                : "grayscale(0%)"
                                                    }}
                                                    className="position-relative h-50"
                                                    src={v.image}
                                                />
                                                <p
                                                    className={
                                                        "fs-18px font-weight-bold text-capitalize " +
                                                        (v.isDisabled === true
                                                            ? "text-muted"
                                                            : "text-primary")
                                                    }
                                                >
                                                    {v.name}
                                                </p>
                                                <p className="text-very-muted fs-14px text-center">
                                                    {v.description}
                                                </p>
                                            </div>

                                            {props.isSelected &&
                                                props.isSelected(v.slug) && (
                                                    <ChecklistCircle
                                                        className="position-absolute"
                                                        style={{
                                                            top: "-4%",
                                                            right: "-4%"
                                                        }}
                                                    />
                                                )}
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                            <Row>
                                <Col
                                    xs={12}
                                    className="mt-4 d-flex align-items-center justify-content-between"
                                >
                                    <Form.Check
                                        type="checkbox"
                                        label="Select All"
                                        onChange={props.onIsAllSelectedChange}
                                        checked={props.isAllSelected}
                                    />

                                    <div className="d-flex ">
                                        <GologsButton
                                            variant="outline-primary"
                                            contentByTranslation={true}
                                            translation="cancel"
                                            onClick={props.onClose}
                                            className="mr-2"
                                        />

                                        <GologsButton
                                            variant="primary"
                                            contentByTranslation={true}
                                            translation="instruction.proceedOrder"
                                            onClick={props.onProceedOrder}
                                            disabled={this.state.selected.length === 0}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );

        return (
            <>
                <Helmet>
                    <title>Add Service</title>
                </Helmet>
                <Sidebar />
                {content}
            </>
        );
    };

    render() {
        return (
            <>
                <this.getContent
                    onSelect={this.onSelect}
                    isSelected={this.isSelected}
                    isAllSelected={this.state.isAllSelected}
                    selected={this.state.selected}
                    onIsAllSelectedChange={this.onIsAllSelectedChange}
                    onProceedOrder={this.onProceedOrder}
                    onClose={this.onClose}
                />

                {this.state.isRedirect === true && (
                    <Redirect
                        to={{
                            pathname: this.state.urlRedirected
                        }}
                    />
                )}
            </>
        );
    }
}
