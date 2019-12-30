import React from "react";
import FusionTable from "../FusionTable";
import fetch from "../../libs/fetch";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";
import FusionAdressLink from "../FusionAdressLink";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function Transactions(props) {
  const { tableOptions = {}, params = {} } = props;
  const options = {
    toolbar: false,
    pageSize: 10,
    ...tableOptions
  };
  const queryDataFunc = createQuery(params);
  const columns = createColumns();
  return (
    <FusionTable data={queryDataFunc} columns={columns} options={options} />
  );
}

const createQuery = params => ({ page, pageSize }) => {
  return new Promise(resolve => {
    params.page = page + 1;
    params.size = pageSize;
    fetch(`/tx`, params)
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
};

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
    }
  })
);

const createColumns = () => {
  const classes = useStyles();
  return [
    {
      field: "hash",
      title: "Tx Hash",
      sorting: false,
      render: row => (
        <NavLink href={`/tx/${row.hash}`} prefetch={false}>
          <span className={classes.isHash}>{row.hash}</span>
        </NavLink>
      )
    },
    {
      field: "from",
      title: "From",
      sorting: false,
      render: row => (
        <FusionAdressLink address={row.from} className={classes.isHash} />
      )
    },
    {
      field: "to",
      title: "To",
      sorting: false,
      render: row => (
        <FusionAdressLink address={row.to} className={classes.isHash} />
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
      title: "Age",
      sorting: false,
      render: row => (
        <span className={classes.timestamp}>
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
};
