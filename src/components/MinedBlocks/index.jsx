import React from "react";
import FusionTable from "../FusionTable";
import NavLink from "../NavLink";
import fetch from "../../libs/fetch";
import FusionAddressLink from "../FusionAddressLink";
import getConfig from "next/config";
import OutLink from "../OutLink";
import UTCTime from "../UTCTime";

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

    fetch("blocks", params)
      .then(res => res.json())
      .then(res => res.data)
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
    render: row => <NavLink href={`/block/${row.height}`}>{row.height}</NavLink>
  },
  {
    field: "timestamp",
    title: "Age",
    sorting: false,
    render: row => <UTCTime time={row.timestamp} />
  },
  {
    field: "miner",
    title: "Miner",
    sorting: false,
    render: row => <FusionAddressLink address={row.miner} miner={true} />
  },
  {
    dataField: "txns",
    title: "Txn",
    sorting: false,
    render: row => {
      const { publicRuntimeConfig } = getConfig();
      const apiServer = publicRuntimeConfig.API_PATH;
      const renderEle = row.txns ? (
        <OutLink href={`${apiServer}tx?block=${row.height}&size=${row.txns}`}>
          {row.txns}
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
    headerStyle: {
      minWidth: "160px"
    },
    render: row => (
      <span>
        {row.gasUsed}({((row.gasUsed / row.gasLimit) * 100).toFixed(2)}%)
      </span>
    )
  },
  {
    field: "reward",
    title: "Reward",
    sorting: false,
    render: row => <span>{row.reward.toFixed(2)}</span>
  }
];
