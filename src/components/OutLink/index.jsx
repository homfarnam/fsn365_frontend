import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    outLink: {
      color: palette.link.main,
      textDecoration: "none",
      "&:hover": {
        color: palette.link.dark
      }
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
