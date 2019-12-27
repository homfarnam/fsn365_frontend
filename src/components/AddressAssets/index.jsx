import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";

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
    pageSize: 10,
    paging: false,
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
    title: "Asset Name",
    render: row => {
      const href = `/assset/${row.id}`;
      return (
        <NavLink href={href} className="asset-name">
          {row.name}{" "}
        </NavLink>
      );
    }
  },
  {
    field: "symbol",
    title: "Asset Symbol",
    render: row => {
      return <span className="asset-symbol">{row.symbol}</span>;
    }
  },
  {
    field: "verified",
    title: "Is Verified",
    render: row => {
      return (
        <span className="asset-symbol">{row.verified ? "Yes" : "No"}</span>
      );
    }
  },
  {
    field: "quantity",
    title: "Quantity",
    render: row => {
      return <span className="asset-quantity">{row.quantity.toFixed(2)}</span>;
    }
  }
];
