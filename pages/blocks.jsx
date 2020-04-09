import React from "react";
import Panel from "../src/components/Panel";
import PageHeading from "../src/components/PageHeading";
import MinedBlocks from "../src/components/MinedBlocks";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FusionAddressLink from "../src/components/FusionAddressLink";
import TextStrong from "../src/components/TextStrong";

const useStyles = makeStyles(() =>
  createStyles({
    address: {
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      paddingLeft: ".75rem",
    },
    span: {
      margin: "0 4px",
      display: "inline-block",
    },
    panel: {
      padding: "0",
    },
  })
);

export default function BlockListPage({ miner }) {
  const style = useStyles();
  return (
    <>
      <PageHeading title={"Blocks"} />
      <Panel className={style.panel}>
        {miner ? (
          <p p className={style.address}>
            <TextStrong>Notice:</TextStrong>We only provide latest 1k blocks
            mined by miner.
          </p>
        ) : null}
        {miner ? (
          <p className={style.address}>
            <span className={style.span}>Blocks mined by</span>{" "}
            <FusionAddressLink address={miner} />
          </p>
        ) : null}
        <MinedBlocks miner={miner} />
      </Panel>
    </>
  );
}

BlockListPage.getInitialProps = async ({ query }) => query;
