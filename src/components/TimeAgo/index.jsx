import React from "react";
import * as timeago from "timeago.js";
import PropType from "prop-types";

export default function TimeAgo(props) {
  const { time } = props;
  return <>timegao.format(time}</>;
}

TimeAgo.propTypes = {
  time: PropType.number
};
