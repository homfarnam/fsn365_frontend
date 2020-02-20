import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyValue from "../KeyValue";
import addressMap from "../../constants/addressMap";

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
        width: "48.5%"
      }
    }
  })
);

export default function AddressOverview({ overview = {} }) {
  const classes = useStyles();

  const addressLabel = addressMap[overview.address];
  return (
    <div className={classes.root}>
      <KeyValue
        label="address"
        value={overview.address}
        className={classes.field}
      />
      {addressLabel ? (
        <KeyValue label="Label" className={classes.field}>
          <strong>{addressLabel}</strong>
        </KeyValue>
      ) : null}
      {overview.san ? (
        <KeyValue
          label="Short Address"
          value={overview.san}
          className={classes.field}
        />
      ) : null}
      {overview.assetHeld ? (
        <KeyValue label="Assets Held" className={classes.field}>
          {overview.assetHeld}
        </KeyValue>
      ) : null}
      {overview.tlAssetHeld ? (
        <KeyValue label="TimeLocked Assets Held" className={classes.field}>
          {overview.tlAssetHeld}
        </KeyValue>
      ) : null}
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
        {overview.txMade + overview.txReceived} txs in total
      </KeyValue>
    </div>
  );
}
