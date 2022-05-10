import React from "react";
import { Card, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  length: number;
  activeSection?: number;
}

export default function CargoOwnerStatusIndicator(props: Props) {
  let sections: number[] = [];
  let activePoint: string = "";
  let points = Number(props.activeSection);
  for (let i = 0; i < props.length; i++) {
    sections.push(i + 1);
  }
  switch (points - 1) {
    case 1:
      activePoint = "Waiting FF/PPJK Confirmation";
      break;
    case 2:
      activePoint = "Upload proforma";
      break;
    case 3:
      activePoint = "Upload DO & Invoice";
      break;
    case 4:
      activePoint = "Waiting DO & Invoice";
      break;
    case 5:
      activePoint = "Waiting DO & Invoice";
      break;
    case 6:
      activePoint = "Finish";
      break;
    default:
      activePoint = "Confirm Request";
  }

  return (
    <>
      <div>
        <span className="d-inline-block mb-2">{activePoint}</span>{" "}
      </div>
      <div className="d-flex flex-column justify-content-center position-relative w-100 ">
        <hr className="w-100 pull-left position-absolute border-gray" />
        <div className="d-flex justify-content-between" style={{ zIndex: 10 }}>
          {props.length &&
            sections.map((x, i) => {
              let result: any = x;
              let colorClass: string = "bg-gray";
              if (props.activeSection && x < props.activeSection) {
                result = (
                  <span style={{ fontSize: "1.7mm" }}>
                    <FontAwesomeIcon icon={faCheck} />{" "}
                  </span>
                );
                colorClass = "bg-primary text-white";
              }
              return (
                <div
                  style={{ width: "4.8mm", height: "4.8mm", fontSize: "2.3mm" }}
                  className={
                    "font-weight-bold d-inline-flex justify-content-center align-items-center rounded-circle " +
                    colorClass
                  }
                >
                  {result}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
