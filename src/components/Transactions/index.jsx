import React, { PureComponent } from "react";
import fetch from "isomorphic-unfetch";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

const isHashStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "inline-block",
  maxWidth: "120px"
};

export default class Transactions extends PureComponent {
  state = {
    loading: false
  };

  render() {
    const { tableOptions = {} } = this.props;
    const options = {
      headerStyle: {
        textAlign: "center"
      },
      cellStyle: {
        textAlign: "center"
      },
      toolbar: false,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
      ...tableOptions
    };
    const style = {
      border: "none",
      boxShadow: "none",
      paddingBottom: "1.75rem"
    };

    return (
      <FusionTable
        data={this.fetchData}
        columns={columns}
        options={options}
        style={style}
      />
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

  fetchData = () =>
    new Promise(resolve => {
      const state = this.state;
      if (state.loading) {
        return;
      }
      this.setState({
        ...state,
        loading: true
      });
      const { params = {} } = this.props;
      const query = this.toQueryString(params);
      fetch(`http://localhost:8888/api/tx${query}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            loading: false
          });
          resolve({
            data: data.data,
            page: data.page - 1,
            totalCount: data.total
          });
        })
        .catch(e => {
          this.setState({
            loading: false
          });
          resolve({
            data: [],
            page: 1,
            totalCount: 0
          });
        });
    });
}

const columns = [
  {
    field: "hash",
    title: "Tx Hash",
    render: row => {
      return (
        <NavLink href={`/tx/${row.hash}`} className="tx-hash is-hash">
          <span style={isHashStyle}>{row.hash}</span>
        </NavLink>
      );
    }
  },
  {
    field: "from",
    title: "From",
    render: row => {
      return (
        <NavLink href={`/address/${row.from}`} className="tx-from is-hash">
          <span style={isHashStyle}>{row.from}</span>
        </NavLink>
      );
    }
  },
  {
    field: "to",
    title: "To",
    render: row => {
      return (
        <NavLink href={`/address/${row.to}`} className="tx-to is-hash">
          <span style={isHashStyle}>{row.to}</span>
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
        minWidth: "120px",
        display: "inline-block"
      };
      return (
        <span style={style}>
          <TimeAgo time={row.timestamp * 1000} />
        </span>
      );
    }
  },
  {
    field: "type",
    title: "Tx Type"
  },
  {
    field: "gasUsed",
    title: "Fees"
  }
];
