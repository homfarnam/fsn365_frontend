import { makeStyles, createStyles } from "@material-ui/core/styles";

export default makeStyles(({ palette, breakpoints }) =>
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
      justifyContent: "space-around"
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
      paddingTop: ".5rem",
      [breakpoints.up("md")]: {
        paddingBottom: ".5rem"
      }
    },
    navBar: {
      flexGrow: 2,
      width: "100%",
      marginTop: ".5rem",
      [breakpoints.up("md")]: {
        flexGrow: 0,
        minWidth: "464px",
        width: "auto",
        marginTop: "0"
      }
    }
  })
);
