import React, { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import Panel from '../../src/components/Panel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FusionTab, FusionTabs, FusionTabPanel } from '../../src/components/FusionTabs';
import FusionTabPanels from '../../src/components/FusionTabs/FusionTabPanels';
import BlockOverview from '../../src/components/BlockOverview';
import TxsInBlock from '../../src/components/TxsInBlock';

const tabMap = {
  'overview': 0,
  'tx': 1
};

export default function BlockPage (props) {
  const { block, tab = "overview" } = props;
  const [ state, setState ] = useState({
    tab: tabMap[tab] || 0,
  });
  
  const  handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    });
  };

  const hasTx = block.txCount > 0;
  return (
    <>
      <Head>
        <title>Block#{block.height} | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant='h6'>Block#{block.height}</Typography>
        <Panel>
          <FusionTabs
            value={state.tab}
            onChange={handleTabChange}
            style={{marginBottom: '1.75rem'}}
          >
            <FusionTab label="overview"  />
            {hasTx ? <FusionTab label="Txs" />:null}
          </FusionTabs>
          <FusionTabPanels>
            <FusionTabPanel value={state.tab} index={0}><BlockOverview block={block} /></FusionTabPanel>
            {hasTx ? <FusionTabPanel value={state.tab} index={1}><TxsInBlock block={block.height} /></FusionTabPanel>:null}
          </FusionTabPanels>
        </Panel>
      </Container>
    </>
  )
}

BlockPage.getInitialProps = async ({query, res}) =>{
  const height = Math.abs(Number(query.height));
  if(isNaN(height)) {
    if(res) {
      res.writeHead(302, {
        Location: '/blocks'
      });
      res.end();
    } else {
      Router.push('/blocks')
    }
  } else {
     const block = await fetch(`http://localhost:8888/api/block/${height}`)
      .then(res => res.json())
      .then(res => res.data)
      .catch(e => {});
    return {
      block,
      ...query,
      isServer:!!res
    }
  }
}