import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";

const tableOptions = {
  toolbar: false,
  pageSize: 10,
  paging: false,
  pageSizeOptions: [5, 10]
};
export default function AddressHeldAssets({ assets }) {
  return <FusionTable columns={columns} data={assets} options={tableOptions} />;
}

const columns = [
  {
    field: "name",
    title: "Asset Name",
    sorting: false,
    render: row => <NavLink href={`/assset/${row.id}`}>{row.name}</NavLink>
  },
  {
    field: "symbol",
    title: "Asset Symbol",
    sorting: false,
    render: row => <span className="asset-symbol">{row.symbol}</span>
  },
  {
    field: "verified",
    title: "Is Verified",
    sorting: false,
    render: row => (
      <span className="asset-symbol">{row.verified ? "Yes" : "No"}</span>
    )
  },
  {
    field: "quantity",
    title: "Quantity",
    sorting: false,
    render: row => (
      <span className="asset-quantity">{row.quantity.toFixed(2)}</span>
    )
  }
];
