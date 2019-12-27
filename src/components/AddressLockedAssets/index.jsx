import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

export default function AddressHeldAssets(props) {
  const { assets } = props;
  const style = {
    border: "none",
    boxShadow: "none",
    paddingBottom: "1.75rem"
  };
  const tableOptions = {
    headerStyle: {
      textAlign: "center"
    },
    cellStyle: {
      textAlign: "center"
    },
    toolbar: false,
    pageSize: 5,
    pageSizeOptions: [5, 10]
  };
  return (
    <FusionTable
      columns={columns}
      data={assets}
      style={style}
      options={tableOptions}
    />
  );
}

const columns = [
  {
    field: "name",
    title: "Asset",
    sorting: false,
    render: row => {
      const href = `/assset/${row.id}`;
      return (
        <NavLink href={href} className="a-na">
          {row.name} ({row.symbol})
        </NavLink>
      );
    }
  },
  {
    field: "startTime",
    title: "Locked At",
    sorting: false,
    render: row => {
      return (
        <span className="a-lockedAt">
          <TimeAgo time={row.startTime} />
        </span>
      );
    }
  },
  {
    field: "endTime",
    title: "Will Unlock At",
    sorting: false,
    render: row => {
      return (
        <span className="a-symbol">
          <TimeAgo time={row.endTime} />
        </span>
      );
    }
  },
  {
    field: "quantity",
    title: "Quantity",
    sorting: false,
    render: row => {
      return <span className="asset-quantity">{row.quantity.toFixed(2)}</span>;
    }
  }
];
