import React  from 'react';
import FusionTable from '../../src/components/FusionTable';
import NavLink from '../../src/components/NavLink';
import Panel from '../../src/components/Panel';
import PageHeading from '../../src/components/PageHeading';
import fetch from '../../src/libs/fetch';

export default function AddressListPage () {
  return (
    <>
      <PageHeading title="Adresses" />
      <Panel>
        <FusionTable
          data = {fetchData}
          columns={columns}
          options={{toolbar:false}}
        />
      </Panel>
    </>
  )
}
const fetchData =  ({page, pageSize}) => new Promise((resolve) => {
  const query = `?page=${page+1}&size=${pageSize}`;
  fetch(`/address${query}`)
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
