import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import HrSpace from "../HrSpace";
import FusionAddressLink from "../FusionAddressLink";
import OutLink from "../OutLink";
import getConfig from "next/config";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";

const useStyles = makeStyles(({ palette }) =>
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
      maxWidth: "100px",
      marginLeft: "4px",
      display: "inline-block"
    },
    icon: {
      backgroundColor: "#e7eaf3",
      padding: ".75rem",
      borderRadius: "4px",
      marginRight: "1rem"
    },
    height: {
      flexGrow: 1
    },
    miner: {
      flexGrow: 1,
      marginLeft: "1rem",
      "& span": {
        display: "flex"
      }
    }
  })
);

export default function BlockItem({ bk }) {
  const { publicRuntimeConfig } = getConfig();
  const API_PATH = publicRuntimeConfig.API_PATH;
  const style = useStyles();
  return (
    <>
      <div className={style.root}>
        <strong className={style.icon}>Bk</strong>
        <div className={style.height}>
          <NavLink href={`/block/${bk.height}`}>{bk.height}</NavLink>
          <br></br>
          <span>
            <TimeAgo time={bk.timestamp} />
          </span>
        </div>
        <div className={style.miner}>
          <span>
            Miner
            <FusionAddressLink address={bk.miner} className={style.isHash} />
          </span>
          {bk.txCount ? (
            <OutLink
              href={`${API_PATH}tx?block=${bk.height}&size=${bk.txCount}`}
            >
              {bk.txCount}txn{bk.txCount > 1 ? "s" : ""}
            </OutLink>
          ) : (
            bk.txCount + " txn"
          )}{" "}
          in block.
        </div>
        <span className={style.reward}>{bk.reward} FSN</span>
      </div>
      <HrSpace />
    </>
  );
}
