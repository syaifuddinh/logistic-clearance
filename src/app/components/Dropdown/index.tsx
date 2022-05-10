import React from "react";
import { Select } from "../../../styles/Dropdown";

interface Props {
  name?: string;
  data?: any;
}

const Option = (props: Props) => {
  return props.data.map((key, i) => (
    <option key={i} value={key.key}>
      {key.value}
    </option>
  ));
};

export default function Dropdown(props) {
  return (
    <Select name={props.name}>
      <Option data={props.data} />
    </Select>
  );
}
