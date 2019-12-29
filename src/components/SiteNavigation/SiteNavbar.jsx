import React, { useState } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";

export default function SiteNavItems(props) {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = e => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Nav className={classes.nav} />
      <Button className={classes.menuButton} onClick={handleDrawerToggle}>
        Toggle
      </Button>
      <Hidden>
        <Drawer
          container={container}
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Divider />
          <Typography
            component="h4"
            variant="h4"
            className={classes.drawerTitle}
          >
            Fsnexplorer
          </Typography>
          <Divider />
          <Nav className={classes.drawerNav} />
        </Drawer>
      </Hidden>
    </>
  );
}

const Nav = ({ className }) => {
  const classes = useStyles();
  return (
    <nav className={className}>
      <Link href="/">
        <a className={classes.navItem}>Home</a>
      </Link>
      <Link href="/blocks">
        <a className={classes.navItem}>Blocks</a>
      </Link>
      <Link href="/txs">
        <a className={classes.navItem}>Transactions</a>
      </Link>
      <Link href="/staking">
        <a className={classes.navItem}>Staking</a>
      </Link>
      <Link href="/assets">
        <a className={classes.navItem}>Assets</a>
      </Link>
    </nav>
  );
};