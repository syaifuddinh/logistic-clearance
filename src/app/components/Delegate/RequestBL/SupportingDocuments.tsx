import React, { Component } from "react";
import { Form, Col, Alert } from "react-bootstrap";
import DeliveryOrder from "../../../../endpoints/DeliveryOrder";
import ShippingLineOrder from "../../../../endpoints/ShippingLineOrder";
import Dropfile from "../../Dropfile/Dropfile";

export default class SupportingDocuments extends Component {
  state = {
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
    suratKuasaSuccessMessage: null
  };

  constructor(props) {
    super(props);
    const cargoOwnerDo = window.localStorage.getItem("cargoOwnerDo");
    if (cargoOwnerDo) {
      const params = JSON.parse(cargoOwnerDo);

      this.changeState("suratKuasaFile", params.suratKuasaFile);
      this.changeState("blFile", params.blFile);
      this.changeState("suratKontainerFile", params.suratKontainerFile);
      this.changeState("letterIndemnityFile", params.letterIndemnityFile);
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

  readBl = (file, fn = () => {}) => {
    let fd = new FormData();
    fd.append("file", file);
    ShippingLineOrder.readBl(fd)
      .then(resp => {
        this.changeState("blFileShowLoading", false);
        this.showBlSuccess("BL berhasil diupload");
      })
      .catch(error => {
        this.changeState("blFile", null);
        this.changeState("blFileShowLoading", false);
        this.showBlError("Terjadi kesalahan pada server");
      });
  };

  handleDeleteBL = () => {
    let state = this.state;
    state.blFile = null;
    this.setState(state);
    this.saveStorage();
  };

  handleDeleteSuratKuasa = () => {
    let state = this.state;
    state.suratKuasaFile = null;
    this.setState(state);
    this.saveStorage();
  };

  handleDeleteSuratKontainer = () => {
    let state = this.state;
    state.suratKontainerFile = null;
    this.setState(state);
    this.saveStorage();
  };

  handleDeleteLetterIndemnity = () => {
    let state = this.state;
    state.letterIndemnityFile = null;
    this.setState(state);
    this.saveStorage();
  };

  handleDropBL = acceptedFiles => {
    acceptedFiles.map(file => {
      let fd = new FormData();
      let state = this.state;
      state.blFile = file.name;
      this.setState(state);
      this.saveStorage();
      this.changeState("blFileShowLoading", true);
      fd.append("Type", "BL");
      fd.append("File", file);
      fd.append("FileName", file.name);
      this.readBl(fd);
    });
  };

  uploadBl = fd => {
    DeliveryOrder.uploadDocument(fd)
      .then(data => {
        this.changeState("blFileShowLoading", false);
        window.console.log(data);
      })
      .catch(error => {
        this.changeState("blFile", null);
        this.changeState("blFileShowLoading", false);
        window.console.log(error.response);
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
          this.changeState("letterIndemnityFileShowLoading", false);
          window.console.log(data);
        })
        .catch(error => {
          this.changeState("letterIndemnityFileShowLoading", false);
          window.console.log(error.response);
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
          this.changeState("suratKontainerFileShowLoading", false);
          window.console.log(data);
        })
        .catch(error => {
          this.changeState("suratKontainerFileShowLoading", false);
          window.console.log(error.response);
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
          window.console.log(data);
          this.changeState("suratKuasaFileShowLoading", false);
        })
        .catch(error => {
          this.changeState("suratKuasaFileShowLoading", false);
          window.console.log(error.response);
        });
    });
  };
  render() {
    return (
      <Form className="col-md-12">
        <Form.Row>
          <Form.Group as={Col} sm={1} />
          <Form.Group as={Col} sm={4}>
            <Form.Label>MBL/HBL File</Form.Label>
            <Dropfile
              onDrop={this.handleDropBL}
              onDelete={this.handleDeleteBL}
              showLoading={this.state.blFileShowLoading}
              fileName={this.state.blFile}
            />

            {this.state.blError && (
              <Alert variant="danger" className="mt-2">
                {this.state.blErrorMessage}
              </Alert>
            )}
          </Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={4}>
            <Form.Label>Letter of Indemnity</Form.Label>
            <Dropfile
              onDrop={this.handleDropLetterIndemnity}
              onDelete={this.handleDeleteLetterIndemnity}
              showLoading={this.state.letterIndemnityFileShowLoading}
              fileName={this.state.letterIndemnityFile}
            />
          </Form.Group>
          <Form.Group as={Col} sm={1} />
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={1} />
          <Form.Group as={Col} sm={4}>
            <Form.Label>Surat Peminjaman Kontainer File</Form.Label>
            <Dropfile
              onDrop={this.handleDropSuratKontainer}
              onDelete={this.handleDeleteSuratKontainer}
              showLoading={this.state.suratKontainerFileShowLoading}
              fileName={this.state.suratKontainerFile}
            />
          </Form.Group>
          <Form.Group as={Col} sm={2} />
          <Form.Group as={Col} sm={4}>
            <Form.Label>Surat Kuasa File</Form.Label>
            <Dropfile
              onDrop={this.handleDropSuratKuasa}
              onDelete={this.handleDeleteSuratKuasa}
              showLoading={this.state.suratKuasaFileShowLoading}
              fileName={this.state.suratKuasaFile}
            />
          </Form.Group>
          <Form.Group as={Col} sm={1} />
        </Form.Row>
      </Form>
    );
  }
}
