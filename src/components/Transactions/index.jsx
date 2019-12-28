import React, { PureComponent } from "react";
import fetch from "isomorphic-unfetch";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

export default class Transactions extends PureComponent {
  render() {
    const { tableOptions = {} } = this.props;
    const options = {
      toolbar: false,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
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
      console.log(query);
      fetch(`http://localhost:8888/api/tx${query}`)
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
    render: row => (
      <NavLink href={`/address/${row.from}`}>
        <span style={isHashStyle}>{row.from}</span>
      </NavLink>
    )
  },
  {
    field: "to",
    title: "To",
    render: row => (
      <NavLink href={`/address/${row.to}`}>
        <span style={isHashStyle}>{row.to}</span>
      </NavLink>
    )
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
