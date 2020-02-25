import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    root: {
      flexWrap: "wrap",
      "& > div": {
        width: "100%",
        [breakpoints.up("md")]: {
          width: "49%"
        }
      }
    },
    header: {
      padding: ".75rem 0",
      marginBottom: ".75rem",
      borderBottom: "1px solid #e7eaf3"
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    isFlexBox: {
      display: "flex",
      alignItems: "center"
    },
    icon: {
      backgroundColor: "#e7eaf3",
      padding: ".5rem",
      borderRadius: "4px",
      marginRight: ".5rem",
      [breakpoints.up("sm")]: {
        padding: ".75rem"
      },
      "&.circle": {
        borderRadius: "50%"
      }
    },
    prefix: {
      fontWeight: "500",
      marginRight: ".25rem"
    },
    isHash: {
      width: "86px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "block",
      [breakpoints.up("sm")]: {
        width: "148px"
      },
      [breakpoints.up("md")]: {
        width: "136px"
      },
      [breakpoints.up("lg")]: {
        width: "160px"
      }
    },
    main: {
      flexGrow: 1
    },
    ctnID: {
      marginRight: "1rem",
      flexGrow: 1
    },
    type: {
      display: "none",
      [breakpoints.up("sm")]: {
        display: "flex"
      }
    },
    reward: {
      display: "none",
      [breakpoints.up("sm")]: {
        display: "flex"
      }
    }
  })
);

export default useStyles;
