import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import NavLink from "next/link";
import KeyValue from "../KeyValue";
import fetch from "../../libs/fetch";

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

export default function AddressOverview({ address }) {
  const classes = useStyles();
  const [overview, setOverview] = useState({});
  useEffect(() => {
    fetch(`/address/${address}`)
      .then(res => res.json())
      .then(res => res.data)
      .catch(e => ({}))
      .then(overview => {
        setOverview(overview);
      });
  }, [address]);
  overview.txCount = overview.txCount ? overview.txCount : 0;
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
        {overview.txCount ? (
          <NavLink href={`/address/${overview.address}?tab="tx`}></NavLink>
        ) : (
          overview.txCount
        )}{" "}
        txs in total
      </KeyValue>
    </div>
  );
}
