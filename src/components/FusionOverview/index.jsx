import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetch from "isomorphic-unfetch";
import siteFetch from "../../libs/fetch";
import HrSpace from "../HrSpace";
import Panel from "../Panel";
import TextStrong from "../TextStrong";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    ul: {
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "0",
      "& > li": {
        width: "46.5%",
        [breakpoints.up("sm")]: {
          width: "23.5%"
        }
      }
    },
    panel: {
      marginTop: "0"
    },
    cat: {
      fontSize: "1.05rem"
    }
  })
);

export default function FusionOverview() {
  const style = useStyles();
  const [overview = {}, setOverview] = useState({
    priceData: {
      changeIn24H: ""
    },
    stats: {}
  });

  const [network = {}, setNetworkData] = useState({});
  useEffect(() => {
    fetchNetworkOverview().then(data => {
      setNetworkData(data);
    });
  }, []);

  const priceDown =
    overview.priceData && overview.priceData.changeIn24H.indexOf("-") > -1;

  return (
    <Panel style={{ margin: "2rem auto", paddingBottom: "0" }}>
      <ul className={style.ul}>
        <li>
          <span>
            <TextStrong className={style.cat}>Price($)</TextStrong>
            <br></br>
            {overview.priceData.price ? (
              <>
                {overview.priceData.price}(
                <small
                  style={{ color: priceDown ? "red" : "rgb(76, 175, 80)" }}
                >
                  {overview.priceData.changeIn24H}
                </small>{" "}
                in 24h)
              </>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>MarketCap</TextStrong>
            <br></br>
            {overview.priceData.mcap ? (
              <>${overview.priceData.mcap}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong className={style.cat}>Total Txns</TextStrong>
            <br></br>
            {network.txns ? (
              <>{network.txns}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>Block Height</TextStrong>
            <br></br>
            {network.height ? (
              <>{network.height}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong className={style.cat}>Swaps Made</TextStrong>
            <br></br>
            {network.swaps ? (
              <>{network.swaps}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>Assets Issued</TextStrong>
            <br></br>
            {network.assets ? (
              <>{network.assets}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong className={style.cat}>Active Miners</TextStrong>
            <br></br>
            {network.miners ? (
              <>{network.miners}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>Active Tickets</TextStrong>
            <br></br>
            {network.tickets ? (
              <>{network.tickets}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
      </ul>
    </Panel>
  );
}

async function fetchNetworkPrice() {
  return fetch(`https://api.fusionnetwork.io/fsnprice`)
    .then(res => res.json())
    .then(data => {
      const reg = /(?=(\d{3})+$)/g;
      return {
        priceData: {
          price: data.priceInfo.price.toFixed(2),
          changeIn24H: data.priceInfo.percentChange24H + "%",
          mcap: (data.priceInfo.market_cap / Math.pow(10, 6)).toFixed(2) + " M"
        },
        stats: {
          txs: (data.totalTransactions / Math.pow(10, 6)).toFixed(2) + " M",
          height: (data.maxBlock + "").replace(reg, ","),
          account: "109,099",
          assets: data.totalAssets
        }
      };
    })
    .catch(e => ({}));
}

async function fetchNetworkOverview() {
  return siteFetch(`stats/network`)
    .then(res => res.json())
    .then(res => res.data);
}
