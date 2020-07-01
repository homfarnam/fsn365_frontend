import React from "react";
import Panel from "../src/components/Panel";
import PageHeading from "../src/components/PageHeading";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import NotFound from "../src/components/NotFound";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: "10vh 8vw",
      alignItems: "center",
      fontSize: "1.25rem",
    },
    heading: {
      color: "#3498db",
      marginBottom: "1rem",
    },
    keyword: {
      wordBreak: "break-all",
    },
    hint: {
      marginBottom: "2rem",
    },
  })
);

export default function SearchPage({ keyword }) {
  const style = useStyles();
  return (
    <>
      <PageHeading title={"Explorer Search"} />
      <Panel>
        <div className={style.container}>
          <div className={style.hint}>
            <Typography variant="h4" component="h4" className={style.heading}>
              Search Not Found
            </Typography>
            <Typography variant="p" component="p">
              Oops! The search string was:{" "}
              <strong className={style.keyword}>{keyword}</strong>.
            </Typography>
            <Typography variant="p" component="p">
              Sorry! This is an invalid search string.
            </Typography>
            <Typography variant="p" component="p">
              If you have any suggestion, please tell us.
            </Typography>
          </div>
          <NotFound />
        </div>
      </Panel>
    </>
  );
}

SearchPage.getInitialProps = async ({ query }) => {
  return query;
};
