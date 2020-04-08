import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import KeyValue from "../KeyValue";
import Panel from "../Panel";
import fetch from "../../libs/fetch";
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

export default function MiningOverview({ miner }) {
  const [data, setState] = useState({
    state: "loading",
    overview: {}
  });
  useEffect(() => {
    let cancel = false;
    const runEffect = () => {
      fetch(`address/${miner}/mining`)
        .then(res => res.json())
        .then(res => {
          if (res.data) {
            return { overview: res.data, state: "success" };
          }
          throw new Error();
        })
        .catch(e => ({
          overview: {},
          state: "error"
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
  const { state, overview } = data;
  const classes = useStyles();
  return (
    <Panel title="Overview">
      {state == "loading" && <CircularProgress size={20} />}
      {state == "error" ? (
        <>
          <strong>
            <StatusText isOk={state !== "error"}>
              Something went wrong.
            </StatusText>
          </strong>
          <br></br>
          Either because <i>{miner}</i> is not a miner or{" "}
          <OutLink href={"https://fsn.dev/api"}>
            <i>https://fsn.dev/api</i>
          </OutLink>{" "}
          out of service.
        </>
      ) : null}
      {state == "success" && (
        <div className={classes.overview}>
          <KeyValue label="Address" className={classes.field}>
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
                <strong>Offline</strong>
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
      )}
    </Panel>
  );
}
