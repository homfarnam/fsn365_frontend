import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import fetch from "../../libs/fetch";
import UTCTime from "../UTCTime";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    isHash: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "inline-block",
      maxWidth: "120px"
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
          txns for miner.
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
      field: "log",
      title: "StartTime",
      sorting: false,
      render: row => <UTCTime time={row.log.StartTime} />
    },
    {
      field: "log",
      title: "ExpireTime",
      sorting: false,
      render: row => <UTCTime time={row.log.ExpireTime} />
    }
  ];
};
