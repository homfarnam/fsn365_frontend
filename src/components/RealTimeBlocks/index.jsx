import Panel from "../Panel";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextStrong from "../TextStrong";
import NavLink from "../NavLink";
import BlockItem from "./BlockItem";

export default function RealTimeBlocks(props) {
  const { bks = [] } = props;
  const style = useStyles();
  return (
    <Panel>
      <header className={style.title}>
        <Typography>
          <TextStrong>Latest Blocks</TextStrong>
        </Typography>
        <TextStrong>
          <NavLink href={`/blocks`}>View All</NavLink>
        </TextStrong>
      </header>
      {bks.map((bk, index) => {
        return <BlockItem bk={bk} key={index} />;
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
