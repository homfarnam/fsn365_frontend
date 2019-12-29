import React from 'react';
import Container from '@material-ui/core/Container';
import MiningState from '../../src/components/MiningState';
import MiningOverview from '../../src/components/MiningOverview';
import PageHeading from '../../src/components/PageHeading';

export default function MinerStakingPage ({miner, tab="block"}) {
  return (
    <>
       <PageHeading title={'Node Monitor'}  />
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