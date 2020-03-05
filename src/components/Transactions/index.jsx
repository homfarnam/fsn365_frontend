import React from "react";
import FusionTable from "../FusionTable";
import fetch from "../../libs/fetch";
import NavLink from "../NavLink";
import FusionAddressLink from "../FusionAddressLink";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import getConfig from "next/config";
import TextStrong from "../TextStrong";
import OutLink from "../OutLink";
import * as helpers from "../../libs/helpers";
import UTCTime from "../UTCTime";

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
    withElis: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "inline-block",
      maxWidth: "120px"
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
          <span className={classes.withElis}>{row.hash}</span>
        </NavLink>
      )
    },
    {
      field: "timestamp",
      title: "Time",
      sorting: false,
      render: row => <UTCTime time={row.timestamp} />
    },
    {
      field: "block",
      title: "Block",
      sorting: false,
      render: row => (
        <NavLink href={`/block/${row.block}`} className={classes.withElis}>
          {row.block}
        </NavLink>
      )
    },
    {
      field: "from",
      title: "From",
      sorting: false,
      render: row => (
        <FusionAddressLink address={row.from} className={classes.withElis} />
      )
    },
    {
      field: "to",
      title: "To",
      sorting: false,
      render: row => (
        <FusionAddressLink address={row.to} className={classes.withElis} />
      )
    },
    {
      field: "type",
      title: "Tx Type",
      sorting: false,
      render: row => (
        <TextStrong>
          {row.type.replace("Func", "").replace("Ext", "")}
        </TextStrong>
      )
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
          <TxValue
            {...row.value}
            type={row.type}
            className={classes.withElis}
          />
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
        <OutLink href={`${apiServer}swap/${props.swapID}`}>
          <i className={className}>{props.swapID}</i>
        </OutLink>
      </span>
    );
  }

  let value = helpers.formatValue(props.value);

  if (type == "GenAssetFunc") {
    return (
      <span className={className}>
        <TextStrong>Issue </TextStrong>
        {value} <NavLink href={`/asset/${props.assetID}`}>{props.coin}</NavLink>
      </span>
    );
  }

  if (type == "AssetValueChangeFunc") {
    return (
      <span className={className}>
        <TextStrong>{props.isInc ? "Issue " : "Destory "}</TextStrong>
        {value} <NavLink href={`/asset/${props.assetID}`}>{props.coin}</NavLink>
      </span>
    );
  }

  return (
    <>
      <span className={className}>
        {value} <NavLink href={`/asset/${props.assetID}`}>{props.coin}</NavLink>
      </span>
    </>
  );
};
