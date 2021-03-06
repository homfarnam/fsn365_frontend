import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Router from "next/router";
import Transactions from "../Transactions";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TextStrong from "../TextStrong";

const useStyles = makeStyles(() =>
  createStyles({
    hint: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between"
    }
  })
);

export default function AddressTxs(props) {
  const { address } = props;
  const [direction] = useState("address");
  const handelChange = e => {
    const value = e.target.value;
    if (value == "from") {
      Router.push(`/txs?from=${address}`);
    }
    if (value == "to") {
      Router.push(`/txs?to=${address}`);
    }
    if (value == "address") {
      Router.push(`/txs?address=${address}`);
    }
  };
  const cssClasses = useStyles();

  return (
    <>
      <div className={cssClasses.hint}>
        <p>
          <TextStrong>Notice:</TextStrong>We only provide{" "}
          <TextStrong>10k non-ticket transactions</TextStrong> at most for an
          address!
        </p>
        <FormControl>
          <Select value={direction} onChange={handelChange}>
            <MenuItem value={"address"}>
              <small>
                <TextStrong>Txns</TextStrong>
              </small>
            </MenuItem>
            <MenuItem value={"to"}>
              <small>
                <TextStrong>Incoming Txns</TextStrong>
              </small>
            </MenuItem>
            <MenuItem value={"from"}>
              <small>
                <TextStrong>Outgoing Txns</TextStrong>
              </small>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Transactions
        tableOptions={{
          pageSizeOptions: [5, 10, 25, 50, 100],
          pageSize: 5
        }}
        params={{ [direction]: address }}
      />
    </>
  );
}
