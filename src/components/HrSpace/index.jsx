import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      marginTop: ".75rem",
      marginBottom: ".75rem",
      border: 0,
      borderTop: `1px solid ${palette.border.main}`
    }
  })
);

export default function HrSpace() {
  const classes = useStyles();
  return <hr className={classes.root}></hr>;
}
