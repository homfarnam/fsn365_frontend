import React from "react";
import MiningState from "../../src/components/MiningState";
import MiningOverview from "../../src/components/MiningOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";

export default function MinerStakingPage({ miner, msg, overview }) {
  return (
    <>
      <PageHeading title={"Node Monitor"} canonical={`staking/${miner}`} />
      <MiningOverview msg={msg} overview={overview} />
      <MiningState miner={miner} />
    </>
  );
}

MinerStakingPage.getInitialProps = async ({ query }) => {
  const { miner } = query;
  const result = await fetch(`address/${miner}/mining`)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return {
          overview: res.data,
        };
      }
      return {
        msg: res.msg,
      };
    })
    .catch((e) => {
      return {
        msg: "Something went wrong",
      };
    });
  const { msg, overview } = result;
  return {
    miner,
    overview,
    msg,
  };
};
