import React from "react";
import Box from "@material-ui/core/Box";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";

const tableOptions = {
  toolbar: false,
  pageSize: 5,
  pageSizeOptions: [5, 10]
};
export default function AddressHeldAssets({ assets }) {
  return <FusionTable columns={columns} data={assets} options={tableOptions} />;
}

const columns = [
  {
    field: "name",
    title: "Name",
    sorting: false,
    render: row => <NavLink href={`/asset/${row.assetID}`}>{row.name}</NavLink>
  },
  {
    field: "symbol",
    title: "Symbol",
    sorting: false,
    render: row => <span className="asset-symbol">{row.symbol}</span>
  },
  {
    field: "value",
    title: "Quantity",
    sorting: false,
    render: row => (
      <span className="asset-quantity">{row.value.toFixed(2)}</span>
    )
  }
];
