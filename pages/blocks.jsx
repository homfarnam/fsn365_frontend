import React, { Component } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import FusionTable from '../src/components/FusionTable';
import NavLink from '../src/components/NavLink';
import TimeAgo from '../src/components/TimeAgo';
import Panel from '../src/components/Panel';
import Typography from '@material-ui/core/Typography';


export default class BlockListPage extends Component {
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
          <title>Blocks | FSN explorer</title>
        </Head>
        <Container>
          <Typography variant='h6'>Blocks</Typography>
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
     fetch(`http://localhost:8888/api/block`)
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

BlockListPage.getInitialProps = async ({query, res}) => {
  return {
    ...query,
    isServer: !!res
  }
}
const columns = [ {
    field: "height",
    title: "Block",
    sorting: false,
    render: row => {
      return (
        <NavLink href={`/block/${row.height}`} className="bk-height">
          {row.height}
        </NavLink>
      );
    }
  },
  {
    field: "timestamp",
    title: "Age",
    sorting: false,
    render:row =>{
      const style = {
        display: 'inline-block',
        minWidth: '120px'
      };
      return (
        <span className="bk-age" style={style}>
          <TimeAgo time={row.timestamp * 1000} />
        </span>
      );
    }
  },
  {
    field: "miner",
    title: "Miner",
    sorting: false,
    render: row => {
      return (
        <NavLink href={`/address/${row.miner}`} className="bk-miner is-hash">
          {row.miner}
        </NavLink>
      );
    }
  },
  {
    dataField: "txCount",
    title: "Txn",
    sorting: false,
    render: row => {
      return (
        row.txCount && (
          <NavLink href={`/txs?block=${row.height}`} className="bk-txCount">{row.txCount}</NavLink>
        )
      );
    }
  },
  {
    field: "gasUsed",
    title: "Gas Used",
    sorting: false,
    render: row => {
      return (
        <span className="bk-gasUsed">
          {row.gasUsed}({((row.gasUsed / row.gasLimit) * 100).toFixed(2)}%)
        </span>
      );
    }
  },
  {
    field: "gasLimit",
    title: "Gas Limit",
    sorting: false,
    render: row =>  {
      return <span className="bk-gasLimit">{row.gasLimit}</span>;
    }
  }]