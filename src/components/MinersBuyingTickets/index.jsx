import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";
import fetch from "../../libs/fetch";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    isHash: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "inline-block",
      maxWidth: "120px"
    },
    timestamp: {
      minWidth: "120px",
      display: "inline-block"
    },
    hint: {
      textAlign: "right",
      marginTop: "0"
    }
  })
);

export default function MinersBuyingTickets(props) {
  const { tableOptions = {}, miner } = props;
  const options = {
    toolbar: false,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    ...tableOptions
  };
  const fetchData = createQuery(miner);
  const columns = createColumns();
  const cssClasses = useStyles();
  return (
    <div>
      <FusionTable data={fetchData} columns={columns} options={options} />
      <p className={cssClasses.hint}>
        <small>
          <strong>Notice: </strong> we only provide latest 1000 BuyTicketFunc
          transactions for miners.
        </small>
      </p>
    </div>
  );
}

const createQuery = miner => ({ page, pageSize }) =>
  new Promise(resolve => {
    const params = {
      page: page + 1,
      size: pageSize,
      miner
    };
    fetch(`/staking/${miner}/ticket_txs`, params)
      .then(res => res.json())
      .then(res => res.data)
      .then(data => {
        resolve({
          data: data,
          page: page,
          totalCount: 1000
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

const createColumns = () => {
  const classes = useStyles();
  return [
    {
      field: "hash",
      title: "Tx Hash",
      sorting: false,
      render: row => (
        <NavLink href={`/tx/${row.hash}`}>
          <span className={classes.isHash}>{row.hash}</span>
        </NavLink>
      )
    },
    {
      field: "block",
      title: "Block",
      sorting: false,
      render: row => <NavLink href={`/block/${row.block}`}>{row.block}</NavLink>
    },
    {
      field: "timestamp",
      title: "Time",
      sorting: false,
      render: row => <TimeAgo time={row.timestamp * 1000} />
    },
    {
      field: "log",
      title: "StartTime",
      sorting: false,
      render: row => <TimeAgo time={row.log && row.log.StartTime * 1000} />
    },
    {
      field: "log",
      title: "ExpireTime",
      sorting: false,
      render: row => <TimeAgo time={row.log && row.log.ExpireTime * 1000} />
    }
  ];
};
