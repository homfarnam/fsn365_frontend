import React, { useState, useEffect } from "react";
import FusionTabPanels, {
  FusionTab,
  FusionTabs,
  FusionTabPanel
} from "../../src/components/FusionTabs";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import dynamic from "next/dynamic";
import AddressTxs from "../../src/components/AddressTxs";

const DynamicAssets = dynamic(
  () => import("../../src/components/AddressAssets"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false
  }
);

const DynamicLockedAssets = dynamic(
  () => import("../../src/components/AddressLockedAssets"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false
  }
);

const DynamicOverview = dynamic(() =>
  import("../../src/components/AddressOverview")
);

export default function AddressDetailPage(props) {
  const { address, tab } = props;
  const [state, setState] = useState({
    tab: tabMap[tab] || 0,
    assets: [],
    tlAssets: []
  });
  const handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    });
  };
  useEffect(() => {
    Promise.all([fetchAddressLockedAssets(address), fetchAdressAssets(address)])
      .then(data => {
        const [tlAssets, assets] = data;
        setState({
          ...state,
          assets,
          tlAssets
        });
      })
      .catch(e => {});
  }, [address]);
  
  const [overview, setOverview] = useState({
    address: /^[0-9a-zA-Z]{42}$/.test(address) ? address: ''
  });
  useEffect(() => {
    fetch(`/address/${address}`)
      .then(res => res.json())
      .then(res => {
        setOverview(res.data || {});
      })
      .catch(e => {});
    return () => {
      true;
    };
  }, [address]);

  const hasAssets = overview.assetHeld;
  const hasTlAssets = overview.tlAssetHeld;
  const publicAddress = overview.address;

  const { tlAssets, assets } = state;

  return (
    <>
      <PageHeading title="Address Detail" />
      {/* address overview  */}
      <Panel title="Overview" style={{ marginBottom: "1.75rem" }}>
        <DynamicOverview overview={overview} />
      </Panel>
      {/* address assets, mining, transactions */}
      <Panel>
        <FusionTabs value={state.tab} onChange={handleTabChange}>
          <FusionTab label="Transactions" />
          {hasAssets ? <FusionTab label="Assets"></FusionTab> : null}
          {hasTlAssets ? <FusionTab label="TimeLocked"></FusionTab> : null}
        </FusionTabs>
        <FusionTabPanels>
          <FusionTabPanel value={state.tab} index={0}>
            {publicAddress ? (
              <AddressTxs
                tableOptions={{
                  pageSizeOptions: [5, 10],
                  pageSize: 5
                }}
                address={publicAddress}
              />
            ) : <>Loading...</>}
          </FusionTabPanel>
          {hasAssets ? (
            <FusionTabPanel value={state.tab} index={1}>
              <DynamicAssets assets={state.assets} />
            </FusionTabPanel>
          ) : null}
          {hasTlAssets ? (
            <FusionTabPanel value={state.tab} index={2}>
              <DynamicLockedAssets assets={tlAssets} />
            </FusionTabPanel>
          ) : null}
        </FusionTabPanels>
      </Panel>
    </>
  );
}

AddressDetailPage.getInitialProps = async ({ query }) => {
  return { address: query.address };
};

const tabMap = {
  tx: 0,
  assets: 1,
  locked: 2
};

async function fetchAdressAssets(address) {
  return fetch(`/address/${address}/assets`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => []);
}

async function fetchAddressLockedAssets(address) {
  return fetch(`/address/${address}/tlassets`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => []);
}
