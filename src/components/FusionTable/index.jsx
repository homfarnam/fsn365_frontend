import React from "react";
import MarterialTable from "material-table";

export const defaultStyle = {
  border: `1px solid #e7eaf3`,
  boxShadow: "0 0.5rem 1.2rem rgba(189,197,209,.2)"
};

export default function FusionTable(props) {
  const { data, columns, title, style = {}, ...others } = props;
  const FusionTableStyle = {
    defaultStyle,
    ...style
  };
  return (
    <MarterialTable
      columns={columns}
      data={data}
      title={title}
      style={FusionTableStyle}
      {...others}
    />
  );
}
