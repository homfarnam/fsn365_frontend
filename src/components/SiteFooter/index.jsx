import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavLink from "../NavLink";
import OutLink from "../OutLink";

const useStyles = makeStyles(({ breakpoints }) =>
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
      alignItems: "center"
    },
    love: {
      color: "red"
    },
    coffee: {
      color: "#6F4E37"
    },
    outlink: {
      color: "#4a4f55"
    },
    strong: {
      margin: "0 .15rem"
    },
    flexItem: {
      marginBottom: "2rem",
      width: "100%",
      [breakpoints.up("sm")]: {
        marginBottom: "1rem",
        width: "50%"
      },
      [breakpoints.up("lg")]: {
        width: "33.33%"
      }
    }
  })
);

export default function SiteFooter() {
  const style = useStyles();
  return (
    <Container component="section" className={style.container}>
      <div className={style.flexItem}>
        <Typography>
          Powered by{" "}
          <OutLink href="https://www.fusion.org/" className={style.outlink}>
            <strong className={style.strong}>Fusion Network</strong>
          </OutLink>
          and
          <OutLink href="https://fsn.dev/" className={style.outlink}>
            <strong className={style.strong}>FOSC</strong>
          </OutLink>
          .
        </Typography>
        <small>
          I'd like to say thanks to FOSC Tech Lead
          <OutLink
            href="https://github.com/zhaojun-sh"
            className={style.outlink}
          >
            <strong className={style.strong}>zhaojun</strong>
          </OutLink>
          and other contributors.
        </small>
      </div>
      <div className={style.flexItem}>
        <Typography>
          <strong>Suggestion and Contribution</strong>
        </Typography>
        <small>
          Suggestions and contributions are welcomed. Please click{" "}
          <OutLink href="https://t.me/fusionfrontier" className={style.outlink}>
            <strong className={style.strong}>here</strong>.
          </OutLink>
        </small>
        <br></br>
        <small>
          Wanna view project progress? Please click{" "}
          <OutLink
            href="https://trello.com/b/juRQ9fgM/fusion-block-browser"
            className={style.outlink}
          >
            <strong>here</strong>.
          </OutLink>
        </small>
      </div>
      <div className={style.flexItem}>
        <Typography>
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
        </small>{" "}
        <small>
          <strong>Donation:</strong>
          <NavLink href={`/address/10139396`}>10139396</NavLink>
        </small>
      </div>
    </Container>
  );
}
