import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyValue from "../KeyValue";
import addressMap from "../../constants/addressMap";
import TimeAgo from "../TimeAgo";
import TextStrong from "../TextStrong";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
        width: "48.5%"
      }
    },
    withIcon: {
      display: "flex",
      alignItems: "center"
    },
    checkIcon: {
      color: "#77838f"
    },
    okIcon: {
      color: "#4caf50",
      display: "flex",
      alignItems: "center"
    }
  })
);

export default function AddressOverview({ overview = {} }) {
  const classes = useStyles();
  const [copied, setCopiedStatus] = useState(false);
  const duration = 4000;
  const onCopy = () => {
    setCopiedStatus(true);
    let t1 = setTimeout(() => {
      setCopiedStatus(false);
      clearTimeout(t1);
      t1 = null;
    }, duration);
  };
  const addressLabel = addressMap[overview.address];

  return (
    <div className={classes.root}>
      <KeyValue label="address" className={classes.field}>
        <span className={classes.withIcon}>
          {overview.address}
          <CopyToClipboard text={overview.address} onCopy={onCopy}>
            {copied ? (
              <span className={classes.okIcon}>
                <CheckCircleIcon /> Copied
              </span>
            ) : (
              <FileCopyIcon className={classes.checkIcon} />
            )}
          </CopyToClipboard>
        </span>
      </KeyValue>
      {addressLabel ? (
        <KeyValue label="Label" className={classes.field}>
          <TextStrong>{addressLabel}</TextStrong>
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
      <KeyValue label="FSN balance" className={classes.field}>
        {overview.fsnBalance === undefined
          ? null
          : `${overview.fsnBalance} FSN`}
      </KeyValue>
      {overview.fsnBalanceIn ? (
        <KeyValue label={"∞ TL FSN"} className={classes.field}>
          {overview.fsnBalanceIn} FSN
        </KeyValue>
      ) : null}
      {overview.fsnBalanceIn + overview.fsnBalance ? (
        <KeyValue label={"FSN ownership"} className={classes.field}>
          {overview.fsnBalanceIn + overview.fsnBalance} FSN
        </KeyValue>
      ) : null}
      {overview.latestActiveTime ? (
        <KeyValue label="Latest Active Time" className={classes.field}>
          <TimeAgo time={overview.latestActiveTime * 1000} />
        </KeyValue>
      ) : null}
    </div>
  );
}
