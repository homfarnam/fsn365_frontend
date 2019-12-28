import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import MiningState from '../../src/components/MiningState';
import MiningOverview from '../../src/components/MiningOverview';

export default function MinerStakingPage ({miner, tab="block"}) {
  return (
    <>
      <Head><title>Node Monitor | FSN explorer</title></Head>
      <Container style={{marginBottom: '1.25rem'}}>
        <Typography variant="h4">Node Monitor</Typography>
      </Container>
      <Container style={{marginBottom: '1.75rem'}}>
        <MiningOverview miner={miner} />
      </Container>
      <Container>
        <MiningState miner={miner} view={tab} />
      </Container>
    </>
  )
}

MinerStakingPage.getInitialProps = async ({query, res}) =>{
  return {
    ...query,
  }
}