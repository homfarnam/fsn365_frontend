import React from "react";
import Panel from "../../src/components/Panel";
import KeyValue from "../../src/components/KeyValue";
import Box from "@material-ui/core/Box";
import PageHeading from "../../src/components/PageHeading";
import FusionAddressLink from "../../src/components/FusionAddressLink";
import fetch from "../../src/libs/fetch";
import NavLink from "../../src/components/NavLink";

export default function AssetPage({ asset = {} }) {
  return (
    <>
      <PageHeading title={"Asset"} suffix={`#${asset.symbol}`} />
      <Panel>
        <KeyValue label="Asset Name" value={asset.name} />
        <KeyValue label="Asset symbol" value={asset.symbol} />
        <KeyValue label="Asset ID" value={asset.id} />
        <KeyValue label="Decimals" value={asset.decimals} />
        <KeyValue
          label="Total Supply"
          value={+asset.total / Math.pow(10, asset.decimals)}
        />
        <KeyValue
          label="Changeable Supply"
          value={asset.changeable ? "Yes" : "No"}
        />
        <KeyValue label="Issuer">
          <FusionAddressLink address={asset.issuer} />
        </KeyValue>
        <KeyValue label="Issue Height">
          {asset.height ? (
            <NavLink href={`/block/${asset.height}`}></NavLink>
          ) : (
            <a href="https://en.bitcoin.it/wiki/Genesis_block" target="_blank">
              Genesis Block
            </a>
          )}
        </KeyValue>
        <KeyValue label="Verified">
          {asset.verified ? (
            <Box color="success.main" component="strong">
              Yes
            </Box>
          ) : (
            <Box color="error.main" component="strong">
              No
            </Box>
          )}
        </KeyValue>
      </Panel>
    </>
  );
}

AssetPage.getInitialProps = async ({ query }) => {
  const { hash } = query;
  const asset = await fetch(`/asset/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => ({ hash }));
  return {
    asset
  };
};
