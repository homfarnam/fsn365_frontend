import React from "react";
import FusionTable from "../../src/components/FusionTable";
import NavLink from "../../src/components/NavLink";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import TimeAgo from '../../src/components/TimeAgo';

export default function AddressListPage() {
  return (
    <>
      <PageHeading title="Fusion Address" />
      <Panel>
        <p><strong>Notice:</strong>We only list address that holds more than one FSN in wallet at this page.</p>
        <FusionTable
          data={fetchData}
          columns={columns}
          options={{ toolbar: false }}
        />
      </Panel>
    </>
  );
}
const fetchData = query =>
  new Promise(resolve => {
    const {
      page = 1,
      pageSize = 10,
      orderDirection = "desc"
    } = query;
    const params = {
      page: page + 1,
      size: pageSize,
      order: orderDirection || "desc",
      sort: "fsnBalance"
    };
    fetch(`/address`, params)
      .then(res => res.json())
      .then(data => {
        resolve({
          data: data.data,
          page: page,
          totalCount: data.total
        });
      })
      .catch(e => {
        resolve({
          data: [],
          page: 0,
          totalCount: 0
        });
      });
  });

const columns = [
  {
    field: "address",
    title: "Address",
    sorting: false,
    render: row => (
      <NavLink href={`/address/${row.address}`}>{row.address}</NavLink>
    )
  },
  {
    field: "san",
    title: "SAN",
    sorting: false
  },
  {
    filed: "fsnBalance",
    title: "FSN Balance",
    render: row => <span>{row.fsnBalance}</span>
  },
  {
    field: "transactions",
    title: "Transactions",
    sorting: false,
    render: row => <span>{row.txCount}</span>
  },
  {
    field: 'latestActiveTime',
    title: 'Latest Active Time',
    sorting: false,
    render: row => <TimeAgo time={row.latestActiveTime * 1000}  />
  }
];
