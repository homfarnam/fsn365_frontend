import React from "react";
import Panel from "../src/components/Panel";
import FusionTable from "../src/components/FusionTable";
import NavLink from "../src/components/NavLink";
import PageHeading from "../src/components/PageHeading";
import fetch from "../src/libs/fetch";

export default function AssetListPage(props) {
  const { query = {} } = props;
  const fetchAssets = createQuery(query);
  return (
    <>
      <PageHeading
        title="Assets"
        canonical={'assets'}
      />
      <Panel
        style={{padding: '0'}}
      >
        <FusionTable
          columns={columns}
          data={fetchAssets}
        />
      </Panel>
    </>
  );
}

AssetListPage.getInitialProps = async ({ query }) => {
  return {
    query
  };
};

const createQuery = query => ({ page, pageSize }) =>
  new Promise(resolve => {
    const params = {
      ...query,
      page: page + 1,
      size: pageSize
    };
    fetch(`assets`, params)
      .then(res => res.json())
      .then(res => res.data)
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
          page: 1,
          totalCount: 0
        });
      });
  });

const columns = [
  {
    field: "name",
    title: "Asset",
    sorting: false,
    render: row => (
      <NavLink href={`/asset/${row.id}`}>
        {row.name}({row.symbol})
      </NavLink>
    )
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
  render: row => <span className="asset-quantity">{row.quantity}{' '}{row.symbol}</span>
  }
];
