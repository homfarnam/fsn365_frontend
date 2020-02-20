import React from "react";
import Box from "@material-ui/core/Box";
import TimeAgo from "../TimeAgo";
import NavLink from "../NavLink";
import KeyValue from "../KeyValue";
import FusionAddressLink from "../FusionAddressLink";
import Duration from "../Duration";
import getConfig from "next/config";

export default function TxOverview(props) {
  const { tx } = props;
  const valueData = tx.value;
  const { publicRuntimeConfig } = getConfig();
  const apiServer = publicRuntimeConfig.API_PATH;
  return (
    <div className="tx-overview">
      <KeyValue label="hash">
        <a href={`${apiServer}tx/${tx.hash}/detail`} target={"_blank"}>
          {tx.hash}
        </a>
      </KeyValue>
      {valueData.lockType ? (
        <KeyValue label={"Lock Type"}>{valueData.lockType}</KeyValue>
      ) : null}
      {valueData.assetID ? (
        <KeyValue label="Value">
          {valueData.value ? (+valueData.value).toFixed(0) : ""}{" "}
          {valueData.assetID ? (
            <NavLink href={`/asset/${valueData.assetID}`}>
              {valueData.coin}
            </NavLink>
          ) : (
            <span>{valudData.coin}</span>
          )}
        </KeyValue>
      ) : null}
      {valueData.miner ? (
        <KeyValue label={"Miner"}>
          <NavLink href={`/staking/${valueData.miner}`}>
            {valueData.miner}
          </NavLink>
        </KeyValue>
      ) : null}
      {valueData.ticket ? (
        <KeyValue label={"Ticket ID"}>{valueData.ticket}</KeyValue>
      ) : null}
      {valueData.startTime ? (
        <KeyValue label="Duration">
          <Duration
            startTime={valueData.startTime}
            endTime={valueData.endTime}
          />
        </KeyValue>
      ) : null}
      {tx.type == "GenAssetFunc" ? (
        <KeyValue label="Generated Asset">
          <NavLink href={`/asset/${valueData.assetID}`}>
            {valueData.coin}
          </NavLink>
        </KeyValue>
      ) : null}
      {tx.type == "GenNotationFunc" ? (
        <KeyValue label="Notation">{tx.value}</KeyValue>
      ) : null}
      {valueData.swapID ? (
        <KeyValue label={"Swap ID"}>
          <a href={`${apiServer}swap/${valueData.swapID}`} target={"_blank"}>
            {valueData.swapID}
          </a>
        </KeyValue>
      ) : null}
      {valueData.finished !== undefined ? (
        <KeyValue label={"Swap Status"}>
          {valueData.finished ? "Finished" : "Active"}
        </KeyValue>
      ) : null}
      <KeyValue label="Tx Status">
        <Box component="strong" color="success.main">
          Success
        </Box>
      </KeyValue>
      <KeyValue label="Block">
        <NavLink href={`/block/${tx.block}`}>{tx.block}</NavLink>
      </KeyValue>
      {!valueData.miner ? (
        <KeyValue label="from">
          <FusionAddressLink address={tx.from} />
        </KeyValue>
      ) : null}
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
