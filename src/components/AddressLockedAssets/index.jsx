import React from "react";
import Box from "@material-ui/core/Box";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

const tableOptions = {
  toolbar: false,
  pageSize: 5,
  pageSizeOptions: [5, 10]
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
      <NavLink href={`/asset/${row.assetId}`}>
        {row.symbol}({row.name},
        {row.verified ? (
          <Box color="success.main" component="strong">
            Verified{" "}
          </Box>
        ) : (
          <Box color="error.main" component="strong">
            Unverfieid{" "}
          </Box>
        )}
        )
      </NavLink>
    )
  },
  {
    field: "startTime",
    title: "Locked At",
    sorting: false,
    render: row => (
      <span>
        <TimeAgo time={row.startTime * 1000} />
      </span>
    )
  },
  {
    field: "endTime",
    title: "Will Unlock At",
    sorting: false,
    render: row => (
      <span>
        <TimeAgo time={row.endTime * 1000} />
      </span>
    )
  },
  {
    field: "value",
    title: "Quantity",
    sorting: false,
    render: row => <span>{row.value.toFixed(2)} </span>
  }
];
