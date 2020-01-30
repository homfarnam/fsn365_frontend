import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyValue from "../KeyValue";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      break: "break-all",
      width: "100%",
      alignItems: "center",
      marginBottom: "1.75rem"
    },
    field: {
      width: "100%",
      [breakpoints.up("md")]: {
        width: "49%"
      }
    }
  })
);

export default function AddressOverview({ overview = {} }) {
  const classes = useStyles();

  return (
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
      <KeyValue label="fsn balance" className={classes.field}>
        {overview.fsnBalance === undefined
          ? null
          : `${overview.fsnBalance} FSN`}
      </KeyValue>
      {overview.rewards ? (
        <KeyValue
          label="rewards"
          value={`${overview.rewards} FSN`}
          className={classes.field}
        />
      ) : null}
      <KeyValue label="total transactions" className={classes.field}>
        {overview.txCount} txs in total
      </KeyValue>
    </div>
  );
}
