import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyValue from "../KeyValue";
import Panel from "../Panel";
import StatusText from "../StatusText";
import OutLink from "../OutLink";
import UTCTime from "../UTCTime";
import FusionAddress from "../FusionAddressLink";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    overview: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      break: "break-all"
    },
    field: {
      width: "100%",
      [breakpoints.up("lg")]: {
        width: "48.5%"
      }
    }
  })
);

export default function MiningOverview(props) {
  const { msg, overview } = props;
  const classes = useStyles();
  if (msg) {
    return <Panel title="Overview">{msg}</Panel>;
  }

  return (
    <Panel title="Overview">
      <div className={classes.overview}>
        <KeyValue label="Miner" className={classes.field}>
          <FusionAddress address={overview.address}>
            {overview.address}
          </FusionAddress>
        </KeyValue>
        <KeyValue label="Node Status" className={classes.field}>
          {overview.tickets ? (
            <StatusText>
              <strong>Online</strong>
            </StatusText>
          ) : (
            <StatusText isOk={false}>
              <strong>No Ticket</strong>
            </StatusText>
          )}
        </KeyValue>
        {overview.tickets ? (
          <KeyValue
            label="Tickets"
            value={overview.tickets}
            className={classes.field}
          />
        ) : null}
        <KeyValue
          label="Rewards To Date"
          value={overview.rewards.toFixed(2) + " FSN"}
          className={classes.field}
        />
        <KeyValue
          label="Mined Blocks"
          value={overview.bks}
          className={classes.field}
        />
        <KeyValue label="Latest Mining Time" className={classes.field}>
          <UTCTime time={overview.lBkTime} />
        </KeyValue>
      </div>
    </Panel>
  );
}
