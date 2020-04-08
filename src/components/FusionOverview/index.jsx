import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import HrSpace from "../HrSpace";
import Panel from "../Panel";
import TextStrong from "../TextStrong";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    ul: {
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: "0",
      "& > li": {
        width: "46.5%",
        [breakpoints.up("sm")]: {
          width: "23.5%"
        }
      }
    },
    panel: {
      marginTop: "0"
    },
    cat: {
      fontSize: "1.05rem"
    }
  })
);

export default function FusionOverview(props) {
  const overview = props.overview;
  const style = useStyles();
  return (
    <Panel style={{ margin: "2rem auto", paddingBottom: "0" }}>
      <ul className={style.ul}>
        <li>
          <span>
            <TextStrong className={style.cat}>Price($)</TextStrong>
            <br></br>
            {overview.priceData.price ? (
              <>${overview.priceData.price.toFixed(4)}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>MarketCap</TextStrong>
            <br></br>
            {overview.priceData.mcap ? (
              <>${overview.priceData.mcap}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong className={style.cat}>Total Txns</TextStrong>
            <br></br>
            {overview.txns ? (
              <>{overview.txns}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>Block Height</TextStrong>
            <br></br>
            {overview.height ? (
              <>{overview.height}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong className={style.cat}>Swaps</TextStrong>
            <br></br>
            {overview.swaps ? (
              <>{overview.swaps}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>Tokens</TextStrong>
            <br></br>
            {overview.assets ? (
              <>{overview.assets - 1}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
        <li>
          <span>
            <TextStrong className={style.cat}>Online Miners</TextStrong>
            <br></br>
            {overview.miners ? (
              <>{overview.miners}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
          <span>
            <TextStrong className={style.cat}>Tickets</TextStrong>
            <br></br>
            {overview.activeTickets ? (
              <>{overview.activeTickets}</>
            ) : (
              <CircularProgress size={10} />
            )}
          </span>
          <HrSpace />
        </li>
      </ul>
    </Panel>
  );
}
