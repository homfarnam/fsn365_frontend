import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function TextStrong({ children, className = "" }) {
  const style = useStyles();
  const cssClasses = `${className} ${style.strong}`;
  return <strong className={cssClasses}>{children}</strong>;
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    strong: {
      color: "#4a4f55"
    }
  })
);
