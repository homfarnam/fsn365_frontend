import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import fetch from "isomorphic-unfetch";
import siteFetch from "../../libs/fetch";
import HrSpace from "../HrSpace";
import Panel from "../Panel";

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
      marginTop: "2rem"
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

  return (
    <Panel style={{ margin: "2rem auto", paddingBottom: "0" }}>
      <ul className={style.ul}>
        <li>
          <span>
            <strong>Price</strong>
            <br></br>${overview.priceData.price}(
            <Box
              component="small"
              color={priceDown ? "success.main" : "secondary.main"}
            >
              {overview.priceData.changeIn24H}
            </Box>{" "}
            in 24h)
          </span>
          <HrSpace />
          <span>
            <strong>MarketCap</strong>
            <br></br>${overview.priceData.mcap}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <strong>Total Txs</strong>
            <br></br>
            {overview.stats.txs}
          </span>
          <HrSpace />
          <span>
            <strong>Block Height</strong>
            <br></br>
            {overview.stats.height}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <strong>Total swaps</strong>
            <br></br>
            {txSummary.swaps}
          </span>
          <HrSpace />
          <span>
            <strong>Valid Txs</strong>
            <br></br>
            {txSummary.txs}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <strong>Active Miners</strong>
            <br></br>
            {mining.totalMiners || "loading..."}
          </span>
          <HrSpace />
          <span>
            <strong>Tickets</strong>
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
          price: data.priceInfo.price.toFixed(3),
          changeIn24H: data.priceInfo.percentChange24H + "%",
          mcap: (data.priceInfo.market_cap / Math.pow(10, 6)).toFixed(2) + " M"
        },
        stats: {
          txs: (data.totalTransactions / Math.pow(10, 6)).toFixed(2) + " M",
          height: (data.maxBlock + "").replace(reg, ","),
          account: "109,099"
        }
      };
    })
    .catch(e => ({}));
}

async function fetchTxsSummary() {
  return siteFetch("/tx/summary")
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => ({
      swaps: 3202,
      total: 401432
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
