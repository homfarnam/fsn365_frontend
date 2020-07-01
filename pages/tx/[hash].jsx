import React from "react";
import Panel from "../../src/components/Panel";
import TxOverview from "../../src/components/TxOverview";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import TextStrong from "../../src/components/TextStrong";

export default function TransactionPage(props) {
  const { tx = {}, hash } = props;

  if (!tx.hash) {
    return (
      <>
        <PageHeading title={"Bad Tx"} />
        <Panel>
          The hash:{" "}
          <TextStrong>
            <em>{hash}</em>
          </TextStrong>{" "}
          is invalid. Please check!
        </Panel>
      </>
    );
  }

  const typeText = tx.type.replace('Ext', '').replace('Func', '');
  return (
    <>
      <PageHeading
       title="Tx"
       suffix={'# '+ typeText}
       canonical={`tx/${tx.hash}`}
      />
      <Panel>
        <TxOverview tx={tx} />
      </Panel>
    </>
  );
}

TransactionPage.getInitialProps = async ({ query }) => {
  const { hash } = query;
  const tx = await axios.get(`txn/${hash}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => {});
  return {
    tx: tx || { type: "" },
    hash
  };
};
