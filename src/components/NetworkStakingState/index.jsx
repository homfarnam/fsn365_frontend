import React from "react";
import { MTableToolbar } from "material-table";
import FusionTable from "../FusionTable";
import FusionAddressLink from "../../components/FusionAddressLink";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      paddingLeft: 0,
      minHeight: "none",
      color: "#4a4f55"
    }
  })
);

export default function NetworkStakingState({ data, totalTickets }) {
  const tableOptions = {
    pageSizeOptions: [5, 10],
    pageSize: 5
  };
  const style = useStyles();
  const tableColumns = columns(totalTickets);
  return (
    <FusionTable
      columns={tableColumns}
      data={data}
      title={"Active Miners"}
      options={tableOptions}
      components={{
        Toolbar: props => (
          <MTableToolbar {...props} classes={{ root: style.root }} />
        )
      }}
    />
  );
}

const columns = totalTickets => {
  return [
    {
      field: "owner",
      title: "Miner",
      sorting: false,
      render: row => <FusionAddressLink address={row.owner} miner={true} />
    },
    {
      field: "tickets",
      title: "Tickets"
    },
    {
      field: "tickes",
      title: "Reward Possibility",
      render: row => (
        <span>{((row.tickets / totalTickets) * 100).toFixed(4) + "%"}</span>
      )
    }
  ];
};
