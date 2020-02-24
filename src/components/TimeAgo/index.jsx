import React from "react";
import PropType from "prop-types";
import TimeAgo from "react-timeago";

export default function InnerTimeAgo(props) {
  const { time } = props;
  return <TimeAgo date={time} formatter={formatter}></TimeAgo>;
}

TimeAgo.propTypes = {
  time: PropType.number
};

function formatter() {
  const value = arguments[0];
  let desc = arguments[1];
  const suffix = arguments[2];

  switch (desc) {
    case "second":
      desc = "secs";
      break;
    case "minute":
      desc = value > 1 ? "mins" : "min";
      break;
    default:
      break;
  }
  return `${value} ${desc} ${suffix}`;
}
