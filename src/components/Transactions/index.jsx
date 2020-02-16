import React from "react";
import FusionTable from "../FusionTable";
import fetch from "../../libs/fetch";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";
import FusionAddressLink from "../FusionAddressLink";
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
  const txCount = params.txMade || 1000;
  return new Promise(resolve => {
    params.page = page + 1;
    params.size = pageSize;
    fetch(`/tx`, params)
      .then(res => res.json())
      .then(data => {
        resolve({
          data: data.data,
          page: page,
          totalCount: txCount || data.total
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
      field: "timestamp",
      title: "Time",
      sorting: false,
      render: row => (
        <span className={classes.timestamp}>
          <TimeAgo time={row.timestamp * 1000} />
        </span>
      )
    },
    {
      field: "block",
      title: "Block",
      sorting: false
    },
    {
      field: "from",
      title: "From",
      sorting: false,
      render: row => (
        <FusionAddressLink address={row.from} className={classes.isHash} />
      )
    },
    {
      field: "to",
      title: "To",
      sorting: false,
      render: row => (
        <FusionAddressLink address={row.to} className={classes.isHash} />
      )
    },
    {
      field: "type",
      title: "Tx Type",
      sorting: false,
      render: row => {
        if (row.type.indexOf("TimeLock") > -1) {
          return "TimeLock";
        } else {
          return row.type.replace("Func", "").replace("Ext", "");
        }
      }
    },
    {
      field: "hash",
      title: "Info",
      sorting: false,
      render: row => <TxValue {...row} />
    }
  ];
};

const TxValue = props => {
  let { value, assetID, coin } = props;
  return (
    <>
      {value ? <span>{(+value).toFixed(0)}</span> : null}
      {assetID ? (
        <NavLink href={`/asset/${assetID}`}>{"  " + coin}</NavLink>
      ) : (
        <span>{coin}</span>
      )}
    </>
  );
};
