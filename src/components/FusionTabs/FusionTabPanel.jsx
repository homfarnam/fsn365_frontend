import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

export default function FusionTabPanel(props) {
  const { children, value, index, style = {} } = props;
  const isActive = index === value;
  return (
    <Box
      role="fusion-tabpanel"
      component="div"
      hidden={value !== index}
      style={style}
    >
      {isActive ? children : null}
    </Box>
  );
}

FusionTabPanel.propTypes = {
  index: PropTypes.number,
  value: PropTypes.number,
  children: PropTypes.node,
  lazy: PropTypes.bool
};
