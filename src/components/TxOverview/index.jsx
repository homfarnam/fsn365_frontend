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
  const valuedData = tx.value;
  const { publicRuntimeConfig } = getConfig();
  const apiServer = publicRuntimeConfig.API_PATH;
  return (
    <div className="tx-overview">
      <KeyValue label="hash">
        <a href={`${apiServer}tx/${tx.hash}/detail`} target={"_blank"}>
          {tx.hash}
        </a>
      </KeyValue>
      {valuedData.lockType ? (
        <KeyValue label={"Lock Type"}>{valuedData.lockType}</KeyValue>
      ) : null}
      {valuedData.assetID ? (
        <KeyValue label="Value">
          {valuedData.value ? (+valuedData.value).toFixed(0) : ""}{" "}
          {valuedData.assetID ? (
            <NavLink href={`/asset/${valuedData.assetID}`}>
              {valuedData.coin}
            </NavLink>
          ) : (
            <span>{valudData.coin}</span>
          )}
        </KeyValue>
      ) : null}
      {valuedData.startTime ? (
        <KeyValue label="Duration">
          <Duration
            startTime={valuedData.startTime}
            endTime={valuedData.endTime}
          />
        </KeyValue>
      ) : null}
      {tx.type == "GenAssetFunc" ? (
        <KeyValue label="Generated Asset">
          <NavLink href={`/asset/${valuedData.assetID}`}>
            {valuedData.coin}
          </NavLink>
        </KeyValue>
      ) : null}
      {tx.type == "GenNotationFunc" ? (
        <KeyValue label="Notation">{tx.value}</KeyValue>
      ) : null}
      {valuedData.swapID ? (
        <KeyValue label={"Swap ID"}>
          <a href={`${apiServer}swap/${valuedData.swapID}`} target={"_blank"}>
            {valuedData.swapID}
          </a>
        </KeyValue>
      ) : null}
      {valuedData.finished !== undefined ? (
        <KeyValue label={"Swap Status"}>
          {valuedData.finished ? "Finished" : "Active"}
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
