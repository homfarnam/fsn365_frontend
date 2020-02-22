import React from "react";
import NavLink from "../NavLink";
import addressMap from "../../constants/addressMap";
import TextStrong from "../TextStrong";

export default function FusionAdressLink(props) {
  const { address, children, miner = false, ...others } = props;
  const text = addressMap[address];
  if (addressMap[address] === "Fusion Contract") {
    return <TextStrong>{text}</TextStrong>;
  } else {
    const href = miner ? `/staking/${address}` : `/address/${address}`;
    return (
      <NavLink href={href}>
        {text ? (
          <strong {...others}>{text}</strong>
        ) : (
          <span {...others}>{address}</span>
        )}
      </NavLink>
    );
  }
}
