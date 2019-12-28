import React from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import fetch from "isomorphic-unfetch";
import Panel from '../src/components/Panel';
import FusionTable from '../src/components/FusionTable';
import NavLink from "../src/components/NavLink";

export default function AssetListPage (props) {
  return (
    <>
      <Head>
        <title>Assets On Fusion | FSN explorer</title>
      </Head>
      <Container>
        <Typography variant='h6'>Assets</Typography>
        <Panel>
          <FusionTable
            columns={columns}
            data={fetchAssets}
            options={{toolbar: false}}
          />
        </Panel>
      </Container>
    </>
  )
}

AssetListPage.getInitialProps = async({query}) => {
  return {...query}
}

const fetchAssets = ({
    page,
    pageSize
  }) =>
  new Promise(resolve => {
    const pageQuery = `?page=${page + 1}&size=${pageSize}`;
    fetch(`http://localhost:8888/api/asset${pageQuery}`)
      .then(res => res.json())
      .then(data => {
        resolve({
          data: data.data,
          page: data.page - 1,
          totalCount: data.total
        });
      })
      .catch(e => {
        resolve({
          data: [],
          page: 1,
          totalCount: 0
        });
      });
  });

const columns =  [
  {
    field: "name",
    title: "Asset",
    sorting: false,
    render: row =>  <NavLink href={`/asset/${row.id}`}>{row.name}({row.symbol})</NavLink>
  },
   {
    field: "verified",
    title: "Asset Type",
    sorting: false,
    render: row =>  <strong>{row.verified ? 'Verified' : 'Unverified'}</strong>
  },
  {
    field: "id",
    title: "Asset ID",
    sorting: false,
    render: row => <NavLink href={`/asset/${row.id}`}>{row.id}</NavLink>
  },
  {
    field: "quantity",
    title: "Quantity",
    sorting: false,
    render: row => <span className="asset-quantity">{row.quantity}</span>
  }
];