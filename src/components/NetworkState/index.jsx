import { makeStyles, createStyles } from "@material-ui/core/styles";
import RealTimeTxns from "../RealTimeTxns";
import RealTimeBks from "../RealTimeBlocks";

export default function NetworkState(props) {
  const style = useStyles();
  return (
    <section className={style.root}>
      <RealTimeTxns txs={props.txs} />
      <RealTimeBks bks={props.bks} />
    </section>
  );
}
const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      "& > div": {
        width: "100%",
        [breakpoints.up("md")]: {
          width: "49%"
        }
      }
    }
  })
);
