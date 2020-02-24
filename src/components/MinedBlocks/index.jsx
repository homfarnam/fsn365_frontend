import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import TimeAgo from "../TimeAgo";
import fetch from "../../libs/fetch";
import FusionAddressLink from "../FusionAddressLink";
import getConfig from "next/config";
import OutLink from "../OutLink";

export default function MinedBlocks(props) {
  const { tableOptions = {}, miner } = props;
  const options = {
    toolbar: false,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    ...tableOptions
  };
  const fetchData = createQuery(miner);
  return <FusionTable data={fetchData} columns={columns} options={options} />;
}

const createQuery = miner => ({ page, pageSize }) =>
  new Promise(resolve => {
    const params = {
      page: page + 1,
      size: pageSize,
      miner
    };

    fetch("/block", params)
      .then(res => res.json())
      .then(res => res)
      .then(data => {
        resolve({
          data: data.data,
          page: page,
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

const columns = [
  {
    field: "height",
    title: "Block",
    sorting: false,
    render: row => (
      <NavLink href={`/block/${row.height}`} className="bk-height">
        {row.height}
      </NavLink>
    )
  },
  {
    field: "timestamp",
    title: "Age",
    sorting: false,
    render: row => {
      const style = {
        display: "inline-block",
        minWidth: "120px"
      };
      return (
        <span className="bk-age" style={style}>
          <TimeAgo time={row.timestamp * 1000} />
        </span>
      );
    }
  },
  {
    field: "miner",
    title: "Miner",
    sorting: false,
    render: row => <FusionAddressLink address={row.miner} miner={true} />
  },
  {
    dataField: "txCount",
    title: "Txn",
    sorting: false,
    render: row => {
      const { publicRuntimeConfig } = getConfig();
      const apiServer = publicRuntimeConfig.API_PATH;
      const renderEle = row.txCount ? (
        <OutLink
          href={`${apiServer}tx?block=${row.height}&size=${row.txCount}`}
        >
          {row.txCount}
        </OutLink>
      ) : (
        <>0</>
      );
      return renderEle;
    }
  },
  {
    field: "gasUsed",
    title: "Gas Used/GasLimit",
    sorting: false,
    render: row => (
      <span className="bk-gasUsed">
        {row.gasUsed}({((row.gasUsed / row.gasLimit) * 100).toFixed(2)}%)
      </span>
    )
  },
  {
    field: "reward",
    title: "Block reward",
    sorting: false,
    render: row => <span className="bk-gasLimit">{row.reward.toFixed(2)}</span>
  }
];
