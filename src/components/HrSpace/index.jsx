import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      marginTop: ".75rem",
      marginBottom: ".75rem",
      border: 0,
      borderTop: "1px solid #e7eaf3"
    }
  })
);

export default function HrSpace() {
  const classes = useStyles();
  return <hr class={classes.root}></hr>;
}
