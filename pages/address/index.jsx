import React, { Component } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import FusionTable from '../../src/components/FusionTable';
import NavLink from '../../src/components/NavLink';
import Panel from '../../src/components/Panel';
import { Typography } from '@material-ui/core';


export default class AddressListPage extends Component {
  state = {
    loading: false,
  };

  render () {
    const tableOptions = {
      headerStyle: {
        textAlign: 'center'
      },
      cellStyle: {
        textAlign: 'center'
      },
      toolbar:false,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50]
    };
    const style = {
      border: "none",
      boxShadow: "none",
      paddingBottom: "1.75rem"
    };

    return (
      <>
        <Head>
          <title>Fusion Addresses | FSN explorer</title>
        </Head>
        <Container>
          <Typography variant='h6'>Fusion Addresses</Typography>
          <Panel>
            <FusionTable
              data = {this.fetchData}
              columns={columns}
              options={tableOptions}
              style={style}
            />
          </Panel>
        </Container>
      </>
    )
  }

  fetchData =  () => new Promise( (resolve) => {
    const state = this.state;
    if(state.loading) {
      return;
    }
    this.setState({
      ...state,
      loading: true
    })
     fetch(`http://localhost:8888/api/address`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          loading: false,
        });
        resolve({
          data: data.data,
          page: data.page - 1 ,
          totalCount: data.total
        })
      })
      .catch(e => {
        this.setState({
          loading: false
        })
        resolve({
          data: [],
          page: 1,
          totalCount: 0
        })
      });
  })
}

AddressListPage.getInitialProps = async ({query, res, req}) => {
  return {
    ...query,
    isServer: !!res
  }
}
const columns = [
  {
    field: "address",
    title: "Address",
    sorting: false,
    render: row => {
      return (
        <NavLink
          href={`/address/${row.address}`}
          className="ads-hash"
        >
          {row.address}
        </NavLink>
      );
    }
  },
  {
    field: "san",
    title: "SAN",
    sorting: false,
    render: row => {
      return (
        <span className="ads-san" title={row.san}>
          {row.san}
        </span>
      );
    }
  },
  {
    filed: "fsnBalance",
    title: "FSN Balance",
    render: row  => {
      return <span className="ads-fsnBalance">{row.fsnBalance}</span>;
    }
  },
  {
    field: "transactions",
    title: "Transactions",
    sorting: false,
    render: row => {
      return <span className="ads-transactions">{row.txCount}</span>;
    }
  },
  {
    field: "stakingRewards",
    title: "Staking Rewards",
    render: row => {
      return <span className="ads-rewards">{row.rewards}</span>;
    }
  }
];
