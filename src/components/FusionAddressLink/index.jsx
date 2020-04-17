import React from "react";
import NavLink from "../NavLink";
import addressMap from "../../constants/addressMap";
import TextStrong from "../TextStrong";

export default function FusionAdressLink(props) {
  const { address, children, miner = false, ...others } = props;
  const label = addressMap[address];
  if (label === "FUSION CONTRACT") {
    return <TextStrong {...others}>{label}</TextStrong>;
  }
  const href = miner ? `/staking/${address}` : `/address/${address}`;
  if (label) {
    return (
      <TextStrong {...others}>
        <NavLink href={href}>{label}</NavLink>
      </TextStrong>
    );
  }
  return (
    <span {...others}>
      <NavLink href={href}>{address}</NavLink>
    </span>
  );
}
