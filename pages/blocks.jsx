import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Panel from '../src/components/Panel';
import Typography from '@material-ui/core/Typography';
import MinedBlocks from '../src/components/MinedBlocks';

export default function BlockListPage (props) {
  const {miner} = props;
  return (
    <>
      <Head>
        <title>Blocks | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant='h6'>Blocks</Typography>
        <Panel>
          <MinedBlocks
            miner={miner}
            tableOptions={{pageSize: 10, pageSizeOptions: [10,20,50]}}
          />
        </Panel>
      </Container>
    </>
  )
}

BlockListPage.getInitialProps = async({query}) => {
  return {
    ...query
  }
}