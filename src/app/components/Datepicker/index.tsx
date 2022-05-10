import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/Datepicker.css";
import moment from "moment";

export default class DatePick extends Component {
  state = {
    show: false,
    date: null,
    result: false,
    shippingline: null
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleChangeDate = (date, event) => {
    this.setState({ date });
  };

  handleChange = (selected, event) => {};

  handleClick = () => {
    this.setState({ result: true });
  };

  render() {
    return (
      <DatePicker
        placeholderText="Select Date"
        selected={this.state.date ? this.state.date : null}
        onChange={this.handleChangeDate}
        maxDate={moment().toDate()}
      />
    );
  }
}
