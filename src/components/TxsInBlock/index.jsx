import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";

const style = {
  border: "none",
  boxShadow: "none",
  paddingBottom: "1.75rem"
};

export default function BlockTxs(props) {
  const { block } = props;
  const [state, setState] = useState({
    txs: [],
    msg: ""
  });
  useEffect(() => {
    fetch(`http://localhost:8888/api/tx?block=${block}`)
      .then(res => res.json())
      .then(res => res.data)
      .then(data => {
        setState({
          txs: data,
          msg: ""
        });
      })
      .catch(() => {
        setState({
          ...state,
          msg: "Something went wrong, please refresh page!"
        });
      });
  }, [block]);

  const tableOptions = {
    search: false,
    paging: false,
    headerStyle: {
      textAlign: "center"
    },
    cellStyle: {
      textAlign: "center"
    },
    toolbar: false
  };
  return (
    <FusionTable
      columns={columns}
      options={tableOptions}
      data={state.txs}
      style={style}
    />
  );
}

BlockTxs.propTypes = {
  miner: PropTypes.string
};

const columns = [
  {
    field: "hash",
    title: "Tx Hash",
    render: row => {
      const style = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: "120px"
      };
      return (
        <NavLink href={`/tx/${row.hash}`} className="tx-hash is-hash">
          <span style={style}>{row.hash}</span>
        </NavLink>
      );
    }
  },
  {
    field: "from",
    title: "From",
    render: row => {
      const style = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: "120px"
      };
      return (
        <NavLink href={`/address/${row.from}`} className="tx-from is-hash">
          <span style={style}>{row.from}</span>
        </NavLink>
      );
    }
  },
  {
    field: "to",
    title: "To",
    render: row => {
      const style = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: "120px"
      };
      return (
        <NavLink href={`/address/${row.to}`} className="tx-to is-hash">
          <span style={style}>{row.to}</span>
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
    title: "Type"
  },
  {
    field: "gasUsed",
    title: "Fees"
  }
];
