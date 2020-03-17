import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";

const tableOptions = {
  toolbar: false,
  pageSizeOptions: [5, 10, 25],
  pageSize: 5
};
export default function AddressHeldAssets({ assets }) {
  return <FusionTable columns={columns} data={assets} options={tableOptions} />;
}

const columns = [
  {
    field: "symbol",
    title: "Symbol",
    sorting: false,
    render: row => (
      <NavLink href={`/asset/${row.assetID}`}>{row.symbol}</NavLink>
    )
  },
  {
    field: "value",
    title: "Quantity",
    sorting: false,
    render: row => {
      if (row.value) {
        return <span className="asset-quantity">{row.value.toFixed(2)}</span>;
      }
      return null;
    }
  }
];
