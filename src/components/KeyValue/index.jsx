import HrSpace from "../HrSpace";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      wordBreak: "break-all"
    },
    label: {
      display: "inline-block",
      marginRight: "10px",
      verticalAlign: "center",
      textTransform: "Capitalize"
    },
    value: {
      display: "inline-block",
      verticalAlign: "center"
    }
  })
);

export default function KeyValue(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { label, value, children, className = "" } = props;
  return (
    <div className={`${classes.root} ${className}`}>
      <p>
        <span className={classes.label}>{label}:</span>
        <span className={classes.value}>{value || children}</span>
      </p>
      <HrSpace />
    </div>
  );
}
