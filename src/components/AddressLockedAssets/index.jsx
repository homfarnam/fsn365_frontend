import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import UTCTime from "../UTCTime";

const tableOptions = {
  toolbar: false,
  pageSizeOptions: [5, 10, 25, 50, 100],
  pageSize: 5
};

export default function AddressHeldAssets({ assets = [] }) {
  return <FusionTable columns={columns} data={assets} options={tableOptions} />;
}

const columns = [
  {
    field: "name",
    title: "Asset",
    sorting: false,
    render: row => (
      <NavLink href={`/asset/${row.assetID}`}>{row.symbol}</NavLink>
    )
  },
  {
    field: "startTime",
    title: "Start At",
    sorting: false,
    render: row => <UTCTime time={row.startTime} timeago={false} />
  },
  {
    field: "endTime",
    title: "End At",
    sorting: false,
    render: row => <UTCTime time={row.endTime} timeago={false} />
  },
  {
    field: "value",
    title: "Quantity",
    sorting: false,
    render: row => <span>{row.value.toFixed(2)} </span>
  }
];
