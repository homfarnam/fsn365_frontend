import React from "react";
import FusionTable from "../../src/components/FusionTable";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import FusionAddressLink from "../../src/components/FusionAddressLink";

export default function AddressListPage() {
  const columns = createColumns();
  return (
    <>
      <PageHeading title="Fusion Address" />
      <Panel>
        <p>
          <strong>Notice:</strong>We only list address that holds more than one
          FSN in wallet at this page.
        </p>
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
    const orderBy = query.orderBy;
    const sort =
      orderBy && orderBy.field == "latestActiveTime" ? "time" : "fsnBalance";
    const { page = 1, pageSize = 10, orderDirection = "desc" } = query;
    const params = {
      page: page + 1,
      size: pageSize,
      order: orderDirection || "desc",
      sort
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

const createColumns = () => {
  return [
    {
      field: "address",
      title: "Address",
      sorting: false,
      render: row => <FusionAddressLink address={row.address} />
    },
    {
      filed: "fsnBalance",
      title: "Fsn Balance",
      render: row => {
        let value = row.fsnBalance;
        if (value > 1000000) {
          value = (value / Math.pow(10, 6)).toFixed(2) + " M";
        } else if (value > 1000) {
          value = (value / Math.pow(10, 3)).toFixed(2) + " K";
        } else {
          value = row.fsnBalance.toFixed(2);
        }
        return <span>{value}</span>;
      }
    },
    // {
    //   field: "address",
    //   title: "Txs",
    //   sorting: false,
    //   render: row => {
    //     let value = row.txReceived + row.txMade;
    //     if (value > 1000000) {
    //       value = (value / Math.pow(10, 6)).toFixed(2) + " M";
    //     } else if (value > 1000) {
    //       value = (value / Math.pow(10, 3)).toFixed(2) + " K";
    //     } else {
    //     }
    //     return <span>{value}</span>;
    //   }
    // },
    {
      field: "latestActiveTime",
      title: "Last Active At",
      sorting: true,
      render: row => {
        return (
          <span>
            {new Date(row.latestActiveTime * 1000).toLocaleDateString()}
          </span>
        );
      }
    }
  ];
};
