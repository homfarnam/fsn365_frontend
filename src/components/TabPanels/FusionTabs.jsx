import React from "react";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

export default withStyles(({ palette }) => ({
  root: {
    borderBottom: "1px solid #e7eaf3"
  },
  indicator: {
    backgroundColor: `${palette.link.main}`
  }
}))(props => <Tabs {...props} />);
