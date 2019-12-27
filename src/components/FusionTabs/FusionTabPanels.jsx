import React from "react";
import PropTypes from "prop-types";

export default function FusionTabPanels(props) {
  const { children } = props;
  return <>{children}</>;
}

FusionTabPanels.propTypes = {
  children: PropTypes.node
};
