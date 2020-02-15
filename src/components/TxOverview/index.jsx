import React from "react";
import Box from "@material-ui/core/Box";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import KeyValue from "../KeyValue";
import FusionAddressLink from "../FusionAddressLink";
import Duration from "../Duration";

export default function TxOverview(props) {
  const { tx } = props;
  return (
    <div className="tx-overview">
      <KeyValue label="hash" value={tx.hash} />
      {tx.assetID ? (
        <KeyValue label="Value">
          {tx.value ? (+tx.value).toFixed(0) : ""}{" "}
          {tx.assetID ? (
            <NavLink href={`/asset/${tx.assetID}`}>{tx.coin}</NavLink>
          ) : (
            <span>{tx.coin}</span>
          )}
        </KeyValue>
      ) : null}
      {tx.startTime ? (
        <KeyValue label="Duration">
          <Duration startTime={tx.startTime} endTime={tx.endTime} />
        </KeyValue>
      ) : null}
      {tx.type == "GenAssetFunc" ? (
        <KeyValue label="Generated Asset">
          <NavLink href={`/asset/${tx.assetID}`}>{tx.coin}</NavLink>
        </KeyValue>
      ) : null}
      {tx.type == "GenNotationFunc" ? (
        <KeyValue label="Notation">{tx.value}</KeyValue>
      ) : null}
      <KeyValue label="status">
        <Box component="strong" color="success.main">
          Success
        </Box>
      </KeyValue>
      <KeyValue label="Block">
        <NavLink href={`/block/${tx.block}`}>{tx.block}</NavLink>
      </KeyValue>
      <KeyValue label="from">
        <FusionAddressLink address={tx.from} />
      </KeyValue>
      <KeyValue label="to">
        <FusionAddressLink address={tx.to} />
      </KeyValue>
      <KeyValue label="Time">
        <span>
          <TimeAgo time={tx.timestamp * 1000}></TimeAgo>
        </span>
      </KeyValue>
    </div>
  );
}
