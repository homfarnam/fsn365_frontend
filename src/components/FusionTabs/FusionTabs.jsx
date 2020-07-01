import React from "react";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

export default withStyles(({ palette }) => ({
  root: {
    borderBottom: "1px solid #e7eaf3",
    marginBottom: "1rem"
  },
  indicator: {
    backgroundColor: `${palette.link.main}`
  }
}))(props => <Tabs {...props} />);
