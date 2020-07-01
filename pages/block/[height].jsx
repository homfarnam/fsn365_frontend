import React from "react";
import Router from "next/router";
import Panel from "../../src/components/Panel";
import BlockOverview from "../../src/components/BlockOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import axios from "../../src/libs/fetch";

export default function BlockPage(props) {
  const { block = {}, height } = props;
  const suffix = `#${height}`;
  const canonical = `block/${height}`;
  if (block.height == undefined) {
    return (
      <>
        <PageHeading
          title={"Block"}
          suffix={suffix}
          canonical={canonical}
        />
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
      <PageHeading
        title={"Block"}
        suffix={suffix}
        canonical={canonical}
      />
      <Panel>
        <BlockOverview block={block} />
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
    const block = await axios.get(`block/${height}`)
      .catch(e => {
        return {}
      });
    return {
      block: block,
      height
    };
  }
};
