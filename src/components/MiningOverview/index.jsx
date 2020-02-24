import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import KeyValue from "../KeyValue";
import Panel from "../Panel";
import TimeAgo from "../TimeAgo";
import fetch from "../../libs/fetch";
import NavLink from "../NavLink";

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

export default function MiningOverview({ miner }) {
  const [state, setState] = useState({
    msg: "loading",
    overview: {}
  });
  useEffect(() => {
    let cancel = false;
    const runEffect = () => {
      fetch(`/staking/${miner}`)
        .then(res => res.json())
        .then(res => ({ overview: res.data, msg: "" }))
        .catch(e => ({
          msg: "Something went wrong, please refresh page!",
          overview: {}
        }))
        .then(data => {
          setState(data);
        });
    };
    runEffect();
    return () => {
      cancel = true;
    };
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
          <KeyValue label="Address" className={classes.field}>
            <NavLink href={`/address/${overview.address}`}>
              {overview.address}
            </NavLink>
          </KeyValue>
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
            value={overview.totalRewards.toFixed(2) + " FSN"}
            className={classes.field}
          />
          <KeyValue
            label="Mined Blocks"
            value={overview.totalBlocks}
            className={classes.field}
          />
          <KeyValue label="Latest Mined Time" className={classes.field}>
            <TimeAgo time={overview.latestMinedTime * 1000} />
          </KeyValue>
        </div>
      )}
    </Panel>
  );
}
