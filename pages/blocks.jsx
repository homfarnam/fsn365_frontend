import React from "react";
import Panel from "../src/components/Panel";
import PageHeading from "../src/components/PageHeading";
import MinedBlocks from "../src/components/MinedBlocks";

export default function BlockListPage(props) {
  return (
    <>
      <PageHeading
        title={"Blocks"}
        canonical={'blocks'}
      />
      <Panel style={{padding: 0}}>
        <MinedBlocks/>
      </Panel>
    </>
  );
}
