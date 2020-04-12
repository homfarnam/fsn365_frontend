import React from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NetworkStakingState from "../../src/components/NetworkStakingState";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import KeyValue from "../../src/components/KeyValue";
import TextStrong from "../../src/components/TextStrong";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    circle: {
      display: "inline-block",
      verticalAlign: "center",
      marginLeft: "10px",
      verticalAlign: "middle",
    },
    margin: {
      marginBottom: ".5rem",
    },
    title: {
      marginBottom: "1rem",
    },
    flexBox: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      break: "break-all",
    },
    field: {
      width: "100%",
      [breakpoints.up("lg")]: {
        width: "49%",
      },
    },
  })
);

export default function StakingPage(props) {
  const { summary, stakeInfo, error = "" } = props;
  const style = useStyles();
  return (
    <>
      <PageHeading
        title={"Fusion Staking"}
        canonical={`staking`}
      />
      <Panel title="Summary">
        <div className={style.flexBox}>
          <KeyValue label="Active Miners" className={style.field}>
            <span>{summary.activeMiners}</span>
          </KeyValue>
          <KeyValue label="Tickets" className={style.field}>
            <span>{summary.activeTickets}</span>
          </KeyValue>
          <KeyValue label="Historical Miners" className={style.field}>
            <span>{summary.allMiners}</span>
          </KeyValue>
          <KeyValue
            label="Overall Rewards/Mined Blocks"
            className={style.field}
          >
            <span>
              {summary.allRewards} FSN / {summary.minedBks} blocks
            </span>
          </KeyValue>
        </div>
      </Panel>
      <Panel>
        {summary.activeTickets ? (
          <NetworkStakingState
            data={stakeInfo}
            totalTickets={summary.activeTickets}
          />
        ) : (
          <Typography component="h6" variant="h6">
            <TextStrong>Active Miners</TextStrong>{" "}
            {error ? (
              <span>{error}</span>
            ) : (
              <CircularProgress size={20} className={style.circle} />
            )}
          </Typography>
        )}
      </Panel>
    </>
  );
}

StakingPage.getInitialProps = async ({ query, res }) => {
  const { miner } = query;
  if (miner) {
    if (res) {
      res.writeHead(302, {
        Location: `/staking/${miner}`,
      });
    } else {
      Router.push(`/staking/${miner}`);
    }
  } else {
    const overview = await fetch("staking")
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((e) => ({
        summary: {},
        stakeInfo: [],
        error: "Unexpected errro happened.",
      }));
    return {
      ...overview,
    };
  }
};
