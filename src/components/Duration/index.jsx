import React from "react";
import UTCTime from "../UTCTime";

export default function Duration({ startTime, endTime }) {
  return (
    <>
      <UTCTime time={startTime} />~ <UTCTime time={endTime} />
    </>
  );
}
