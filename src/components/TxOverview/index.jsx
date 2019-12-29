import React from "react";
import Box from "@material-ui/core/Box";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import KeyValue from "../KeyValue";
import FusionAdressLink from "../FusionAdressLink";

export default function TxOverview(props) {
  const { tx } = props;
  return (
    <div className="tx-overview">
      <KeyValue label="hash" value={tx.hash} />
      <KeyValue label="status">
        {tx.status ? (
          <Box component="strong" color="success.main">
            Success
          </Box>
        ) : (
          <Box component="strong" color="error.main">
            Failed
          </Box>
        )}
      </KeyValue>
      <KeyValue label="Block">
        <NavLink href={`/block/${tx.block}`}>{tx.block}</NavLink>
      </KeyValue>
      <KeyValue label="from">
        <FusionAdressLink address={tx.from} />
      </KeyValue>
      <KeyValue label="to">
        <FusionAdressLink address={tx.to} />
      </KeyValue>
      <KeyValue label="timestamp">
        <span>
          <TimeAgo time={tx.timestamp * 1000}></TimeAgo>
        </span>
      </KeyValue>
      <KeyValue label="nonce" value={tx.nonce} />
    </div>
  );
}
