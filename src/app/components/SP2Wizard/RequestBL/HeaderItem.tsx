import React from "react";

interface Props {
  title?: string;
  description?: string;
  offset?: number;
}
export default function HeaderItem(props: Props) {
  let offset = props.offset;
  if (!offset) {
    offset = 0;
  }

  return (
    <>
      <div>
        <div className={"mb-" + offset}>
          <small className="text-muted" style={{ fontSize: "3mm" }}>
            {props.title}
          </small>
        </div>

        <div>
          <div style={{ fontSize: "3.8mm" }}>{props.description}</div>
        </div>
      </div>
    </>
  );
}
