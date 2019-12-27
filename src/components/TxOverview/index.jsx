import React from "react";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import HrSpace from "../HrSpace";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      wordBreak: "break-all"
    },
    label: {
      display: "inline-block",
      marginRight: "10px",
      verticalAlign: "center",
      textTransform: "Capitalize"
    },
    value: {
      display: "inline-block",
      verticalAlign: "center"
    },
    success: {
      color: `${palette.success}`
    },
    failed: {
      color: `${palette.error}`
    }
  })
);

export default function TxOverview(props) {
  const { tx } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <TxField label="hash" value={tx.hash} />
      <TxField label="status" value={tx.status ? "success" : "failed"} />
      <TxField label="Block">
        <NavLink href={`/block/${tx.block}`}>{tx.block}</NavLink>
      </TxField>
      <TxField label="from">
        <NavLink href={`/address/${tx.from}`}>{tx.from}</NavLink>
      </TxField>
      <TxField label="to">
        <NavLink href={`/address/${tx.to}`}>{tx.to}</NavLink>
      </TxField>
      <TxField label="timestamp">
        <span>
          <TimeAgo time={tx.timestamp * 1000}></TimeAgo>
        </span>
      </TxField>
      <TxField label="nonce" value={tx.nonce} />
    </div>
  );
}

const TxField = props => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { label, value, children } = props;
  return (
    <div className={`tx-${label}`}>
      <p>
        <span className={classes.label}>{label}:</span>
        <span className={classes.value}>{value || children}</span>
      </p>
      <HrSpace />
    </div>
  );
};
