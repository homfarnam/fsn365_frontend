import React from "react";

export default function Duration({ startTime, endTime }) {
  const startTimeStr =
    +startTime == 18446744073709552000
      ? "Forever"
      : new Date(startTime * 1000).toLocaleString();
  const endTimeStr =
    +endTime == 18446744073709552000
      ? "Forever"
      : new Date(endTime * 1000).toLocaleString();
  return <i>{startTimeStr + " ~ " + endTimeStr}</i>;
}
