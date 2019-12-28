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

export default function AddressHeldAssets({ assets }) {
  return <FusionTable columns={columns} data={assets} options={tableOptions} />;
}

const columns = [
  {
    field: "name",
    title: "Asset",
    sorting: false,
    render: row => (
      <NavLink href={`/assset/${row.id}`}>
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
        <TimeAgo time={row.startTime} />
      </span>
    )
  },
  {
    field: "endTime",
    title: "Will Unlock At",
    sorting: false,
    render: row => (
      <span>
        <TimeAgo time={row.endTime} />
      </span>
    )
  },
  {
    field: "quantity",
    title: "Quantity",
    sorting: false,
    render: row => <span>{row.quantity.toFixed(2)}</span>
  }
];
