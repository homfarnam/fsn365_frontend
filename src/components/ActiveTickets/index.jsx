import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FusionTable from "../FusionTable";
import fetch from "../../libs/fetch";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import UTCTime from "../UTCTime";

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
        .then(res => res.data || [])
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
  const columns = createColumns();
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

const useStyles = makeStyles(({}) =>
  createStyles({
    value: {
      display: "inline-block",
      minWidth: "80px",
      textAlign: "center"
    }
  })
);
const createColumns = () => {
  const style = useStyles();
  return [
    {
      field: "startTime",
      title: "Start Time",
      render: row => <UTCTime time={row.startTime} />
    },
    {
      field: "expireTime",
      title: "Expire Time",
      sorting: false,
      render: row => <UTCTime time={row.expireTime} />
    },
    {
      field: "value",
      title: "Value",
      sorting: false,
      render: row => <span className={style.value}>{row.value} FSN</span>
    }
  ];
};
