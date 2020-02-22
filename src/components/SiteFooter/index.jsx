import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavLink from "../NavLink";

const useStyles = makeStyles(({ palette, breakpoints }) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      color: "#4a4f55",
      marginTop: "1rem",
      paddingTop: ".75rem",
      paddingBottom: "1.5rem"
    },
    hint: {
      display: "flex",
      alignItems: "center",
      marginTop: ".5rem"
    },
    love: {
      color: "red"
    },
    coffee: {
      color: "#6F4E37"
    },
    outlink: {
      color: "#1e2022",
      textDecoration: "none"
    },
    strong: {
      marginLeft: ".25rem"
    },
    flexItem: {
      [breakpoints.down("sm")]: {
        marginBottom: "1rem",
        width: "100%"
      }
    }
  })
);

export default function SiteFooter() {
  const style = useStyles();
  return (
    <Container component="section" className={style.container}>
      <div className={style.flexItem}>
        <Typography variant="h8" component="h8">
          Powered by{" "}
          <a
            href="https://www.fusion.org/"
            target={"_blank"}
            className={style.outlink}
          >
            <strong className={style.strong}>Fusion Network</strong>
          </a>{" "}
          and
          <a
            href={"https://github.com/fsn-dev"}
            target={"_blank"}
            className={style.outlink}
          >
            <strong className={style.strong}>FOSC</strong>.
          </a>
        </Typography>
        <br></br>
        <small>
          We'd like to show our repsect and thanks to FOSC tech lead
          <br></br>{" "}
          <a href="https://github.com/zhaojun-sh" className={style.outlink}>
            <strong className={style.strong}>zhaojun</strong>{" "}
          </a>{" "}
          and the project supporter <strong>XiaoKeAi</strong>.
        </small>
      </div>
      <div className={style.flexItem}>
        <Typography variant="h8" component="h8">
          <strong>Suggestions</strong>
        </Typography>
        <br></br>
        <small>
          All suggestions are welcomed. Please click{" "}
          <a
            href="https://t.me/yocnkc"
            target={"_blank"}
            className={style.outlink}
          >
            {" "}
            <strong className={style.strong}>here</strong>.
          </a>{" "}
        </small>
      </div>
      <div className={style.flexItem}>
        <Typography variant="h8" component="h8">
          <strong>About</strong>
        </Typography>
        <small className={style.hint}>
          Made with <FavoriteIcon className={style.love} /> and{" "}
          <FreeBreakfastIcon className={style.coffee} /> by{" "}
          <a
            href="https://t.me/yocnkc"
            target={"_blank"}
            className={style.outlink}
          >
            {" "}
            <strong className={style.strong}>Kate</strong>.
          </a>
          <br></br>
        </small>{" "}
        <small>
          <strong>Donation:</strong>
          <NavLink href={`/address/0x65dada4366ae16e20fdbb7675e752e1fe7abd978`}>
            0x65dada4366ae16e20fdbb7675e752e1fe7abd978
          </NavLink>
        </small>
      </div>
    </Container>
  );
}
