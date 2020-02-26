import React from "react";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    heading: {
      color: "#4a4f55",
      padding: ".75rem 0"
    },
    small: {
      paddingLeft: ".375rem"
    }
  })
);

export default function PageHeading(props) {
  const { title, suffix = "" } = props;
  const docTitle = title + (suffix && `${suffix}`);
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>{docTitle} | FSN365 Fusion Blockchain Explorer</title>
      </Head>
      <Typography variant="h6" component="h6" className={classes.heading}>
        {title}
        {suffix ? <small className={classes.small}>{suffix}</small> : null}
      </Typography>
    </>
  );
}
