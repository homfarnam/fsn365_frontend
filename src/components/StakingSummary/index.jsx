import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyValue from "../KeyValue";
import Panel from "../Panel";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      break: "break-all"
    },
    field: {
      width: "100%",
      [breakpoints.up("lg")]: {
        width: "49%"
      }
    }
  })
);

export default function StakingOverview(props) {
  const { summary = {} } = props;
  return (
    <Panel title="Summary">
      <KeyValue label="Active Miners ">
        {summary.activeMiners ? <span>{summary.activeMiners}</span> : null}
      </KeyValue>
      <KeyValue label="Active Tickets ">
        {summary.activeTickets ? <span>{summary.activeTickets}</span> : null}
      </KeyValue>
      <KeyValue label="Historical Miners ">
        {summary.allMiners ? <span>{summary.allMiners}</span> : null}
      </KeyValue>
    </Panel>
  );
}
