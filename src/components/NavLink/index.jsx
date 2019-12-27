import React from "react";
import Link from "next/link";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    root: {
      color: palette.link.main,
      textDecoration: "none",
      "&:hover": {
        color: palette.link.dark
      }
    }
  })
);

export default function NavLink(props) {
  const { href, children = " " } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Link href={href}>
      <a className={classes.root}>{children ? children : href}</a>
    </Link>
  );
}
