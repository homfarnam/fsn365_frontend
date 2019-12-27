import React from "react";
import NavLink from "../NavLink";
import FusionTable, {
  defaultHeaderStyle,
  defaultCellStyle
} from "../FusionTable";

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
      ...defaultHeaderStyle,
      width: "95%"
    },
    cellStyle: {
      ...defaultCellStyle,
      width: "95%"
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
      ...defaultHeaderStyle,
      width: "5%",
      textAlign: "center"
    },
    cellStyle: {
      ...defaultCellStyle,
      width: "5%",
      textAlign: "center"
    },
    render: rowData => {
      return rowData.tickets;
    }
  }
];
