import React  from 'react';
import fetch from 'isomorphic-unfetch';
import Container from '@material-ui/core/Container';
import Panel from '../../src/components/Panel';
import KeyValue from '../../src/components/KeyValue';
import Box from '@material-ui/core/Box';
import PageHeading from '../../src/components/PageHeading';
import FusionAdressLink from "../../src/components/FusionAdressLink";


export default function AssetPage ({asset}) {
  return (
    <>
      <PageHeading title={'Asset'} suffix={`#${asset.symbol}`} />
      <Container>
        <Panel>
          <KeyValue label="Asset Name" value={asset.name} />
          <KeyValue label="Asset symbol" value={asset.symbol} />
          <KeyValue label="Asset ID" value={asset.id} />
          <KeyValue label="Decimals" value={asset.decimals} />
          <KeyValue label="Total Supply" value={+asset.total/Math.pow(10, asset.decimals)} />
          <KeyValue label="Changeable" value={asset.changeable ? 'Yes': 'No'} />
          <KeyValue label="Issuer">
            <FusionAdressLink address={asset.issuer} />
          </KeyValue>
          <KeyValue label="Issue Height" value={asset.block} />
          <KeyValue label="Verified">
            {asset.verified ? <Box color="success.main" component="strong">Yes</Box> : <Box color="error.main" component="strong">No</Box>}
          </KeyValue>
        </Panel>
      </Container>
    </>
  )
}

AssetPage.getInitialProps = async ({query}) =>{
  const { hash } = query;
  const asset = await fetch(`http://localhost:8888/api/asset/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => ({hash}));
  return {
    asset
  }
}