import React from "react";

interface Props {
    className?: string;
}

export default function HorizontalLine(props: Props) {

  return (
    <>
      <div className={"w-100 border-bottom border-muted " + props.className} style={{height : "2mm"}}></div>
    </>
  );
}
