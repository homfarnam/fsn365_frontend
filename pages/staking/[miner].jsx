import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Panel from '../../src/components/Panel';
import MiningState from '../../src/components/MiningState';

export default class MinerStakingPage extends Component {
  state = {};

  render() {
    const { miner, tab = 'block' } = this.props;
    return (
      <>
        <Head><title>Node Monitor | FSN explorer</title></Head>
        <Container style={{marginBottom: '1.25rem'}}>
          <Typography variant="h4">Node Monitor</Typography>
        </Container>
        <Container style={{marginBottom: '1.75rem'}}>
          <Panel>
            <Typography variant="h6"><span>Overview</span></Typography>
          </Panel>
        </Container>
        <Container>
          <MiningState miner={miner} view={tab} />
        </Container>
      </>
    )
  }

  handleChange = (e, newValue) => {
    console.log(e);
  }
}

MinerStakingPage.getInitialProps = async ({query, res}) =>{
  return {
    ...query,
    isServer: !!res
  }
}