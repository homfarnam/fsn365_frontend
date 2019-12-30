import React, { PureComponent } from "react";
import FusionTable from "../FusionTable";
import fetch from "../../libs/fetch";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";
import FusionAdressLink from "../FusionAdressLink";

export default class Transactions extends PureComponent {
  render() {
    const { tableOptions = {} } = this.props;
    const options = {
      toolbar: false,
      pageSize: 10,
      ...tableOptions
    };

    return (
      <FusionTable data={this.fetchData} columns={columns} options={options} />
    );
  }

  toQueryString = params => {
    return (
      "?" +
      Object.keys(params)
        .map(function(key) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&")
    );
  };

  fetchData = ({ page, pageSize }) =>
    new Promise(resolve => {
      const { params = {} } = this.props;
      params.page = page + 1;
      params.size = pageSize;
      const query = this.toQueryString(params);
      fetch(`/tx${query}`)
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
}

const isHashStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "inline-block",
  maxWidth: "120px"
};

const columns = [
  {
    field: "hash",
    title: "Tx Hash",
    sorting: false,
    render: row => (
      <NavLink href={`/tx/${row.hash}`} prefetch={false}>
        <span style={isHashStyle}>{row.hash}</span>
      </NavLink>
    )
  },
  {
    field: "from",
    title: "From",
    sorting: false,
    render: row => <FusionAdressLink address={row.from} style={isHashStyle} />
  },
  {
    field: "to",
    title: "To",
    render: row => <FusionAdressLink address={row.to} style={isHashStyle} />
  },
  {
    field: "block",
    title: "Block",
    sorting: false,
    render: row => (
      <NavLink href={`/block/${row.block}`} className="tx-block">
        {row.block}
      </NavLink>
    )
  },
  {
    field: "timestamp",
    title: "Age",
    sorting: false,
    render: row => (
      <span
        style={{
          minWidth: "120px",
          display: "inline-block"
        }}
      >
        <TimeAgo time={row.timestamp * 1000} />
      </span>
    )
  },
  {
    field: "type",
    title: "Tx Type",
    sorting: false
  },
  {
    field: "gasUsed",
    title: "Fees",
    sorting: false
  }
];
