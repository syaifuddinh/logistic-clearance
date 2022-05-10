import React from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";

export default function CompanyTypesSelect() {
  return (
    <select name="companyTypeId">
      <CompanyTypesOptions />
    </select>
  );
}

const companyTypesQuery = loader(
  "../../../graphql/queries/companyTypes.graphql"
);

function CompanyTypesOptions() {
  const { loading, error, data } = useQuery(companyTypesQuery);

  if (error) return <p>(Error!)</p>;
  if (loading) return <p>(Loading...)</p>;

  return data.companyTypes.map(({ id, typeName }) => (
    <option value={id}>{typeName}</option>
  ));
}
