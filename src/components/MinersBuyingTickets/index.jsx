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
    fetch(`/staking/${miner}/txns`, params)
      .then(res => res.json())
      .then(res => res.data)
      .then(data => {
        if (data) {
          return {
            data: data,
            page: page,
            totalCount: 1000
          };
        }
        throw new Error();
      })
      .catch(e => ({
        data: [],
        page: 0,
        totalCount: 0
      }))
      .then(data => resolve(data));
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
      field: "bk",
      title: "Block",
      sorting: false,
      render: row => <NavLink href={`/block/${row.bk}`}>{row.bk}</NavLink>
    },
    {
      field: "log",
      title: "StartTime",
      sorting: false,
      render: row => <UTCTime time={row.startTime} />
    },
    {
      field: "log",
      title: "ExpireTime",
      sorting: false,
      render: row => <UTCTime time={row.expireTime} />
    }
  ];
};
