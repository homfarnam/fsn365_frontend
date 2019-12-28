import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Transactions from '../src/components/Transactions';
import Panel from '../src/components/Panel';

export default function TxListPage (props) {
  return (
    <>
      <Head>
        <title>Transactions | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant='h6'>Transactions</Typography>
        <Panel>
          <Transactions
            params={props.params}
          />
        </Panel>
      </Container>
    </>
  )
}

TxListPage.getInitialProps = async ({query}) => {
  return {
    params: query
  }
}