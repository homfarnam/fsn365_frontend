import React from "react";
import Transactions from "../Transactions";

export default function BlockTxs(props) {
  const { block } = props;
  return (
    <Transactions
      params={{ block }}
      tableOptions={{
        pageSizeOptions: [5, 10],
        pageSize: 5
      }}
    />
  );
}
