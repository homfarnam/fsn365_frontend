import React from "react";
import MiningState from "../../src/components/MiningState";
import MiningOverview from "../../src/components/MiningOverview";
import PageHeading from "../../src/components/PageHeading";

export default function MinerStakingPage({ miner, tab = "block" }) {
  return (
    <>
      <PageHeading title={"Node Monitor"} />
      <MiningOverview miner={miner} />
      <MiningState miner={miner} view={tab} />
    </>
  );
}

MinerStakingPage.getInitialProps = async ({ query }) => {
  return query;
};
