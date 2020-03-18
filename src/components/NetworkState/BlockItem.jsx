import React from "react";
import HrSpace from "../HrSpace";
import FusionAddressLink from "../FusionAddressLink";
import OutLink from "../OutLink";
import getConfig from "next/config";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import useStyles from "./useStyles";

export default function BlockItem({ bk = {} }) {
  const { publicRuntimeConfig } = getConfig();
  const API_PATH = publicRuntimeConfig.API_PATH;
  const style = useStyles();
  return (
    <>
      <div className={style.flexBetween}>
        <div className={`${style.isFlexBox} ${style.ctnID}`}>
          <strong className={`${style.icon}`}>Bk</strong>
          <span>
            <NavLink href={`/block/${bk.height}`}>
              <strong>{bk.height}</strong>
            </NavLink>
            <br></br>
            <TimeAgo time={bk.timestamp * 1000} />
          </span>
        </div>
        <div className={style.main}>
          <span className={style.isFlexBox}>
            <b className={style.prefix}>Miner</b>
            <FusionAddressLink address={bk.miner} className={style.isHash} />
          </span>
          {bk.txns ? (
            <OutLink href={`${API_PATH}tx?block=${bk.height}&size=${bk.txns}`}>
              {bk.txns}txn{bk.txns > 1 ? "s" : ""}
            </OutLink>
          ) : (
            bk.txns + " txn"
          )}{" "}
          in block.
        </div>
        <span className={style.reward}>{bk.reward.toFixed(2)} FSN</span>
      </div>
      <HrSpace />
    </>
  );
}
