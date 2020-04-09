import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { PanelHeading } from "./PanelHeading";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      border: `1px solid ${palette.border.main}`,
      padding: "0.75rem",
      boxShadow: "0 0.5rem 1.2rem rgba(189,197,209,.2)",
      marginBottom: "1.75rem"
    }
  })
);

export default function Panel(props) {
  const { title, children, className = "" } = props;
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root + ` ${className}`}>
      {title ? (
        <PanelHeading component="h6" title={title}></PanelHeading>
      ) : null}
      {children}
    </Paper>
  );
}
