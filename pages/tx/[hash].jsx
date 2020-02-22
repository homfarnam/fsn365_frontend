import React, { useState } from "react";
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
import TextStrong from '../../src/components/TextStrong';

export default function TransactionPage(props) {
  const { tx = {}, hash } = props;
  const [state, setState] = useState({
    tab: 0
  });

  const handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    });
  };

  const suffix =
    tx.type === "Buy Ticket"
      ? `#${tx.type}`
      : `#${tx.type.replace('Func', '').replace('Ext', '')}`;
  
  if(!tx.hash) {
    return (
      <>
      <PageHeading title={'Bad Tx'} />
      <Panel>
        The hash: <TextStrong><em>{hash}</em></TextStrong> is invalid.
        Please check!
      </Panel>
      </>
    )
  }
  return (
    <>
      <PageHeading title="Tx" suffix={suffix} />
      <Panel>
        <FusionTabs value={state.tab} onChange={handleTabChange}>
          <FusionTab label="Tx Overview" />
        </FusionTabs>
        <FusionTabPanels>
          <FusionTabPanel value={state.tab} index={0}>
            <TxOverview tx={tx} />
          </FusionTabPanel>
        </FusionTabPanels>
      </Panel>
    </>
  )
}

TransactionPage.getInitialProps = async ({ query }) => {
  const { hash } = query;
  const tx = await fetch(`/tx/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => {});
  return {
    tx,
    hash
  };
};
