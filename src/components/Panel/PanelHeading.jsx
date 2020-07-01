import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextStrong from "../TextStrong";

export function PanelHeading({ title, children, className = "" }) {
  const style = useStyles();
  return (
    <header className={`${style.title} ${className}`}>
      <Typography>
        <TextStrong>{title}</TextStrong>
      </Typography>
      {children}
    </header>
  );
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    title: {
      marginBottom: "1rem",
      "& strong": {
        display: "inline-block",
        borderBottom: `1px solid ${palette.border.main}`
      }
    }
  })
);
