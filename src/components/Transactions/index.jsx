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
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

export default function Transactions(props) {
  const { tableOptions = {}, params = {} } = props;
  const options = {
    toolbar: false,
    ...tableOptions
  };
  const queryDataFunc = createQuery(params);
  const address = params.from || params.to || params.address;
  const columns = createColumns(address);
  return (
    <FusionTable data={queryDataFunc} columns={columns} options={options} />
  );
}

const createQuery = params => ({ page, pageSize }) => {
  return new Promise(resolve => {
    params.page = page + 1;
    params.size = pageSize;
    fetch(`txns`, params)
      .then(res => res.json())
      .then(res => res.data || {})
      .then(res => {
        const { data = [], total = 0 } = res;
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
      display: "block",
      maxWidth: "120px"
    },
    hint: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingRight: "1rem"
    },
    type: {
      display: "inline-block",
      padding: ".05rem .25rem",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: 600
    },
    in: {
      color: "#00c9a7",
      backgroundColor: "rgba(0,201,167,.1)"
    },

    capital: {
      color: "rgb(102, 60, 0)",
      backgroundColor: "rgb(255, 244, 229)",
      fontSize: "14px"
    },
    out: {
      color: "#b47d00",
      backgroundColor: "rgba(219,154,4,.2)"
    },
    arraw: {
      color: "#4a4f55"
    }
  })
);

const createColumns = address => {
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
      field: "bk",
      title: "Block",
      sorting: false,
      render: row => (
        <NavLink href={`/block/${row.bk}`} className={classes.withElis}>
          {row.bk}
        </NavLink>
      )
    },
    {
      field: "from",
      title: "From",
      sorting: false,
      render: row => {
        if (address == row.from) {
          return (
            <strong>
              <FusionAddressLink
                address={row.from}
                className={classes.withElis}
              />
            </strong>
          );
        }
        return (
          <FusionAddressLink address={row.from} className={classes.withElis} />
        );
      }
    },
    {
      field: "from",
      sorting: false,
      render: row => {
        if (!address) return <ArrowRightAltIcon className={classes.arraw} />;
        return row.from == address ? (
          <span className={`${classes.type} ${classes.out}`}>Out</span>
        ) : (
          <span className={`${classes.type} ${classes.in}`}>In</span>
        );
      }
    },
    {
      field: "to",
      title: "To",
      sorting: false,
      render: row => {
        if (address == row.to) {
          return (
            <strong>
              <FusionAddressLink
                address={row.to}
                className={classes.withElis}
              />
            </strong>
          );
        }
        return (
          <FusionAddressLink address={row.to} className={classes.withElis} />
        );
      }
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
          return <span>{row.info}</span>;
        }
        return <TxValue {...row.info} type={row.type} />;
      }
    }
  ];
};

const TxValue = props => {
  let { type } = props;
  const { publicRuntimeConfig } = getConfig();
  const apiServer = publicRuntimeConfig.API_PATH;
  const style = useStyles();
  let className = style.withElis;

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
        {value}{" "}
        <NavLink href={`/asset/${props.assetID}`}>{props.symbol}</NavLink>
      </span>
    );
  }

  if (type == "AssetValueChangeFunc") {
    return (
      <span className={className}>
        <TextStrong>{props.isInc ? "Issue " : "Destory "}</TextStrong>
        {value}{" "}
        <NavLink href={`/asset/${props.assetID}`}>{props.symbol}</NavLink>
      </span>
    );
  }

  if (value.indexOf("M") > -1 || value.indexOf("k") > -1) {
    className = `${style.type} ${style.capital}`;
  }
  return (
    <>
      <span className={className}>
        {value}{" "}
        <NavLink href={`/asset/${props.assetID}`}>{props.symbol}</NavLink>
      </span>
    </>
  );
};
