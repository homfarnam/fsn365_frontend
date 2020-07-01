import React from "react";
import HrSpace from "../HrSpace";
import FusionAddressLink from "../FusionAddressLink";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import TextStrong from "../TextStrong";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      flexWrap: "wrap",
      "& > div": {
        width: "100%",
        [breakpoints.up("md")]: {
          width: "49%",
        },
      },
    },
    header: {
      padding: ".75rem 0",
      marginBottom: ".75rem",
      borderBottom: "1px solid #e7eaf3",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    isFlexBox: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      backgroundColor: "#e7eaf3",
      padding: ".5rem",
      borderRadius: "4px",
      marginRight: ".5rem",
      [breakpoints.up("sm")]: {
        padding: ".75rem",
      },
      "&.circle": {
        borderRadius: "50%",
      },
    },
    prefix: {
      fontWeight: "500",
      marginRight: ".25rem",
    },
    isHash: {
      width: "86px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "block",
      [breakpoints.up("sm")]: {
        width: "148px",
      },
      [breakpoints.up("md")]: {
        width: "136px",
      },
      [breakpoints.up("lg")]: {
        width: "160px",
      },
    },
    main: {
      flexGrow: 1,
    },
    ctnID: {
      marginRight: "1rem",
      flexGrow: 1,
    },
    type: {
      display: "none",
      [breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    reward: {
      display: "none",
      [breakpoints.up("sm")]: {
        display: "flex",
      },
    },
  })
);



export default function TxItem({ tx }) {
  const style = useStyles();
  return (
    <>
      <div className={style.flexBetween}>
        <div className={`${style.isFlexBox} ${style.ctnID}`}>
          <strong className={`${style.icon} circle`}>Txn</strong>
          <span>
            <NavLink href={`/tx/${tx.hash}`} className={style.isHash}>
              {tx.hash}
            </NavLink>
            <TimeAgo time={tx.timestamp * 1000} />
          </span>
        </div>
        <div className={`${style.flexBetween} ${style.main}`}>
          <div>
            <span className={style.isFlexBox}>
              <b className={style.prefix}>From</b>
              <FusionAddressLink address={tx.from} className={style.isHash} />
            </span>
            <span className={style.isFlexBox}>
              <b className={style.prefix}>To</b>
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
        </div>
      </div>
      <HrSpace />
    </>
  );
}
