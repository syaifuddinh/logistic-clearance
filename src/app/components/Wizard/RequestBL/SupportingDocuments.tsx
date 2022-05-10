import React, { Component } from "react";
import { Form, Col, Alert } from "react-bootstrap";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";
import ShippingLineOrder from "../../../../endpoints/ShippingLineOrder";
import InTransit from "../../../../endpoints/Master/InTransit";
import Gologs from "../../../../model/Gologs";
import Dropfile from "../../Dropfile/Dropfile";
import { GeneralTranslation } from "../../Translation/Loadable";
import { RedAsterisk } from "../../RedAsterisk/Loadable";

interface IProps {
    data?: any;
    onBlSubmit?: any;
    onSuratKuasaSubmit?: any;
    onSuratKontainerSubmit?: any;
    onLetterIndemnitySubmit?: any;
    handleDeleteBL?: any;
    handleDeleteSuratKuasa?: any;
    handleDeleteSuratKontainer?: any;
    handleDeleteLetterIndemnity?: any;
};

export default class SupportingDocuments extends Component<IProps> {
    state = {
        blFileDocument: null,
        suratKuasaFileDocument: null,
        suratKontainerFileDocument: null,
        letterIndemnityFileDocument: null,

        blFile: null,
        suratKuasaFile: null,
        suratKontainerFile: null,
        letterIndemnityFile: null,
        blFileShowLoading: false,
        suratKuasaFileShowLoading: false,
        suratKontainerFileShowLoading: false,
        letterIndemnityFileShowLoading: false,

        blError: false,
        blSuccess: false,
        blErrorMessage: null,
        blSuccessMessage: null,

        suratKuasaError: false,
        suratKuasaSuccess: false,
        suratKuasaErrorMessage: null,
        suratKuasaSuccessMessage: null,

        suratKontainerError: false,
        suratKontainerSuccess: false,
        suratKontainerErrorMessage: null,
        suratKontainerSuccessMessage: null,

        letterIndemnityError: false,
        letterIndemnitySuccess: false,
        letterIndemnityErrorMessage: null,
        letterIndemnitySuccessMessage: null
    };

    constructor(props) {
        super(props);
        const cargoOwnerDo = window.localStorage.getItem(
            "cargoOwnerDo"
        );
        if (cargoOwnerDo) {
            const params = JSON.parse(cargoOwnerDo);

            this.changeState("suratKuasaFile", params.suratKuasaFile);
            this.changeState("blFile", params.blFile);
            this.changeState(
                "suratKontainerFile",
                params.suratKontainerFile
            );
            this.changeState(
                "letterIndemnityFile",
                params.letterIndemnityFile
            );
        }
    }

        changeState = (key, value) => {
            let state = this.state;
            state[key] = value;
            this.setState(state);
            this.saveStorage();
        };

        saveStorage = () => {
            let state = JSON.stringify(this.state);
            localStorage.setItem("cargoOwnerDo", state);
        };

        showBlSuccess = msg => {
            this.changeState("blSuccess", true);
            this.changeState("blSuccessMessage", msg);
            setTimeout(() => {
                this.changeState("blSuccessMessage", null);
                this.changeState("blSuccess", false);
            }, 5000);
        };

        showBlError = msg => {
            this.changeState("blError", true);
            this.changeState("blErrorMessage", msg);
            setTimeout(() => {
                this.changeState("blErrorMessage", null);
                this.changeState("blError", false);
            }, 5000);
        };

        showLetterIndemnityError = msg => {
            this.changeState("letterIndemnityError", true);
            this.changeState("letterIndemnityErrorMessage", msg);
            setTimeout(() => {
                this.changeState("letterIndemnityErrorMessage", null);
                this.changeState("letterIndemnityError", false);
            }, 5000);
        };

        showSuratKuasaError = msg => {
            this.changeState("suratKuasaError", true);
            this.changeState("suratKuasaErrorMessage", msg);
            setTimeout(() => {
                this.changeState("suratKuasaErrorMessage", null);
                this.changeState("suratKuasaError", false);
            }, 5000);
        };

        showSuratKontainerError = msg => {
            this.changeState("suratKontainerError", true);
            this.changeState("suratKontainerErrorMessage", msg);
            setTimeout(() => {
                this.changeState("suratKontainerErrorMessage", null);
                this.changeState("suratKontainerError", false);
            }, 5000);
        };

        readBl = (file, fn = () => {}) => {
            let fd = new FormData();
            fd.append("file", file);
            ShippingLineOrder.readBl(fd)
            .then(resp => {
                if (resp.data.blNumber) {
                        if (resp.data.blNumber.trim() == this.props.data.blNumber.trim()) {
                            fd = new FormData();
                            fd.append("Type", "BL");
                            fd.append("File", file);
                            fd.append("FileName", file.name);
                            this.uploadBl(fd);
                        } else {
                            this.changeState("blFile", null);
                            this.changeState("blFileShowLoading", false);
                            this.showBlError(
                                "BL Dokumen tidak valid, silahkan upload ulang BL yang sesuai."
                                );
                            }
                            
                } else {
                    this.changeState("blFile", null);
                    this.changeState("blFileShowLoading", false);
                    this.showBlError(
                      "BL Dokumen tidak valid, silahkan upload ulang BL yang sesuai."
                    );
                }
            })
            .catch(error => {
                InTransit.store({
                    service: "DO",
                    errorMessage:
                        "System can't read BL Number By OCR - " + error.message
                });
                let fd: any = new FormData();
                fd.append("Type", "BL");
                fd.append("File", file);
                fd.append("FileName", file.name);
                this.uploadBl(fd);
            });
        };

        handleDropBL = acceptedFiles => {
            acceptedFiles.map(file => {
                let fd = new FormData();
                this.changeState("blFileShowLoading", true);
                this.changeState("blFile", file.name);
                this.readBl(file);
            });
        };

        uploadBl = fd => {
            DeliveryOrder.uploadDocument(fd)
                .then(data => {
                const file = fd.get("File")
                this.changeState("blFileDocument", file);
                this.changeState("blFileShowLoading", false);
                this.props.onBlSubmit(file, data.data)
            })
            .catch(error => {
                this.changeState("blFile", null);
                this.changeState("blFileShowLoading", false);
                InTransit.store({
                    service: "DO",
                    errorMessage:
                        "System can't upload BL Document - " + error.message
                });
            });
        };

        handleDropLetterIndemnity = acceptedFiles => {
            acceptedFiles.map(file => {
                let fd = new FormData();
                let state = this.state;
                state.letterIndemnityFile = file.name;
                this.setState(state);
                this.saveStorage();
                this.changeState("letterIndemnityFileShowLoading", true);
                fd.append("Type", "LainLain");
                fd.append("File", file);
                fd.append("FileName", file.name);
                DeliveryOrder.uploadDocument(fd)
                .then(data => {
                    this.changeState(
                        "letterIndemnityFileShowLoading",
                        false
                    );
                    this.changeState("letterIndemnityFileDocument", file);
                    const doc = fd.get("File");
                    this.props.onLetterIndemnitySubmit(doc, data.data);
                })
                .catch(error => {
                    this.changeState(
                        "letterIndemnityFileShowLoading",
                        false
                    );
                    this.changeState("letterIndemnityFile", null);
                    this.showLetterIndemnityError("Terjadi kesalahan pada server");
                    InTransit.store({
                        service: "DO",
                        errorMessage:
                            "System can't upload Letter Of Indemnity Document - " + error.message
                    });
                });
            });
        };

        handleDropSuratKontainer = acceptedFiles => {
            acceptedFiles.map(file => {
                let state = this.state;
                state.suratKontainerFile = file.name;
                this.setState(state);
                this.saveStorage();
                this.changeState("suratKontainerFileShowLoading", true);
                let fd = new FormData();
                fd.append("Type", "LainLain");
                fd.append("File", file);
                fd.append("FileName", file.name);
                DeliveryOrder.uploadDocument(fd)
                .then(data => {
                    this.changeState(
                        "suratKontainerFileShowLoading",
                        false
                    );
                    this.changeState("suratKontainerFileDocument", file);
                    const doc = fd.get("File");
                    this.props.onSuratKontainerSubmit(doc, data.data);
                })
                .catch(error => {
                    this.changeState(
                        "suratKontainerFileShowLoading",
                        false
                    );
                    this.changeState("suratKontainerFile", false);
                    this.showSuratKontainerError(
                      "Terjadi kesalahan pada server"
                    );
                    InTransit.store({
                        service: "DO",
                        errorMessage:
                            "System can't upload Surat Peminjaman Kontainer Document - " + error.message
                    });
                });
            });
        };

        handleDropSuratKuasa = acceptedFiles => {
            acceptedFiles.map(file => {
                let state = this.state;
                state.suratKuasaFile = file.name;
                this.setState(state);
                this.saveStorage();
                this.changeState("suratKuasaFileShowLoading", true);
                let fd = new FormData();
                fd.append("Type", "SuratKuasa");
                fd.append("File", file);
                fd.append("FileName", file.name);
                DeliveryOrder.uploadDocument(fd)
                .then(data => {
                    this.changeState("suratKuasaFileShowLoading", false);
                    this.changeState("suratKuasaFileDocument", file);
                    const doc = fd.get("File");
                    
                    this.props.onSuratKuasaSubmit(doc, data.data);
                })
                .catch(error => {
                    this.changeState("suratKuasaFileShowLoading", false);
                    this.changeState("suratKuasaFile", null);
                    this.showSuratKuasaError(
                        "Terjadi kesalahan pada server"
                    );
                    InTransit.store({
                        service: "DO",
                        errorMessage:
                            "System can't upload Surat Kuasa Document - " +
                            error.message
                    });
                });
            });
        };

                 render() {
                   return (
                       <Form className="col-md-12">
                           <div className="mb-2 fs-18px">
                               <GeneralTranslation slug="wizard.bottom.uploadDocument" />
                           </div>
                           <Form.Row>
                               <Form.Group
                                   as={Col}
                                   lg={6}
                                   className="pr-0px md-pr-25px"
                               >
                                   <Form.Label>
                                       MBL/HBL File
                                       <RedAsterisk />
                                   </Form.Label>
                                   <Dropfile
                                       onDrop={this.handleDropBL}
                                       onDelete={this.props.handleDeleteBL}
                                       showLoading={
                                           this.state.blFileShowLoading
                                       }
                                       file={this.props.data.blFileDocument}
                                       fileName={Gologs.renameFile(
                                           this.props.data.blFileDocumentName
                                       )}
                                   />

                                   {this.state.blError && (
                                       <Alert variant="danger" className="mt-2">
                                           {this.state.blErrorMessage}
                                       </Alert>
                                   )}
                               </Form.Group>
                               <Form.Group
                                   as={Col}
                                   lg={6}
                                   className="pr-0px md-pl-25px"
                               >
                                   <Form.Label>Letter of Indemnity</Form.Label>
                                   <Dropfile
                                       onDrop={this.handleDropLetterIndemnity}
                                       onDelete={
                                           this.props
                                               .handleDeleteLetterIndemnity
                                       }
                                       showLoading={
                                           this.state
                                               .letterIndemnityFileShowLoading
                                       }
                                       fileName={Gologs.renameFile(
                                           this.props.data
                                               .letterIndemnityFileDocumentName
                                       )}
                                       file={
                                           this.props.data
                                               .letterIndemnityFileDocument
                                       }
                                   />

                                   {this.state.letterIndemnityError && (
                                       <Alert variant="danger" className="mt-2">
                                           {
                                               this.state
                                                   .letterIndemnityErrorMessage
                                           }
                                       </Alert>
                                   )}
                               </Form.Group>
                           </Form.Row>
                           <Form.Row>
                               <Form.Group
                                   as={Col}
                                   lg={6}
                                   className="pr-0px md-pr-25px"
                               >
                                   <Form.Label>
                                       Surat Peminjaman Kontainer File
                                   </Form.Label>
                                   <Dropfile
                                       onDrop={this.handleDropSuratKontainer}
                                       onDelete={
                                           this.props.handleDeleteSuratKontainer
                                       }
                                       showLoading={
                                           this.state
                                               .suratKontainerFileShowLoading
                                       }
                                       fileName={Gologs.renameFile(
                                           this.props.data
                                               .suratKontainerFileDocumentName
                                       )}
                                       file={
                                           this.props.data
                                               .suratKontainerFileDocument
                                       }
                                   />

                                   {this.state.suratKontainerError && (
                                       <Alert variant="danger" className="mt-2">
                                           {
                                               this.state
                                                   .suratKontainerErrorMessage
                                           }
                                       </Alert>
                                   )}
                               </Form.Group>
                               <Form.Group
                                   as={Col}
                                   lg={6}
                                   className="pr-0px md-pl-25px"
                               >
                                   <Form.Label>Surat Kuasa File</Form.Label>
                                   <Dropfile
                                       onDrop={this.handleDropSuratKuasa}
                                       onDelete={
                                           this.props.handleDeleteSuratKuasa
                                       }
                                       showLoading={
                                           this.state.suratKuasaFileShowLoading
                                       }
                                       fileName={Gologs.renameFile(
                                           this.props.data
                                               .suratKuasaFileDocumentName
                                       )}
                                       file={
                                           this.props.data
                                               .suratKuasaFileDocument
                                       }
                                   />

                                   {this.state.suratKuasaError && (
                                       <Alert variant="danger" className="mt-2">
                                           {this.state.suratKuasaErrorMessage}
                                       </Alert>
                                   )}
                               </Form.Group>
                           </Form.Row>
                       </Form>
                   );
                 }
               }
