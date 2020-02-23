import Panel from "../Panel";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextStrong from "../TextStrong";
import NavLink from "../NavLink";
import TxItem from "./TxItem";

export default function RealTimeTxns(props) {
  const { txs = [] } = props;
  const style = useStyles();
  return (
    <Panel>
      <header className={style.title}>
        <Typography>
          <TextStrong>Latest Txns</TextStrong>
        </Typography>
        <TextStrong>
          <NavLink href={`/txs`}>View All</NavLink>
        </TextStrong>
      </header>
      {txs.map((tx, index) => {
        return <TxItem tx={tx} key={index} />;
      })}
    </Panel>
  );
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {},
    title: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: ".75rem",
      padding: ".75rem 0",
      borderBottom: `1px solid ${palette.border.main}`
    }
  })
);
