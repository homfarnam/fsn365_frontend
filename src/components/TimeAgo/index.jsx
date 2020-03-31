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
      desc = "sec";
      break;
    case "minute":
      desc = "min";
      break;
    case "hour":
      desc = "hr";
      break;
    case "week":
      desc = "wk";
      break;
    case "month":
      desc = "mo";
      break;
    default:
      break;
  }
  if (value > 1) {
    desc += "s";
  }
  return `${value} ${desc} ${suffix}`;
}
