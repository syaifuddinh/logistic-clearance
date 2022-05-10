import React from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "../../../components/Sidebar/Loadable";
import { GeneralTranslation } from "../../../components/Translation/Loadable";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/i18n";
import { ProcessStatuses } from "./Components/ProcessStatuses/Loadable";
import { RedirectToDORequest } from "./Components/RedirectToDORequest/Loadable";
import { Instructions } from "./Components/Instructions/Loadable";
import { ContractForm } from "./Components/ContractForm/Loadable";
import { DocumentForm } from "./Components/DocumentForm/Loadable";
import { ReviewForm } from "./Components/ReviewForm/Loadable";
import { ButtonBar } from "./Components/ButtonBar/Loadable";
import { Triangle } from "../../../../styles/Wizard";
import { Title } from "../../../../styles/Wizard";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";
import ShippingLineOrder from "../../../../endpoints/ShippingLineOrder";
import Contract from "../../../../endpoints/Master/Contract";

export default class DelegateCreate extends React.Component {
    state = {
        stepper: 0,
        isValid: {
            notifyPeopleEmail: false
        },
        data: {
            forwarderEmail: "",
            contractNumber: "",
            blNumber: "",
            freightForwarder: "",
            service: { label: "DO", value: "DO" },
            notifyPeopleEmail: "",
            mblHbl: {},
            attorneyLetter: {},
            letterOfIndemnity: {}
        },
        option: {},
        list: {
            freightForwarder: [],
            service: []
        }
    };

    
    componentDidMount() {
        this.setServiceByQuery();
    }
    
    getForwarderEmail = async (contractId) => {
        let response: any = {};
        let email: any = "";
        let data: any = this.state.data;
        if(contractId) {
            try {
                response = await Contract.show(contractId);
                data.forwarderEmail = response.emailPPJK;
            } catch(e) {
                
            }
        } else {
            data.forwarderEmail = "";
        }
        this.setState({data: data});
    }
    
    setServiceByQuery = () => {
        setTimeout(() => {
            let query: any = new URLSearchParams(window.location.search);
            let serviceName: any = query.get("service");
            let selectedService: any = {};
            let anyServiceByQuery: boolean = false;
            if(serviceName) {
                serviceName = serviceName.toUpperCase();
                if(serviceName === "DO" || serviceName === "SP2") {
                    selectedService = this.state.list.service.find((param: any) => param.value === serviceName);
                    if(selectedService) {
                        this.onDataChange("service", selectedService);
                        anyServiceByQuery = true;
                    }
                }
            }
            if(anyServiceByQuery === false) {
                this.onDataChange("service", { label: "DO", value: "DO" });
            }
        }, 200);
    }

    onDataChange = (fieldName, value) => {
        let data: any = this.state.data;
        data[fieldName] = value;
        this.setState({data: data});

        if (fieldName === "notifyPeopleEmail") {
            this.validateEmail(
                "notifyPeopleEmail",
                this.state.data.notifyPeopleEmail
            );
        }
    }

    onOptionChange = (fieldName, value) => {
        let option: any = this.state.option;
        option[fieldName] = value;
        this.setState({option: option});

        if (fieldName === "contractNumber") {
            let data: any = this.state.data;
            if(value) {
                data.contractNumber = value.label;
                data.freightForwarder = value.forwarderName;
                this.getForwarderEmail(value.value);
            } else {
                data.contractNumber = "";
                data.freightForwarder = "";
                this.getForwarderEmail("");                
            }
            this.setState({data: data});
        }
    }

    onFileDrop = async (fieldName, value, fileType) => {
        let data: any = this.state.data;
        let fd: any = new FormData();
        let blData: any = {};
        data[fieldName].isShowLoading = true;
        this.setState({data: data});
        fd.append("Type", fileType);
        fd.append("File", value);
        fd.append("FileName", fieldName);
        if(fieldName === "mblHbl") {
            blData = new FormData();
            blData.append("file", value);
            await ShippingLineOrder.readBl(blData)
            .then(resp => {
                let data: any = this.state.data;
                if(resp.data.blNumber) {
                    data.blNumber = resp.data.blNumber;
                }
                this.setState({data: data});
            })
            .catch(error => {
    
            });
        }
        
        DeliveryOrder.uploadDocument(fd)
        .then((resp: any) => {
            let data: any = this.state.data;
            data[fieldName].file = value;
            data[fieldName].fileName = value.name;
            data[fieldName].fileType = fileType;
            data[fieldName].generatedFileName = resp.data.fileName
            data[fieldName].isShowLoading = false;
            this.setState({data: data});
        })
        .catch(error => {
            let data: any = this.state.data;
            data[fieldName].isShowLoading = false;
            this.setState({data: data});
        });
    }

    onFileDelete = (fieldName, value) => {
        let data: any = this.state.data;
        data[fieldName] = {};
        this.setState({ data: data });
    }

    validateEmail = (fieldName, value) => {
        let isValid: any = this.state.isValid;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid[fieldName] = re.test(value);
    }

    nextStep = () => {
        let stepper = this.state.stepper;
        if (stepper < 2) {
            stepper += 1;
        }

        this.setState({stepper: stepper});
    }

    previousStep = () => {
        let stepper = this.state.stepper;
        if (stepper > 0) {
            stepper -= 1;
        }

        this.setState({stepper: stepper});
    }
    
    getHeader () {
        const { t } = useTranslation();
        
        return (
            <>
                <Helmet>
                    <title>{t(translations.delegate.title)}</title>
                </Helmet>
                <Sidebar
                    header-name={t(translations.delegate.title)}
                    subtitle={<GeneralTranslation slug="delegate" />}
                />
            </>
        );
    }

    
    render() {
        return (
            <div>
                <this.getHeader />

                <div className="gologs-container pb-4">
                    <ProcessStatuses service={this.state.data.service.value} />
                    <Triangle />
                    <div className="rounded-20px bg-white pb-3">
                        <Title>
                            <GeneralTranslation slug="requestDO.delegateNewOrder" />
                        </Title>

                        <Instructions step={this.state.stepper} />

                        <div className="p-3">
                            {this.state.stepper == 0 && (
                                <ContractForm
                                    list={this.state.list}
                                    data={this.state.data}
                                    onDataChange={this.onDataChange}
                                    option={this.state.option}
                                    onOptionChange={this.onOptionChange}
                                />
                            )}
                            {this.state.stepper == 1 && (
                                <DocumentForm
                                    data={this.state.data}
                                    onFileDrop={this.onFileDrop}
                                    onFileDelete={this.onFileDelete}
                                />
                            )}
                            {this.state.stepper == 2 && (
                                <ReviewForm data={this.state.data} />
                            )}
                        </div>
                    </div>

                    <div className="mt-32px d-flex justify-content-between align-items-center">
                        {this.state.stepper === 0 ? (
                            <RedirectToDORequest service={this.state.data.service.value} />
                        ) : (
                            <div></div>
                        )}
                        <ButtonBar
                            data={this.state.data}
                            stepper={this.state.stepper}
                            isValid={this.state.isValid}
                            nextStep={this.nextStep}
                            previousStep={this.previousStep}
                        />
                    </div>
                </div>
            </div>
        );
    }    
}