import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import SiteNavItems from "./SiteNavbar";
import Link from "next/link";

export default function SiteNavigation(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { route } = props;
  return <HomeNavbar />;
}

function HomeNavbar() {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <Link href="/">
        <a className={classes.brand}>
          <Typography component="h4" variant="h4">
            Fsnexplorer
          </Typography>
        </a>
      </Link>
      <SiteNavItems />
    </>
  );
}
