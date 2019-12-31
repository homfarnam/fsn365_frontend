import React, {useState, useEffect} from 'react';
import FusionTabPanels, { FusionTab, FusionTabs, FusionTabPanel } from '../../src/components/FusionTabs';
import Panel from '../../src/components/Panel';
import PageHeading from '../../src/components/PageHeading';
import fetch from '../../src/libs/fetch';
import dynamic from 'next/dynamic';

const DynamicTransactions = dynamic(() => import('../../src/components/Transactions'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const DynamicAssets =  dynamic(() => import('../../src/components/AddressAssets'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const DynamicLockedAssets =  dynamic(() => import('../../src/components/AddressLockedAssets'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const DynamicOverview = dynamic(() => import('../../src/components/AddressOverview'))

export default function AddressDetailPage(props) {
  const { address, tab }  = props;
  const [ state, setState ] = useState({
    tab: tabMap[tab] || 0,
    assets: [],
    locked: [],
  });
  const  handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    })
  };
  useEffect(() => {
    Promise.all([fetchAddressLockedAssets(address), fetchAdressAssets(address)])
      .then((data) => {
        const [locked, assets] = data;
        setState({
          ...state,
          assets,
          locked
        })
      }).catch(e =>{})
  }, [address]);

  const {assets, locked} = state;
  const hasAssets = !!assets.length;
  const hasLockedAssets = !!locked.length;

  return (
    <>
      <PageHeading title="Address Detail" />
      {/* address overview  */}
        <DynamicOverview  address={address} />
      {/* address assets, mining, transactions */}
        <Panel>
          <FusionTabs value={state.tab} onChange={handleTabChange} style={{marginBottom: '1.75rem'}}>
            <FusionTab label="Transactions" />
            {hasAssets ?<FusionTab label="Assets"></FusionTab>:null}
            {hasLockedAssets ?<FusionTab label="TimeLocked"></FusionTab>:null}
          </FusionTabs>
          <FusionTabPanels>
            <FusionTabPanel value={state.tab} index={0}>
              <DynamicTransactions
                params={{from:address}}
                tableOptions={{
                  pageSizeOptions: [5, 10],
                  pageSize: 5
                }}
              />
            </FusionTabPanel>
              { 
              hasAssets ? 
                (<FusionTabPanel value={state.tab} index={1}>
                  <DynamicAssets assets={state.assets} />
                </FusionTabPanel>):
                null
              }
           {
             hasLockedAssets ?
                (<FusionTabPanel value={state.tab} index={2}>
                  <DynamicLockedAssets assets={locked} />
                </FusionTabPanel>)
                :null
           }
          </FusionTabPanels>
        </Panel>
    </>
  )
}

AddressDetailPage.getInitialProps = async({query}) => {
  return {address:query.address}
};

const tabMap = {
  'tx': 0, 
  'assets': 1,
  'locked': 2,
};

function fetchAdressAssets(address) {
   return  fetch(`/address/${address}/assets`)
  .then(res => res.json())
  .then(res => res.data)
  .catch((e) => ([]));
 };

function fetchAddressLockedAssets(address)  {
  return fetch(`/address/${address}/locked`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(e => ({}))
  .then(assetsMap => {
    const lockedAssets = [];
    Object.keys(assetsMap).map((key) => {
      const {name, symbol,verified, decimals, items = []} = assetsMap[key];
      const locked = items.map(item =>{
        return {
          quantity: (+item.value) / Math.pow(10, +decimals),
          startTime: item.startTime * 1000,
          endTime: item.endTime * 1000,
          symbol,
          verified,
          name,
          id: key
        }
      });
      lockedAssets.push(...locked);
    });
    return lockedAssets;
  })
  .catch((e) =>([]));
};