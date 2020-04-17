import React from "react";
import MiningState from "../../src/components/MiningState";
import MiningOverview from "../../src/components/MiningOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";

export default function MinerStakingPage({ miner, overview, state }) {
  return (
    <>
      <PageHeading title={"Node Monitor"} canonical={`staking/${miner}`} />
      <MiningOverview miner={miner} state={state} overview={overview} />
      <MiningState miner={miner} />
    </>
  );
}

MinerStakingPage.getInitialProps = async ({ query }) => {
  const { miner } = query;
  let state = "success";
  const overview = await fetch(`address/${miner}/mining`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => {
      state = "error";
      return {};
    });
  return {
    miner,
    overview,
    state,
  };
};
