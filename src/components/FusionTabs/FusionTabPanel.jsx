import React from "react";
import PropTypes from "prop-types";

export default function FusionTabPanel(props) {
  const { children, value, index, style = {} } = props;
  const isActive = index === value;
  return (
    <div
      role="fusion-tabpanel"
      component="div"
      hidden={value !== index}
      style={style}
    >
      {isActive ? children : null}
    </div>
  );
}

FusionTabPanel.propTypes = {
  index: PropTypes.number,
  value: PropTypes.number,
  children: PropTypes.node,
  lazy: PropTypes.bool
};
