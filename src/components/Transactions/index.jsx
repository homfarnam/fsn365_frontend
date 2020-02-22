import React from "react";
import FusionTable from "../FusionTable";
import fetch from "../../libs/fetch";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";
import FusionAddressLink from "../FusionAddressLink";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import getConfig from "next/config";

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
      .then(resData => {
        const { data = [], total = 0 } = resData;
        resolve({
          data: data,
          page: page,
          totalCount: total
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
    },
    hint: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: "1rem"
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
      sorting: false,
      render: row => (
        <NavLink href={`/block/${row.block}`} className={classes.isHash}>
          {row.block}
        </NavLink>
      )
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
      render: row => {
        if (row.type == "GenNotationFunc") {
          return <span>{row.value}</span>;
        }
        return (
          <TxValue {...row.value} type={row.type} className={classes.isHash} />
        );
      }
    }
  ];
};

const TxValue = props => {
  let { className = "", type } = props;

  const { publicRuntimeConfig } = getConfig();
  const apiServer = publicRuntimeConfig.API_PATH;

  if (props.swapID) {
    return (
      <span>
        <a href={`${apiServer}swap/${props.swapID}`} target={"_blank"}>
          <i className={className}>{props.swapID}</i>
        </a>
      </span>
    );
  }

  if (type == "GenAssetFunc") {
    return (
      <span>
        Issue {props.value}{" "}
        <NavLink href={`/asset/${props.assetID}`}>{props.coin}</NavLink>
      </span>
    );
  }

  if (type == "AssetValueChangeFunc") {
    return (
      <span>
        {props.isInc ? "Issue" : "Destory"} {props.value}{" "}
        <NavLink href={`/asset/${props.assetID}`}>{props.coin}</NavLink>
      </span>
    );
  }

  return (
    <>
      <span>
        {props.value.toFixed(1)}{" "}
        <NavLink href={`/asset/${props.assetID}`}>{props.coin}</NavLink>
      </span>
    </>
  );
};
