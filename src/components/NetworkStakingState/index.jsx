import React from "react";
import NavLink from "../NavLink";
import FusionTable from "../FusionTable";

export default function NetworkStakingState(props) {
  const { data } = props;
  const style = {
    border: "none",
    boxShadow: "none",
    paddingBottom: "1.75rem"
  };
  return (
    <FusionTable
      columns={columns}
      data={data}
      title={"Fusion Miners"}
      style={style}
    />
  );
}

const columns = [
  {
    field: "owner",
    title: "Miner",
    sorting: false,
    headerStyle: {
      width: "65%",
      padding: ".625rem 0",
      verticalAlign: "top",
      borderTop: `1px solid #e7eaf3`
    },
    cellStyle: {
      width: "65%",
      padding: ".625rem 0",
      verticalAlign: "top",
      borderTop: `1px solid #e7eaf3`
    },
    render: rowData => {
      return (
        <NavLink href={`/staking/${rowData.owner}`}>{rowData.owner}</NavLink>
      );
    }
  },
  {
    field: "tickets",
    title: "Tickets",
    headerStyle: {
      width: "5%",
      padding: ".625rem 0",
      verticalAlign: "top",
      borderTop: `1px solid #e7eaf3`,
      textAlign: "center"
    },
    cellStyle: {
      width: "5%",
      padding: ".625rem 0",
      verticalAlign: "top",
      borderTop: `1px solid #e7eaf3`,
      textAlign: "center"
    },
    render: rowData => {
      return rowData.tickets;
    }
  }
];
