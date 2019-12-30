import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import KeyValue from "../KeyValue";
import Panel from "../Panel";
import TimeAgo from "../TimeAgo";
import fetch from "../../libs/fetch";

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
        width: "49%"
      }
    }
  })
);

export default function MiningOverview({ miner }) {
  const [state, setState] = useState({
    msg: "loading",
    overview: {}
  });
  useEffect(() => {
    fetch(`/address/${miner}/staking`)
      .then(res => res.json())
      .then(res => ({ overview: res.data, msg: "" }))
      .catch(e => ({
        msg: "Something went wrong, please refresh page!",
        overview: {}
      }))
      .then(data => {
        setState(data);
      });
  }, [miner]);
  const { msg, overview } = state;
  const classes = useStyles();
  return (
    <Panel title="Overview">
      {msg == "loading" ? (
        <CircularProgress size={20} />
      ) : (
        <Box color="error.main" component="strong">
          {msg}
        </Box>
      )}
      {!msg && (
        <div className={classes.overview}>
          <KeyValue label="Address" value={overview.address} />
          <KeyValue label="Node Status" className={classes.field}>
            {overview.tickets ? (
              <Box color="success.main" component="strong">
                Online
              </Box>
            ) : (
              <Box color="error.main" component="strong">
                Offline
              </Box>
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
            value={overview.rewards + "FSN"}
            className={classes.field}
          />
          <KeyValue label="Last Mined Block" className={classes.field}>
            <TimeAgo time={overview.latestMinedTime * 1000} />
          </KeyValue>
        </div>
      )}
    </Panel>
  );
}
