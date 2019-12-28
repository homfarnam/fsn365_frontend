import React from "react";
import NavLink from "../NavLink";
import FusionTable from "../FusionTable";

export default function NetworkStakingState({ data }) {
  return <FusionTable columns={columns} data={data} title={"Fusion Miners"} />;
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
    },
    render: row => row.tickets
  }
];
