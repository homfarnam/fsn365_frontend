import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import KeyValue from "../KeyValue";
import addressMap from "../../constants/addressMap";
import TimeAgo from "../TimeAgo";
import TextStrong from "../TextStrong";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NavLink from "../NavLink";

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
  return (
    <div className={classes.root}>
      <KeyValue label="address" className={classes.field}>
        <span className={classes.withIcon}>
          {overview.id}
          {overview.label ? (
            <>
              (<TextStrong>{overview.label}</TextStrong>)
            </>
          ) : null}
          <CopyToClipboard text={overview.id} onCopy={onCopy}>
            {copied ? (
              <span className={classes.okIcon}>
                <CheckCircleIcon fontSize="small" /> Copied
              </span>
            ) : (
              <FileCopyIcon className={classes.checkIcon} fontSize="small" />
            )}
          </CopyToClipboard>
        </span>
      </KeyValue>
      {overview.contract ? (
        <KeyValue label={"Contract Address"} className={classes.field}>
          Yes
        </KeyValue>
      ) : null}
      {overview.san ? (
        <KeyValue
          label={"Short Address"}
          value={overview.san}
          className={classes.field}
        ></KeyValue>
      ) : null}
      {overview.miner ? (
        <KeyValue label={"Mining Address"} className={classes.field}>
          <NavLink href={`/staking/${overview.id}`}>View mining</NavLink>
        </KeyValue>
      ) : null}
      {overview.assetsHeld ? (
        <KeyValue label="Assets Held" className={classes.field}>
          {overview.assetsHeld}
        </KeyValue>
      ) : null}
      {overview.tlAssetsHeld ? (
        <KeyValue label="TimeLocked Assets Held" className={classes.field}>
          {overview.tlAssetsHeld}
        </KeyValue>
      ) : null}
      <KeyValue label="FSN balance" className={classes.field}>
        {overview.fsn === undefined ? null : `${overview.fsn} FSN`}
      </KeyValue>
      {overview.fsnIn ? (
        <KeyValue label={"∞ TL FSN"} className={classes.field}>
          {overview.fsnIn} FSN
        </KeyValue>
      ) : null}
      {overview.fsnOwn ? (
        <KeyValue label={"FSN ownership"} className={classes.field}>
          {overview.fsnOwn} FSN
        </KeyValue>
      ) : null}
      {overview.lActTime ? (
        <KeyValue label="Latest Active Time" className={classes.field}>
          <TimeAgo time={overview.lActTime * 1000} />
        </KeyValue>
      ) : null}
    </div>
  );
}
