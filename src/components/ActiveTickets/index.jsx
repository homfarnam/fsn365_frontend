import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FusionTable from "../FusionTable";
import TimeAgo from "../TimeAgo";
import fetch from "../../libs/fetch";

export default function ActiveTickets({ miner }) {
  const [state, setState] = useState({ tickets: [] });
  const tableOptions = {
    search: false,
    pageSize: 5,
    toolbar: false,
    pageSizeOptions: [5, 10, 20]
  };
  useEffect(() => {
    let cancel = false;
    const runEffect = () => {
      fetch(`/staking/${miner}/tickets`)
        .then(res => res.json())
        .then(res => res.data)
        .catch(e => [])
        .then(tickets => {
          setState({
            tickets
          });
        });
    };
    runEffect();
    return () => {
      cancel = true;
    };
  }, [miner]);

  return (
    <FusionTable
      data={state.tickets}
      columns={columns}
      options={tableOptions}
    />
  );
}

ActiveTickets.propTypes = {
  miner: PropTypes.string
};

const columns = [
  {
    field: "startTime",
    title: "Start Time",
    render: row => <TimeAgo time={row.startTime * 1000} />
  },
  {
    field: "endTime",
    title: "Expire Time",
    sorting: false,
    render: row => <TimeAgo time={row.expireTime * 1000} />
  },
  {
    field: "value",
    title: "Value",
    sorting: false,
    render: row => <span>{row.value}</span>
  }
];
