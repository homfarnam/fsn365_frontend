import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles(({ palette, breakpoints }) =>
  createStyles({
    root: {
      backgroundColor: `#fff`,
      padding: ".625rem 1rem",
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
      width: "240px",
      backgroundColor: `${palette.link.dark}`
    },
    nav: {
      display: "none",
      justifyContent: "flex-end",
      [breakpoints.up("sm")]: {
        display: "flex"
      }
    },
    drawerNav: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: "1rem .375rem",
      backgroundColor: "#f8f9fa!important",
      fontSize: "1.25rem",
      boxShadow: "0 1px 10px rgba(151,164,175,.1)",
      [breakpoints.up("sm")]: {
        display: "none"
      }
    },
    drawerTitle: {
      padding: ".625rem 1rem",
      color: "#fff",
      boxShadow: "0 1px 10px rgba(151,164,175,.1)"
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
      [breakpoints.up("sm")]: {
        display: "none!important"
      }
    }
  })
);
