import React, { Component } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-unfetch";
import FusionTable from "../FusionTable";
import TimeAgo from "../TimeAgo";

const style = {
  border: "none",
  boxShadow: "none",
  paddingBottom: "1.75rem",
  minHeight: "200px"
};

export default class ActiveTickets extends Component {
  state = {
    tickets: []
  };

  componentDidMount() {
    this.fetchMinersTickets();
  }

  render() {
    const { tickets = [] } = this.state;
    const tableOptions = {
      search: false,
      pageSize: 10,
      toolbar: false,
      headerStyle: {
        textAlign: "center"
      },
      cellStyle: {
        textAlign: "center"
      }
    };
    return (
      <FusionTable
        data={tickets}
        columns={columns}
        options={tableOptions}
        style={style}
      />
    );
  }

  fetchMinersTickets = () => {
    const miner = this.props.miner;
    fetch(`http://localhost:8888/api/address/${miner}/tickets`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          tickets: data.data
        });
      })
      .catch(e => {});
  };
}

ActiveTickets.propTypes = {
  miner: PropTypes.string
};

const columns = [
  {
    field: "startTime",
    title: "Start Time",
    render: rowData => {
      return (
        <span className="tk-start">
          <TimeAgo time={rowData.startTime * 1000} />
        </span>
      );
    }
  },
  {
    field: "expireTime",
    title: "Expire Time",
    sorting: false,
    render: rowData => {
      return (
        <span className="tk-end">
          <TimeAgo time={rowData.expireTime * 1000} />
        </span>
      );
    }
  },
  {
    field: "value",
    title: "Value",
    sorting: false,
    render: rowData => {
      return <span className="tk-value">{rowData.value}</span>;
    }
  }
];
