import React from "react";
import { format } from "timeago.js";
import PropType from "prop-types";

export default function TimeAgo(props) {
  const { time } = props;
  return <>{format(time)}</>;
}

TimeAgo.propTypes = {
  time: PropType.number
};
