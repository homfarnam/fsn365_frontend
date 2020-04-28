import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import NavLink from "../NavLink";
import KeyValue from "../KeyValue";
import getConfig from "next/config";
import OutLink from "../OutLink";
import UTCTime from "../UTCTime";

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
  const { publicRuntimeConfig } = getConfig();
  const apiServer = publicRuntimeConfig.API_PATH;
  return (
    <div className={classes.root}>
      <KeyValue label="height" className={classes.field}>
        <OutLink href={`${apiServer}block/${block.height}`}>
          <strong>{block.height}</strong>
        </OutLink>
        <span style={{ marginLeft: "10px" }}>
          {prevHeight > 0 ? (
            <NavLink href={`/block/${prevHeight}`}>Prev </NavLink>
          ) : null}
          <NavLink href={`/block/${nextHeight}`}>Next</NavLink>
        </span>
      </KeyValue>
      <KeyValue label="age" className={classes.field}>
        <UTCTime time={block.timestamp} />
      </KeyValue>
      <KeyValue label="Transactions" className={classes.field}>
        {block.txns ? (
          <OutLink
            href={`${apiServer}txn?bk=${block.height}`}
            target={"_blank"}
          >
            {block.txns}
          </OutLink>
        ) : (
          block.txns
        )}{" "}
        txn{block.txns > 1 ? "s" : ""} in block
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
