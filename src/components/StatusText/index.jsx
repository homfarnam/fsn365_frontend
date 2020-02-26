import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export default function Status(props) {
  const { isOk = true, children, className = "" } = props;
  const style = useStyles();
  const cssClasses = `${className} ${isOk ? style.ok : style.notOk}`;
  return <span className={cssClasses}>{children}</span>;
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    ok: {
      color: `${palette.success.main}`
    },
    notOk: {
      color: `#d9534f`
    }
  })
);
