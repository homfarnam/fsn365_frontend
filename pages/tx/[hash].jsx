import React from "react";
import Panel from "../../src/components/Panel";
import {
  FusionTab,
  FusionTabs,
  FusionTabPanel
} from "../../src/components/FusionTabs";
import FusionTabPanels from "../../src/components/FusionTabs/FusionTabPanels";
import TxOverview from "../../src/components/TxOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import TextStrong from "../../src/components/TextStrong";

export default function TransactionPage(props) {
  const { tx = {}, hash } = props;

  if (!tx.hash) {
    return (
      <>
        <PageHeading title={"Bad Tx"} />
        <Panel>
          The hash:{" "}
          <TextStrong>
            <em>{hash}</em>
          </TextStrong>{" "}
          is invalid. Please check!
        </Panel>
      </>
    );
  }

  const typeText = tx.type.replace('Ext', '').replace('Func', '');
  return (
    <>
      <PageHeading
       title="Tx"
       suffix={'# '+ typeText}
       canonical={`tx/${tx.hash}`}
      />
      <Panel>
        <FusionTabs value={0}>
          <FusionTab label="Tx Overview" />
        </FusionTabs>
        <FusionTabPanels>
          <FusionTabPanel value={0} index={0}>
            <TxOverview tx={tx} />
          </FusionTabPanel>
        </FusionTabPanels>
      </Panel>
    </>
  );
}

TransactionPage.getInitialProps = async ({ query }) => {
  const { hash } = query;
  const tx = await fetch(`txn/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => {});
  return {
    tx: tx || { type: "" },
    hash
  };
};
