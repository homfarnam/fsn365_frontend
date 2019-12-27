import React, { Component } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import FusionTable from '../src/components/FusionTable';
import NavLink from '../src/components/NavLink';
import TimeAgo from '../src/components/TimeAgo';
import Panel from '../src/components/Panel';
import Typography from '@material-ui/core/Typography';


export default class TxListPage extends Component {
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
          <title>Transactions | FSN explorer</title>
        </Head>
        <Container>
          <Typography variant='h6'>Transactions</Typography>
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
     fetch(`http://localhost:8888/api/tx`)
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

TxListPage.getInitialProps = async ({query, res}) => {
  return {
    ...query,
    isServer: !!res
  }
}

const columns = [
  {
    field: "hash",
    title: "Tx Hash",
    render: row => {
      const style = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        maxWidth: '120px'
      }
      return (
        <NavLink href={`/tx/${row.hash}`} className="tx-hash is-hash">
          <span style={style}>{row.hash}</span>
        </NavLink>
      );
    }
  },
  {
    field: "from",
    title: "From",
    render: row => {
      const style = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        maxWidth: '120px'
      }
      return (
        <NavLink href={`/address/${row.from}`} className="tx-from is-hash">
          <span style={style}>{row.from}</span>
        </NavLink>
      );
    }
  },
  {
    field: "to",
    title: "To",
    render: row => {
      const style = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        maxWidth: '120px'
      }
      return (
        <NavLink href={`/address/${row.to}`} className="tx-to is-hash">
          <span style={style}>{row.to}</span>
        </NavLink>
      );
    }
  },
  {
    field: "block",
    title: "Block",
    render: row => {
      return (
        <NavLink href={`/block/${row.block}`} className="tx-block">
          {row.block}
        </NavLink>
      );
    }
  },
  {
    field: "timestamp",
    title: "Age",
    render: row => {
      const style = {
        minWidth: '120px',
        display: 'inline-block'
      }
      return (
        <span style={style}>
          <TimeAgo time={row.timestamp * 1000} />
        </span>
      );
    }
  },
  {
   field: "type",
    title: "Type"
  },
  {
   field: "gasUsed",
    title: "Fees"
  }
];