import React from "react";
import NavLink from "../NavLink";
import FusionTable from "../FusionTable";

export default function NetworkStakingState({ data }) {
  const tableOptions = {
    pageSizeOptions: [5, 10],
    pageSize: 5
  };
  return (
    <FusionTable
      columns={columns}
      data={data}
      title={"Fusion Miners"}
      options={tableOptions}
    />
  );
}

const columns = [
  {
    field: "owner",
    title: "Miner",
    sorting: false,
    headerStyle: {
      width: "55%",
      textAlign: "center"
    },
    cellStyle: {
      width: "55%",
      textAlign: "center"
    },
    render: row => <NavLink href={`/staking/${row.owner}`}>{row.owner}</NavLink>
  },
  {
    field: "tickets",
    title: "Tickets",
    headerStyle: {
      width: "45%",
      textAlign: "center"
    },
    cellStyle: {
      width: "45%",
      textAlign: "center"
    }
  }
];
