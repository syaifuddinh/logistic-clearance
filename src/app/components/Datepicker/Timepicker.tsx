import React, { useState } from "react";
import Timekeeper from "react-timekeeper";
import { Form } from "react-bootstrap";

export default function GologsTimepicker() {
  const [isShow, setIsShow] = useState(false);
  const showTime = () => setIsShow(true);
  const hideTime = () => setIsShow(false);

  return (
    <>
      <Form.Control />
      {isShow && <Timekeeper />}
    </>
  );
}
