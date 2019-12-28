import React  from 'react';
import fetch from 'isomorphic-unfetch';
import Container from '@material-ui/core/Container';
import Head from 'next/head';
import Panel from '../../src/components/Panel';
import Typography from '@material-ui/core/Typography';
import KeyValue from '../../src/components/KeyValue';
import NavLink from '../../src/components/NavLink';

export default function AssetPage ({asset}) {
  return (
    <>
      <Head>
        <title>Asset#{asset.symbol} | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant="h6">Asset#{asset.symbol}</Typography>
        <Panel>
          <KeyValue label="Asset Name" value={asset.name} />
          <KeyValue label="Asset symbol" value={asset.symbol} />
          <KeyValue label="Asset ID" value={asset.id} />
          <KeyValue label="Decimals" value={asset.decimals} />
          <KeyValue label="Total Supply" value={asset.total} />
          <KeyValue label="Changeable" value={asset.changeable ? 'Yes': 'No'} />
          <KeyValue label="Issuer">
            <NavLink href={`/address/${asset.issuer}`}>{asset.issuer}</NavLink>
          </KeyValue>
          <KeyValue label="Issue Height" value={asset.block} />
          <KeyValue label="Verified" value={asset.verified ?'Yes': 'No'} />
        </Panel>
      </Container>
    </>
  )
}

AssetPage.getInitialProps = async ({query, res}) =>{
  const { hash } = query;
  const asset = await fetch(`http://localhost:8888/api/asset/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => ({hash}));
  return {
    asset
  }
}