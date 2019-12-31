import React from "react";
import NavLink from "../NavLink";
import addressMap from "../../constants/addressMap";

export default function FusionAdressLink(props) {
  const { address, children, ...others } = props;
  const text = addressMap[address];
  if (addressMap[address] === "Fusion Contract") {
    return <strong>{text}</strong>;
  } else {
    return (
      <NavLink href={`/address/${address}`}>
        {text ? (
          <strong {...others}>{text}</strong>
        ) : (
          <span {...others}>{address}</span>
        )}
      </NavLink>
    );
  }
}
