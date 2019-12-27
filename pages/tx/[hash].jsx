import React, { useState }  from 'react';
import fetch from 'isomorphic-unfetch';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import Panel from '../../src/components/Panel';
import Typography from '@material-ui/core/Typography';
import { FusionTab, FusionTabs, FusionTabPanel } from '../../src/components/FusionTabs';
import TxLog from '../../src/components/TxLog';
import FusionTabPanels from '../../src/components/FusionTabs/FusionTabPanels';
import TxOverview from '../../src/components/TxOverview';

export default function TransactionPage(props) {
  const { tx } = props;
  const txLog = tx && tx.log || {};
  const [ state, setState ] = useState({
    tab: 0,
  });
  
  const  handleTabChange = (e, newValue) => {
    setState({
      ...state,
      tab: newValue
    })
  };

  const txHasLog = Object.keys(txLog).length;
  return (
    <>
      <Head>
        <title>Tx#{tx.type} | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant="h6">Tx#{tx.type}<small>({tx.coin})</small></Typography>
        <Panel>
          <FusionTabs
            value={state.tab}
            onChange={handleTabChange}
          >
            <FusionTab label="Tx Overview" />
            {txHasLog ? <FusionTab label="Tx Log" />: null}
          </FusionTabs>
          <FusionTabPanels>
            <FusionTabPanel value={state.tab} index={0}>
              <TxOverview tx={tx} />
            </FusionTabPanel>
            {txHasLog ? <FusionTabPanel value={state.tab} index={1}><TxLog log={txLog} /></FusionTabPanel>: null}
          </FusionTabPanels>
        </Panel>
      </Container>
    </>
  )
}

TransactionPage.getInitialProps = async ({query, res}) =>{
  const { hash } = query;
  const tx = await fetch(`http://localhost:8888/api/tx/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => {});
  return {
    tx
  }
}