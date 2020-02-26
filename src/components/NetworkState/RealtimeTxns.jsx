import Panel from "../Panel";
import Typography from "@material-ui/core/Typography";
import TextStrong from "../TextStrong";
import NavLink from "../NavLink";
import useStyles from "./useStyles";
import TxItem from "./TxnItem";

export default function RealTimeTxns(props) {
  const { txs = [] } = props;
  const style = useStyles();
  return (
    <Panel>
      <header className={`${style.flexBetween} ${style.header}`}>
        <Typography>
          <TextStrong>Latest Txns</TextStrong>
        </Typography>
        <TextStrong>
          <NavLink href={`/txs`}>View all blocks</NavLink>
        </TextStrong>
      </header>
      {txs.map((tx, index) => {
        return <TxItem tx={tx} key={index} />;
      })}
    </Panel>
  );
}
