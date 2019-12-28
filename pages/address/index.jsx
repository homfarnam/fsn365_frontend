import React  from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import FusionTable from '../../src/components/FusionTable';
import NavLink from '../../src/components/NavLink';
import Panel from '../../src/components/Panel';
import Typography from '@material-ui/core/Typography';


export default function AddressListPage (props) {
  return (
    <>
      <Head>
        <title>Fusion Addresses | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant='h6'>Fusion Addresses</Typography>
        <Panel>
          <FusionTable
            data = {fetchData}
            columns={columns}
            options={{toolbar:false}}
          />
        </Panel>
      </Container>
    </>
  )
 }
 const fetchData =  ({page, pageSize}) => new Promise((resolve) => {
   const query = `?page=${page+1}&size=${pageSize}`;
    fetch(`http://localhost:8888/api/address${query}`)
    .then(res => res.json())
    .then((data) => {
      resolve({
        data: data.data,
        page: data.page - 1 ,
        totalCount: data.total
      })
    })
    .catch(e => {
      resolve({
        data: [],
        page: 0,
        totalCount: 0
      })
    });
})

const columns = [
  {
    field: "address",
    title: "Address",
    sorting: false,
    render: row => <NavLink href={`/address/${row.address}`}>{row.address}</NavLink>
  },
  {
    field: "san",
    title: "SAN",
    sorting: false,
  },
  {
    filed: "fsnBalance",
    title: "FSN Balance",
    render: row  => <span>{row.fsnBalance}</span>
  },
  {
    field: "transactions",
    title: "Transactions",
    sorting: false,
    render: row => <span>{row.txCount}</span>
  },
  {
    field: "stakingRewards",
    title: "Staking Rewards",
    sorting: false,
    render: row =>  <span >{row.rewards}</span>
  }
];
