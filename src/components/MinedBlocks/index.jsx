import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

export default class MinedBlocks extends Component {
  state = {
    loading: false
  };

  render() {
    const tableOptions = {
      headerStyle: {
        textAlign: "center"
      },
      cellStyle: {
        textAlign: "center"
      },
      toolbar: false,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50]
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
        options={tableOptions}
        style={style}
      />
    );
  }

  fetchData = () =>
    new Promise(resolve => {
      const { miner = "" } = this.props;
      const state = this.state;
      if (state.loading) {
        return;
      }
      this.setState({
        ...state,
        loading: true
      });
      const url = miner ? `?miner=${miner}` : "";
      fetch(`http://localhost:8888/api/block${url}`)
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
    field: "height",
    title: "Block",
    sorting: false,
    render: row => {
      return (
        <NavLink href={`/block/${row.height}`} className="bk-height">
          {row.height}
        </NavLink>
      );
    }
  },
  {
    field: "timestamp",
    title: "Age",
    sorting: false,
    render: row => {
      const style = {
        display: "inline-block",
        minWidth: "120px"
      };
      return (
        <span className="bk-age" style={style}>
          <TimeAgo time={row.timestamp * 1000} />
        </span>
      );
    }
  },
  {
    field: "miner",
    title: "Miner",
    sorting: false,
    render: row => {
      return (
        <NavLink href={`/address/${row.miner}`} className="bk-miner is-hash">
          {row.miner}
        </NavLink>
      );
    }
  },
  {
    dataField: "txCount",
    title: "Txn",
    sorting: false,
    render: row => {
      return (
        row.txCount && (
          <NavLink href={`/block/${row.height}?tab=tx`} className="bk-txCount">
            {row.txCount}
          </NavLink>
        )
      );
    }
  },
  {
    field: "gasUsed",
    title: "Gas Used",
    sorting: false,
    render: row => {
      return (
        <span className="bk-gasUsed">
          {row.gasUsed}({((row.gasUsed / row.gasLimit) * 100).toFixed(2)}%)
        </span>
      );
    }
  },
  {
    field: "gasLimit",
    title: "Gas Limit",
    sorting: false,
    render: row => {
      return <span className="bk-gasLimit">{row.gasLimit}</span>;
    }
  }
];
