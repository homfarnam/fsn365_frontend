import React from "react";
import DoSearch from "../src/components/HomeSearchForm";
import FusionOverview from "../src/components/FusionOverview";
import NetworkState from "../src/components/NetworkState";
import fetch from "../src/libs/fetch";
import PageHeading from '../src/components/PageHeading';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: props.overview,
      realTime: props.realTime,
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetchHomeData().then((data) => {
        this.setState(data);
      });
    }, 3.5 * 1000);
  }

  render() {
    const { overview, realTime } = this.state;
    return (
      <>
        <PageHeading />
        <DoSearch />
        <FusionOverview overview={overview} />
        <NetworkState bks={realTime.bks} txs={realTime.txs} />
      </>
    );
  }
}

HomePage.getInitialProps = async ({}) => {
  const data = await fetchHomeData();
  return {
    ...data,
  };
};

async function fetchHomeData() {
  return Promise.all([fetchRealTimeData(), fetchNetworkOverview()])
    .then((result) => {
      return {
        overview: result[1],
        realTime: result[0],
      };
    })
    .catch((e) => ({
      realTime: {
        bks: [],
        txs: [],
      },
      overview: {
        priceData: {},
      },
    }));
}

async function fetchRealTimeData() {
  return fetch("latest")
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => ({
      bks: [],
      txs: [],
      lBk: 0,
    }));
}

async function fetchNetworkOverview() {
  return fetch(`stats`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((e) => ({ priceData: {} }));
}
