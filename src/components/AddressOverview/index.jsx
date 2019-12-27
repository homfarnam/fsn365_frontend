import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import NavLink from "next/link";
import KeyValue from "../KeyValue";
import Panel from "../Panel";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      break: "break-all",
      width: "100%",
      alignItems: "center"
    },
    field: {
      width: "100%",
      [breakpoints.up("md")]: {
        width: "49%"
      }
    }
  })
);

export default function AddressOverview(props) {
  const { overview } = props;
  const classes = useStyles();
  overview.txCount = overview.txCount ? overview.txCount : 0;
  return (
    <Panel title="Overview">
      <div className={classes.root}>
        <KeyValue
          label="address"
          value={overview.address}
          className={classes.field}
        />
        <KeyValue
          label="Short Address"
          value={overview.san}
          className={classes.field}
        />
        <KeyValue
          label="fsn balance"
          value={`${overview.fsnBalance} FSN`}
          className={classes.field}
        />
        {overview.rewards ? (
          <KeyValue
            label="rewards"
            value={`${overview.rewards} FSN`}
            className={classes.field}
          />
        ) : null}
        <KeyValue label="total transactions" className={classes.field}>
          {overview.txCount ? (
            <NavLink href={`/address/${overview.address}?tab="tx`}></NavLink>
          ) : (
            overview.txCount
          )}{" "}
          txs in total
        </KeyValue>
      </div>
    </Panel>
  );
}
