import React from "react";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
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
  const classes = useStyles();
  return (
    <>
      <SeoHead {...props} />
      <header>
        <Typography variant="h6" component="h2" className={classes.heading}>
          {title}
          {suffix ? <small className={classes.small}>{suffix}</small> : null}
        </Typography>
      </header>
    </>
  );
}

const SeoHead = props => {
  const { title, canonical = "" } = props;
  const titleText = title
    ? `${title} | FSN365 Fusion Blockchain Explorer`
    : "FSN365 | Fusion Blockchain Explorer";
  const canonicalText = canonical
    ? `https://fsn365.com/${canonical}`
    : "https://fsn365.com";

  return (
    <Head>
      <title>{titleText}</title>
      <meta
        name="description"
        content={"fsn365, The best fusion protocal/blockchain exploer/browser!"}
      />
      <meta
        name={"keywords"}
        content={
          "fsn365 fusion fusionnetwork blockchain fusionmining mining transactions address"
        }
      />
      <meta
        name="application-name"
        description={"fsn365, the fusionnetwork browser&&explorer."}
      ></meta>
      <link rel="canonical" href={canonicalText} />
    </Head>
  );
};
