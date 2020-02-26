import Panel from "../Panel";
import Typography from "@material-ui/core/Typography";
import TextStrong from "../TextStrong";
import NavLink from "../NavLink";
import BlockItem from "./BlockItem";
import useStyles from "./useStyles";

export default function RealTimeBlocks(props) {
  const { bks = [] } = props;
  const style = useStyles();
  return (
    <Panel>
      <header className={`${style.flexBetween} ${style.header}`}>
        <Typography>
          <TextStrong>Latest Blocks</TextStrong>
        </Typography>
        <TextStrong>
          <NavLink href={`/blocks`}>View all blocks</NavLink>
        </TextStrong>
      </header>
      {bks.map(bk => {
        return <BlockItem bk={bk} key={bk.height} />;
      })}
    </Panel>
  );
}
