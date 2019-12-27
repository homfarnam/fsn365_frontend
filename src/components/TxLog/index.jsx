import React from "react";
import KeyValue from "../KeyValue";

export default function TxLog(props) {
  const { log = {} } = props;
  return (
    <div>
      {Object.keys(log).map(key => {
        const value = log[key];
        return <KeyValue key={key} label={key} value={value} />;
      })}
    </div>
  );
}
