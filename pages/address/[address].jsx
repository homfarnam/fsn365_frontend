import React, { useState, useEffect } from "react";
import FusionTabPanels, {
  FusionTab,
  FusionTabs,
  FusionTabPanel
} from "../../src/components/FusionTabs";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import AddressTxs from "../../src/components/AddressTxs";
import NotFound from "../../src/components/NotFound";
import AddressAssets from "../../src/components/AddressAssets";
import AddressTimeLockedAssets from "../../src/components/AddressLockedAssets";
import AddressOverview from "../../src/components/AddressOverview";

export default function AddressDetailPage(props) {
  const { address, tab, overview = {} } = props;

  if (!overview.id) {
    return (
      <>
        <PageHeading title="Address Detail" />
        <Panel style={{ textAlign: "center", padding: "10vh 0" }}>
          <NotFound />
        </Panel>
      </>
    );
  }

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

  const hasAssets = overview.assetsHeld;
  const hasTlAssets = overview.tlAssetsHeld;
  const publicAddress = overview.id;
  return (
    <>
      <PageHeading title="Address Detail" />

      <Panel title="Overview" style={{ marginBottom: "1.75rem" }}>
        <AddressOverview overview={overview} />
      </Panel>

      <Panel>
        <FusionTabs value={state.tab} onChange={handleTabChange}  style={{marginBottom: 0}}>
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
            ) : null}
          </FusionTabPanel>
          {hasAssets ? (
            <FusionTabPanel value={state.tab} index={1}>
              <AddressAssets assets={state.assets} />
            </FusionTabPanel>
          ) : null}
          {hasTlAssets ? (
            <FusionTabPanel value={state.tab} index={2}>
              <AddressTimeLockedAssets assets={state.tlAssets} />
            </FusionTabPanel>
          ) : null}
        </FusionTabPanels>
      </Panel>
    </>
  );
}

AddressDetailPage.getInitialProps = async ({ query }) => {
  const address = query.address;
  const pubReg = /^[0-9a-zA-Z]{42}$/;
  const sanReg = /^[1-9]{1}[0-9]{2,}$/;
  if (!pubReg.test(query.address) && !sanReg.test(query.address)) {
    return {};
  }
  const overview = await fetch(`address/${address}`)
    .then(res => res.json())
    .then(res => res.data || {})
    .catch(e => ({}));

  return { address: query.address, overview };
};

const tabMap = {
  tx: 0,
  assets: 1,
  locked: 2
};

async function fetchAdressAssets(address) {
  return fetch(`address/${address}/assets`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => []);
}

async function fetchAddressLockedAssets(address) {
  return fetch(`address/${address}/tlassets`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => []);
}
