import React, { useState } from "react";
import Timekeeper from "react-timekeeper";
import { Form } from "react-bootstrap";

interface Props {
  onChange?: any;
}

export default function GologsTimepicker(props: Props) {
  const [isShow, setIsShow] = useState(false);
  const [time, setTime] = useState("08:00");
  const showTime = () => setIsShow(true);
  const hideTime = () => setIsShow(false);
  const onChange = newTime => {
    const time = newTime.formatted12;
    setTime(time);
    if (props.onChange) {
      props.onChange(time);
    }
  };

  return (
    <>
      <div className="position-relative">
        <Form.Control onClick={showTime} onBlur={hideTime} value={time} />
        {isShow && (
          <div className="position-absolute" style={{ zIndex: 500 }}>
            <Timekeeper
              hour24Mode={true}
              switchToMinuteOnHourSelect={true}
              onChange={onChange}
              closeOnMinuteSelect={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
