import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    time: {
      display: "inline-block",
      width: "168px",
      textAlign: "center"
    }
  })
);

export default function(props) {
  const style = useStyles();
  const { time } = props;

  if (time == 18446744073709552000) {
    return <span>Forever</span>;
  }
  const timeStr = new Date(time * 1000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  return <span className={style.time}>{timeStr}(UTC)</span>;
}
