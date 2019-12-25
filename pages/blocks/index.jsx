import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

export default function BlockListPage (props) {
  return (
    <>
      <Head>
        <title>blocks | FSN explorer</title>
      </Head>
      <Container>
        <h3>Block list page</h3>
        {JSON.stringify(props)}
      </Container>
    </>
  )
}

BlockListPage.getInitialProps = async ({query, res, req}) => {
  if(res) {
    return {
      isServer: true,
      ...query,
    }
  } else {
    return {
      ...query
    }
  }
}