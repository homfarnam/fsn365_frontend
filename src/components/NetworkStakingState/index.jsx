import React from "react";
import NavLink from "../NavLink";
import FusionTable from "../FusionTable";

export default function NetworkStakingState({ data, totalTickets }) {
  const tableOptions = {
    pageSizeOptions: [5, 10],
    pageSize: 5
  };
  const tableColumns = columns(totalTickets);
  return (
    <FusionTable
      columns={tableColumns}
      data={data}
      title={"Fusion Miners"}
      options={tableOptions}
    />
  );
}

const columns = totalTickets => {
  return [
    {
      field: "owner",
      title: "Miner",
      sorting: false,
      headerStyle: {
        width: "45%",
        textAlign: "center"
      },
      cellStyle: {
        width: "45%",
        textAlign: "center"
      },
      render: row => (
        <NavLink href={`/staking/${row.owner}`}>{row.owner}</NavLink>
      )
    },
    {
      field: "tickets",
      title: "Tickets",
      headerStyle: {
        width: "10%",
        textAlign: "center"
      },
      cellStyle: {
        width: "10%",
        textAlign: "center"
      }
    },
    {
      field: "tickets",
      title: "Possibility",
      headerStyle: {
        width: "25%",
        textAlign: "center"
      },
      cellStyle: {
        width: "25%",
        fontWeight: "bolder",
        textAlign: "center"
      },
      render: row => (
        <span>{((row.tickets / totalTickets) * 100).toFixed(4) + "%"}</span>
      )
    }
  ];
};
