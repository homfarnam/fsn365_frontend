import React from "react";
import HrSpace from "../HrSpace";
import FusionAddressLink from "../FusionAddressLink";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import useStyles from "./useStyles";
import TextStrong from "../TextStrong";

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
