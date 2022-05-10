import React from "react";

export default function Tax(props) {
  return (
    <>
      <div>
        <div className="form-group">
          <label>NPWP or Tax ID (for Indonesian)</label>
          <input
            className="form-control"
            placeholder="16 digit number"
            value={props.value}
            onChange={props.onChange}
          ></input>
        </div>
      </div>
    </>
  );
}
