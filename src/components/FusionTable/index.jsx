import React from "react";
import MarterialTable from "material-table";

export const defaultTableStyle = {
  border: "none",
  boxShadow: "none",
  paddingBottom: "1.75rem"
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
  paddingBottom: ".625rem",
  textAlign: "center"
};

export const defaultCellStyle = {
  padding: ".625rem 0",
  verticalAlign: "top",
  borderTop: `1px solid #e7eaf3`,
  textAlign: "center"
};

export default function FusionTable(props) {
  const { data, columns, title, style = {}, options = {}, ...others } = props;
  const FusionTableStyle = {
    ...defaultTableStyle
  };
  const headerStyle = options.headerStyle || {};
  const cellStyle = options.cellStyle || {};
  const tableOptions = {
    ...options,
    cellStyle: {
      ...defaultCellStyle,
      ...cellStyle
    },
    headerStyle: {
      ...defaultHeaderStyle,
      ...headerStyle
    }
  };
  return (
    <MarterialTable
      columns={columns}
      data={data}
      title={title}
      style={FusionTableStyle}
      options={tableOptions}
      {...others}
    />
  );
}
