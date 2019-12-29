import React from "react";
import NavLink from "../NavLink";

const FUSION_NATIVE_CONTRACT_ADDRESS =
  "0xffffffffffffffffffffffffffffffffffffffff";

export default function FusionAdressLink(props) {
  const { address, children, ...others } = props;
  if (address === FUSION_NATIVE_CONTRACT_ADDRESS) {
    return <span>Fusion Contract</span>;
  } else {
    return (
      <NavLink href={`/address/${address}`}>
        <span {...others}>{address}</span>
      </NavLink>
    );
  }
}
