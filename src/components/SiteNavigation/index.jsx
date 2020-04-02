import React from "react";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import SiteNavItems from "./SiteNavbar";
import Link from "next/link";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";

export default function SiteNavigation(props) {
  const { route } = props;
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <nav className={classes.topBar}>
      <Link href="/">
        <a className={classes.brand}>
          <Typography component="h4" variant="h4">
            <ThreeDRotationIcon />
            FSN365
          </Typography>
        </a>
      </Link>
      <SiteNavItems route={route} />
    </nav>
  );
}
