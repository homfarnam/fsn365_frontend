import React, { useState, useEffect } from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NetworkStakingState from "../../src/components/NetworkStakingState";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import KeyValue from "../../src/components/KeyValue";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    circle: {
      display: "inline-block",
      verticalAlign: "center",
      marginLeft: "10px",
      verticalAlign: "middle"
    },
    margin: {
      marginBottom: ".5rem"
    },
    title: {
      marginBottom: "1rem"
    }
  })
);

export default function StakingPage({ miner }) {
  const [state, setState] = useState({
    summary: {},
    stakeInfo: {},
    error: ""
  });
  const cssClasses = useStyles();

  useEffect(() => {
    let cancel = false;
    const runEffect = () => {
      fetch("/staking")
        .then(res => res.json())
        .then(res => res.data)
        .then(data => {
          setState({
            ...data,
            error: ""
          });
        })
        .catch(e => {
          setState({
            error: "Something went wrong, please refresh page and have a try!"
          });
        });
    };
    runEffect();
    return () => {
      cancel = true;
    };
  }, [miner]);

  const { summary, stakeInfo, error, historicalMiners } = state;
  return (
    <>
      <PageHeading title={"Fusion Staking"} />
      <Panel title="Summary">
        <KeyValue label="Active Miners: ">
          {summary.totalMiners ? (
            <span>{summary.totalMiners}</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            <CircularProgress size={10} className={cssClasses.circle} />
          )}
        </KeyValue>
        <KeyValue label="Active Tickets: ">
          {summary.totalTickets ? (
            <span>{summary.totalTickets}</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            <CircularProgress size={10} className={cssClasses.circle} />
          )}
        </KeyValue>
        <KeyValue label="Historical Miners: ">
          {historicalMiners ? (
            <span>{historicalMiners}</span>
          ) : error ? (
            <span>{error}</span>
          ) : (
            <CircularProgress size={10} className={cssClasses.circle} />
          )}
        </KeyValue>
      </Panel>
      {summary.totalTickets ? (
        <Panel>
          <NetworkStakingState
            data={stakeInfo}
            totalTickets={summary.totalTickets}
          />
        </Panel>
      ) : (
        <Panel>
          <Typography component="h6" variant="h6">
            Fusion Miners{" "}
            {error ? (
              <span>{error}</span>
            ) : (
              <CircularProgress size={20} className={cssClasses.circle} />
            )}
          </Typography>
        </Panel>
      )}
    </>
  );
}

StakingPage.getInitialProps = async ({ query, res }) => {
  const { miner } = query;
  if (miner) {
    if (res) {
      res.writeHead(302, {
        Location: `/staking/${miner}`
      });
    } else {
      Router.push(`/staking/${miner}`);
    }
  } else {
    return {
      isServer: !!res
    };
  }
};
