import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import HrSpace from "../HrSpace";
import FusionAddressLink from "../FusionAddressLink";
import getConfig from "next/config";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import TextStrong from "../TextStrong";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    isHash: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "60px",
      marginLeft: "4px",
      display: "inline-block",
      [breakpoints.up("sm")]: {
        maxWidth: "100px"
      }
    },
    hash: {
      "& a": {
        marginLeft: "0"
      }
    },
    icon: {
      backgroundColor: "#e7eaf3",
      padding: ".75rem",
      borderRadius: "50%",
      marginRight: ".5rem"
    },
    accounts: {
      minWidth: "120px",
      marginLeft: ".5rem",
      "& span": {
        display: "flex"
      }
    },
    type: {
      padding: ".25rem",
      borderRadius: "4px"
    },
    fee: {
      display: "none",
      [breakpoints.up("md")]: {
        display: "flex"
      }
    }
  })
);

export default function TxItem({ tx }) {
  const { publicRuntimeConfig } = getConfig();
  const API_PATH = publicRuntimeConfig.API_PATH;
  const style = useStyles();
  return (
    <>
      <div className={style.root}>
        <strong className={style.icon}>Txn</strong>
        <div className={style.hash}>
          <NavLink href={`/tx/${tx.hash}`} className={style.isHash}>
            {tx.hash}
          </NavLink>
          <br></br>
          <span>
            <TimeAgo time={tx.timestamp * 1000} />
          </span>
        </div>
        <div className={style.accounts}>
          <span>
            From
            <FusionAddressLink address={tx.from} className={style.isHash} />
          </span>
          <span>
            To
            <FusionAddressLink address={tx.to} className={style.isHash} />
          </span>
        </div>
        <span className={style.type}>
          <TextStrong>
            {tx.type == "Origin"
              ? "SendAsset"
              : tx.type.replace("Ext", "").replace("Func", "")}
          </TextStrong>
        </span>
        <span className={style.fee}>
          {(tx.gasUsed * tx.gasPrice) / Math.pow(10, 18)} FSN
        </span>
      </div>
      <HrSpace />
    </>
  );
}
