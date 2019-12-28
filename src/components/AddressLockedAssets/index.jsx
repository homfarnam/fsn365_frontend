import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

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
    title: "Asset",
    sorting: false,
    render: row => (
      <NavLink href={`/assset/${row.id}`} className="a-na">
        {row.name} ({row.symbol})
      </NavLink>
    )
  },
  {
    field: "startTime",
    title: "Locked At",
    sorting: false,
    render: row => (
      <span className="a-lockedAt">
        <TimeAgo time={row.startTime} />
      </span>
    )
  },
  {
    field: "endTime",
    title: "Will Unlock At",
    sorting: false,
    render: row => (
      <span className="a-symbol">
        <TimeAgo time={row.endTime} />
      </span>
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
