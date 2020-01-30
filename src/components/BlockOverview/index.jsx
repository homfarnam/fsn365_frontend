import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import KeyValue from "../KeyValue";

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

export default function BlockOverview(props) {
  const { block } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const nextHeight = block.height + 1;
  const prevHeight = block.height - 1;
  return (
    <div className={classes.root}>
      <KeyValue label="height" className={classes.field}>
        {block.height}
        <span style={{ marginLeft: "10px" }}>
          <NavLink href={`/block/${prevHeight}`}>Prev</NavLink>{" "}
          <NavLink href={`/block/${nextHeight}`}>Next</NavLink>
        </span>
      </KeyValue>
      <KeyValue label="timestamp" className={classes.field}>
        <span>
          <TimeAgo time={block.timestamp * 1000} className={classes.field} />
        </span>
      </KeyValue>
      <KeyValue label="Transactions" className={classes.field}>
        {block.txCount ? (
          <NavLink href={`/block/${block.height}?tab=tx`}>
            {block.txCount}
          </NavLink>
        ) : (
          block.txCount
        )}{" "}
        txs in block
      </KeyValue>
      <KeyValue label="Block Miner" className={classes.field}>
        <NavLink href={`/staking/${block.miner}`}>{block.miner}</NavLink>
      </KeyValue>
      <KeyValue
        label="Block Rewards"
        value={block.reward + " FSN"}
        className={classes.field}
      />
      <KeyValue
        label="Difficulty"
        value={block.difficulty}
        className={classes.field}
      />
      <KeyValue
        label="Total Difficulty"
        value={block.totalDifficulty}
        className={classes.field}
      />
      <KeyValue label="size" value={block.size} className={classes.field} />
      <KeyValue
        label="Gas Limit"
        value={block.gasLimit}
        className={classes.field}
      />
      <KeyValue
        label="Parent Hash"
        value={block.parentHash}
        className={classes.field}
      />
      <KeyValue label=" Hash" value={block.hash} className={classes.field} />
    </div>
  );
}
