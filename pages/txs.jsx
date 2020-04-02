import React from "react";
import Transactions from "../src/components/Transactions";
import Panel from "../src/components/Panel";
import PageHeading from "../src/components/PageHeading";
import { TXN_TYPES_MAP } from "../src/constants/txnType";
import TxnsHints from "../src/components/TxnsHints";

export default function TxListPage({ params }) {
  let type = TXN_TYPES_MAP[params.type];
  type = type ? `#${type}` : '';

  return (
    <>
      <PageHeading title="Transactions" suffix={type} />
      <Panel style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
        <TxnsHints {...params} type={type} />
        <Transactions params={params} />
      </Panel>
    </>
  );
}

TxListPage.getInitialProps = async ({ query }) => {
  if (query.from) {
    query.from = query.from.toLowerCase();
  }
  if (query.to) {
    query.to = query.to.toLowerCase();
  }
  if(query.address) {
    query.address = query.address.toLowerCase();
  }
  return {
    params: query,
  };
};
