import React from "react";
import FusionTable from "../../src/components/FusionTable";
import Panel from "../../src/components/Panel";
import PageHeading from "../../src/components/PageHeading";
import fetch from "../../src/libs/fetch";
import FusionAddressLink from "../../src/components/FusionAddressLink";
import * as helpers from "../../src/libs/helpers";

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
      orderBy && orderBy.field == "fsnBalanceIn"
        ? "fsnBalanceIn"
        : "fsnBalance";
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
      field: "fsnBalance",
      title: "Fsn Balance",
      render: row => {
        let value = helpers.formatValue(row.fsnBalance);
        return <span>{value}</span>;
      }
    },
    {
      field: "fsnBalanceIn",
      title: "∞ TL FSN",
      sortting: false,
      render: row => {
        let value = 0;
        if (row.fsnBalanceIn) {
          value = helpers.formatValue(row.fsnBalanceIn);
        }
        return <span>{value}</span>;
      }
    },
    {
      field: "fsnBalance",
      title: "FSN Ownership",
      sortting: false,
      render: row => {
        let value = row.fsnBalance;
        if (row.fsnBalanceIn) {
          value += row.fsnBalanceIn;
        }
        value = helpers.formatValue(value);
        return <span>{value}</span>;
      }
    }
  ];
};
