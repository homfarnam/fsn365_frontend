import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    border: "1px solid #e7eaf3",
    padding: "0.75rem",
    boxShadow: "0 0.5rem 1.2rem rgba(189,197,209,.2)"
  },
  title: {
    marginBottom: "1rem",
    "& span": {
      display: "inline-block",
      borderBottom: "1px solid #e7eaf3",
      fontWeight: "bold"
    }
  }
});

export default function Panel(props) {
  const { title, children } = props;
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      {/* panel title */}
      {title ? (
        <Typography component="h6" className={classes.title}>
          <span>{title}</span>
        </Typography>
      ) : null}
      {children}
    </Paper>
  );
}
