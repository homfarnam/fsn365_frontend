import React from "react";
import Panel from "../../src/components/Panel";
import KeyValue from "../../src/components/KeyValue";
import PageHeading from "../../src/components/PageHeading";
import FusionAddressLink from "../../src/components/FusionAddressLink";
import fetch from "../../src/libs/fetch";
import NavLink from "../../src/components/NavLink";
import OutLink from '../../src/components/OutLink';
import StatusText from '../../src/components/StatusText';
import UTCTime from '../../src/components/UTCTime';

export default function AssetPage({ asset = {} }) {
  return (
    <>
      <PageHeading
        title={"Asset"}
        suffix={`#${asset.symbol}`}
        canonical={`asset/${asset.id}`}
      />
      <Panel>
        <KeyValue label="Asset Name" value={asset.name} />
        <KeyValue label="Asset symbol" value={asset.symbol} />
        <KeyValue label="Asset ID" value={asset.id} />
        <KeyValue label="Decimals">{`${asset.decimals}`}</KeyValue>
        <KeyValue
          label="Supply"
          value={+asset.total / Math.pow(10, asset.decimals)}
        />
        <KeyValue
          label="Changeable Supply"
          value={asset.changeable ? "Yes" : "No"}
        />
        <KeyValue label="Issuer">
          <FusionAddressLink address={asset.issuer} />
        </KeyValue>
        <KeyValue label={"Description"}>{JSON.stringify(asset.description)}</KeyValue>
        <KeyValue label="Issue Height">
          {asset.issueBk ? (
          <NavLink href={`/block/${asset.issueBk}`}>{asset.issueBk}</NavLink>
          ) : (
            <OutLink href="https://en.bitcoin.it/wiki/Genesis_block">
              Genesis Block
            </OutLink>
          )}
        </KeyValue>
          <KeyValue label={"Issue Time"}>
            <UTCTime time={asset.issueTime} />
          </KeyValue>
        <KeyValue label="Verified">
          {asset.verified ? (
            <StatusText>
              <strong>Yes</strong>
            </StatusText>
          ) : (
            <StatusText isOk={false}>
              <strong>No</strong>
            </StatusText>
          )}
        </KeyValue>
      </Panel>
    </>
  );
}

AssetPage.getInitialProps = async ({ query }) => {
  const { hash } = query;
  const asset = await fetch(`asset/${hash}`)
    .catch(e => ({ hash }));
  return {
    asset
  };
};
