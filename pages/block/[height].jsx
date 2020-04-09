import React from "react";
import Router from "next/router";
import Panel from "../../src/components/Panel";
import {
  FusionTab,
  FusionTabs,
  FusionTabPanel
} from "../../src/components/FusionTabs";
import FusionTabPanels from "../../src/components/FusionTabs/FusionTabPanels";
import BlockOverview from "../../src/components/BlockOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";

export default function BlockPage(props) {
  const { block = {}, height } = props;

  if (block.height == undefined) {
    return (
      <>
        <PageHeading title={"Block"} suffix={`#${height}`} />
        <Panel title="Bad Request">
          <p>
            This block does not exist! 
            <br></br>
            Either because the block number is invalid or the network has not reached this height yet.
          </p>
        </Panel>
      </>
    );
  }
  return (
    <>
      <PageHeading title={"Block"} suffix={`#${block.height}`} />
      <Panel>
        <FusionTabs value={0}>
          <FusionTab label="overview" />
        </FusionTabs>
        <FusionTabPanels>
          <FusionTabPanel value={0} index={0}>
            <BlockOverview block={block} />
          </FusionTabPanel>
        </FusionTabPanels>
      </Panel>
    </>
  );
}

BlockPage.getInitialProps = async ({ query, res }) => {
  const height = Math.abs(Number(query.height));
  if (isNaN(height)) {
    if (res) {
      res.writeHead(302, {
        Location: "/blocks"
      });
      res.end();
    } else {
      Router.push("/blocks");
    }
  } else {
    const block = await fetch(`block/${height}`)
      .then(res => res.json())
      .then(res => res.data)
      .catch(e => {
        return {}
      });
    return {
      block: block || {},
      ...query
    };
  }
};
