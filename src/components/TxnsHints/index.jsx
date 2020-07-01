import React from "react";
import TextStrong from "../TextStrong";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FusionAddressLink from "../FusionAddressLink";

const useStyles = makeStyles(() =>
  createStyles({
    hint: {
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      paddingLeft: ".75rem"
    },
    span: {
      margin: "0 4px",
      display: "inline-block"
    },
    strong: {
      margin: " 0 .25rem"
    }
  })
);

export default function(props) {
  const { from, to, address, type = "" } = props;
  if (!from && !to && !address) return null;

  if (from) {
    return (
      <>
        <DefaultText /> <FromText address={from} type={type} />
      </>
    );
  }

  if (to) {
    return (
      <>
        <DefaultText /> <ToText address={to} type={type} />
      </>
    );
  }

  if (address) {
    return (
      <>
        <DefaultText />
        <AddressText address={address} type={type} />
      </>
    );
  }
}

const DefaultText = () => {
  const classes = useStyles();
  return (
    <p className={classes.hint}>
      <TextStrong className={classes.strong}>Notice: </TextStrong>We only
      provide
      <prev className={classes.prev}></prev>
      <TextStrong className={classes.strong}>
        10k non-ticket txns{" "}
      </TextStrong>{" "}
      <prev className={classes.prev}></prev> at most for an address.
    </p>
  );
};

const FromText = ({ address, type }) => {
  const classes = useStyles();
  return (
    <p className={classes.hint}>
      <TextStrong className={classes.strong}>
        Outgoing {type ? type : ""}{" "}
      </TextStrong>
      <span className={classes.span}>txns for</span>{" "}
      <FusionAddressLink address={address} />
    </p>
  );
};

const ToText = ({ address, type }) => {
  const classes = useStyles();
  return (
    <p className={classes.hint}>
      <TextStrong className={classes.strong}>
        Incoming {type ? type : ""}{" "}
      </TextStrong>
      <span className={classes.span}>txns for</span>{" "}
      <FusionAddressLink address={address} />
    </p>
  );
};

const AddressText = ({ address, type }) => {
  const classes = useStyles();
  return (
    <p className={classes.hint}>
      <TextStrong className={classes.strong}>
        All {type ? type : "none-tikect"}{" "}
      </TextStrong>
      <span className={classes.span}>txns for</span>{" "}
      <FusionAddressLink address={address} />
    </p>
  );
};
