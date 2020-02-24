import React from "react";
import DoSearch from "../src/components/HomeSearchForm";
import FusionOverview from "../src/components/FusionOverview";
import NetworkState from "../src/components/NetworkState";
import fetch from "../src/libs/fetch";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bks: props.bks,
      txs: props.txs
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetchRealTimeData()
        .then(data => {
          this.setState(data);
        })
    }, 13 * 1000);
  }

  render() {
    const { bks, txs } = this.state;
    return (
      <>
        <DoSearch />
        <FusionOverview />
        <NetworkState bks={bks} txs={txs} />
      </>
    );
  }
}

HomePage.getInitialProps = async ({}) => {
  const data = await fetchRealTimeData();
  return {
    ...data
  };
};

function fetchRealTimeData() {
  return fetch("/latest")
    .then(res => res.json())
    .then(res => res.data)
    .then(data => {
      let { bks, txs } = data;
      const lBks = bks.map(bkItem => {
        return JSON.parse(bkItem);
      });
      const lTxns = txs.map(txItem => {
        return JSON.parse(txItem);
      });
      return {
        bks: lBks,
        txs: lTxns
      };
    })
    .catch(e => ({
      bks: [],
      txs: [],
      lBk: 0
    }));
}