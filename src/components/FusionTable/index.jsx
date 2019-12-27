import React from 'react';
import MarterialTable from 'material-table';

export const FusionTableStyle = {
  border: `1px solid #e7eaf3`,
  boxShadow: '0 0.5rem 1.2rem rgba(189,197,209,.2)',
};

export default function FusionTable(props) {
  const { data, columns, title } = props;

  return (
    <MarterialTable
      columns={columns}
      data={data}
      title={title}
      style={FusionTableStyle}
    />
  );
}
