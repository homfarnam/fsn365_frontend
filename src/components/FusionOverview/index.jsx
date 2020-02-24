import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
    }
  })
);

export default function FusionOverview() {
  const style = useStyles();
  const [overview = {}, setOverview] = useState({});
  useEffect(() => {
    fetchNetworkOverview().then(data => {
      setOverview(data);
    });
  }, []);

  const [txSummary = {}, setTxSummary] = useState({});
  useEffect(() => {
    fetchTxsSummary().then(data => {
      setTxSummary(data);
    });
  }, []);
  const [mining, setMining] = useState({});
  useEffect(() => {
    fetchMiningSummary().then(data => {
      setMining(data);
    });
  }, []);
  if (!overview.priceData) {
    return null;
  }
  const priceDown =
    overview.priceData && overview.priceData.changeIn24H.indexOf("-") > -1;
  console.log(priceDown);
  console.log(overview);

  return (
    <Panel style={{ margin: "2rem auto", paddingBottom: "0" }}>
      <ul className={style.ul}>
        <li>
          <span>
            <TextStrong>Price($)</TextStrong>
            <br></br>
            {overview.priceData.price}(
            <small style={{ color: priceDown ? "red" : "rgb(76, 175, 80)" }}>
              {overview.priceData.changeIn24H}
            </small>{" "}
            in 24h)
          </span>
          <HrSpace />
          <span>
            <TextStrong>MarketCap</TextStrong>
            <br></br>${overview.priceData.mcap}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong>Total Txns</TextStrong>
            <br></br>
            {overview.stats.txs}
          </span>
          <HrSpace />
          <span>
            <TextStrong>Block Height</TextStrong>
            <br></br>
            {overview.stats.height}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong>Swaps Made</TextStrong>
            <br></br>
            {txSummary.swaps}
          </span>
          <HrSpace />
          <span>
            <TextStrong>Assets</TextStrong>
            <br></br>
            {overview.stats.assets || "loading..."}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong>Active Miners</TextStrong>
            <br></br>
            {mining.totalMiners || "loading..."}
          </span>
          <HrSpace />
          <span>
            <TextStrong>Active Tickets</TextStrong>
            <br></br>
            {mining.totalTickets || "loading..."}
          </span>
          <HrSpace />
        </li>
      </ul>
    </Panel>
  );
}

async function fetchNetworkOverview() {
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

async function fetchTxsSummary() {
  return siteFetch("/tx/summary")
    .then(res => res.json())
    .then(res => res.data)
    .then(data => {
      const reg = /(?=(\d{3})+$)/g;
      return {
        swaps: (data.swaps + "").replace(reg, ",")
      };
    })
    .catch(e => ({
      swaps: "3,202",
      total: "40,1432"
    }));
}

async function fetchMiningSummary() {
  return fetch(`https://fsn.dev/api`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "fsn_getStakeInfo",
      params: ["latest"]
    })
  })
    .then(res => res.json())
    .then(res => res.result)
    .then(data => data.summary)
    .catch(e => ({
      totalMiners: -1,
      totalTickets: -1
    }));
}
