import RealTimeTxns from "./RealTimeTxns";
import RealTimeBks from "./RealTimeBlocks";
import useStyles from "./useStyles";

export default function NetworkState(props) {
  const style = useStyles();
  return (
    <section className={`${style.flexBetween} ${style.root} `}>
      <RealTimeTxns txs={props.txs} />
      <RealTimeBks bks={props.bks} />
    </section>
  );
}
