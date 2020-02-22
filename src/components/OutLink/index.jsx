import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    outLink: {
      textDecoration: "none"
    }
  })
);

export default function OutLink({ href, text, children, className = "" }) {
  const style = useStyles();

  return (
    <a
      href={href}
      target={"_blank"}
      className={`${style.outLink} ${className}`}
    >
      {text || children || href}
    </a>
  );
}
