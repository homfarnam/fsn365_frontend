import React, { useState } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Hidden } from "@material-ui/core";
import SearchForm from "../SearchForm";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";
import { makeStyles, createStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(({ palette, breakpoints }) =>
  createStyles({
    root: {
      backgroundColor: `#fff`,
      padding: ".625rem 1.75rem",
      boxShadow: "0 1px 10px rgba(151,164,175,.1)"
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [breakpoints.down("sm")]: {
        padding: "0"
      }
    },
    brand: {
      textDecoration: "none",
      color: `${palette.link.main}`
    },
    drawerPaper: {
      width: "45vw",
      minWidth: "240px",
      backgroundImage: "linear-gradient(210deg,#2d1582, #19a0ff)"
    },
    nav: {
      display: "none",
      justifyContent: "flex-start",
      marginLeft: "-.625rem",
      [breakpoints.up("md")]: {
        display: "flex"
      }
    },
    drawerNav: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: "1rem .375rem 1.75rem .375rem",
      backgroundColor: "#f8f9fa!important",
      fontSize: "1.25rem",
      boxShadow: "0 1px 10px rgba(151,164,175,.1)",
      [breakpoints.up("md")]: {
        display: "none"
      }
    },
    drawerTitle: {
      padding: ".625rem 1rem",
      color: "#fff",
      boxShadow: "0 1px 10px rgba(151,164,175,.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    navItem: {
      color: "#6c757e",
      padding: ".25rem .625rem",
      textDecoration: "none",
      "&:hover": {
        color: `${palette.link.light}`
      },
      [breakpoints.down("sm")]: {
        borderBottom: "1px solid #eee",
        width: "130px",
        display: "inline-block",
        paddingLeft: 0,
        marginLeft: "1rem"
      }
    },
    menuButton: {
      display: "flex",
      [breakpoints.up("md")]: {
        display: "none!important"
      }
    },
    topBar: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: ".5rem"
    },
    navBar: {
      flexGrow: 2,
      width: "100%",
      marginTop: ".5rem",
      marginBottom: ".5rem",
      [breakpoints.up("md")]: {
        flexGrow: 0,
        minWidth: "464px",
        width: "auto",
        marginTop: "0",
        marginBottom: "0"
      }
    }
  })
);



export default function SiteNavItems(props) {
  const { container, route = "/" } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = e => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Button className={classes.menuButton} onClick={handleDrawerToggle}>
        <MenuIcon color={"primary"}></MenuIcon>
      </Button>
      <div className={classes.navBar}>
        {route !== "/" ? <SearchForm place={"others"} /> : null}
        <Nav className={classes.nav} />
      </div>
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
            component="h2"
            variant="h4"
            className={classes.drawerTitle}
          >
            <ThreeDRotationIcon />
            FSN365
            <Button onClick={handleDrawerToggle}>
              <CloseIcon color={"primary"}></CloseIcon>
            </Button>
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
      <Link href="/address">
        <a className={classes.navItem}>Address</a>
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
