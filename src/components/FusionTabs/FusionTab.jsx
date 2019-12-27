import React from "react";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

export default withStyles(({ palette }) => ({
  root: {
    color: `rgba(74,79,85,.8)`,
    textTransform: "capitalize",
    fontWeight: `${palette.weight.bolder}`,
    opacity: 1,
    minWidth: 72,
    "&:hover": {
      color: `${palette.link.main}`
    },
    "&$selected": {
      color: `${palette.link.main}`
    },
    "&:focus": {
      color: `${palette.link.main}`
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);
