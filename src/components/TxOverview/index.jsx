import React from "react";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import KeyValue from "../KeyValue";

export default function TxOverview(props) {
  const { tx } = props;
  return (
    <div className="tx-overview">
      <KeyValue label="hash" value={tx.hash} />
      <KeyValue label="status" value={tx.status ? "success" : "failed"} />
      <KeyValue label="Block">
        <NavLink href={`/block/${tx.block}`}>{tx.block}</NavLink>
      </KeyValue>
      <KeyValue label="from">
        <NavLink href={`/address/${tx.from}`}>{tx.from}</NavLink>
      </KeyValue>
      <KeyValue label="to">
        <NavLink href={`/address/${tx.to}`}>{tx.to}</NavLink>
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
