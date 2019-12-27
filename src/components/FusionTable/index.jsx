import React from "react";
import MarterialTable from "material-table";

export const defaultWrapperStyle = {
  border: `1px solid #e7eaf3`,
  boxShadow: "0 0.5rem 1.2rem rgba(189,197,209,.2)"
};

export const defaultHeaderStyle = {
  color: "#6c757e",
  backgroundColor: "#f8fafd",
  borderTop: `1px solid #e7eaf3`,
  borderBottom: "2px solid #e7eaf3",
  verticalAlign: "top",
  fontWeight: "Bold",
  paddingLeft: ".75rem",
  paddingTop: ".625rem",
  paddingBottom: ".625rem"
};

export const defaultCellStyle = {
  padding: ".625rem 0",
  verticalAlign: "top",
  borderTop: `1px solid #e7eaf3`
};

export default function FusionTable(props) {
  const { data, columns, title, style = {}, ...others } = props;
  const FusionTableStyle = {
    defaultWrapperStyle,
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
