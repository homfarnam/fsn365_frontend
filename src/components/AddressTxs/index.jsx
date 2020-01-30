import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Router from "next/router";
import Transactions from "../Transactions";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) =>
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
  const { address, txMade = 0 } = props;
  const [direction] = useState("from");
  const handelChange = e => {
    const value = e.target.value;
    if (value == "from") {
      Router.push(`/txs?from=${address}`);
    }
    if (value == "to") {
      Router.push(`/txs?to=${address}`);
    }
  };
  const cssClasses = useStyles();

  return (
    <>
      <div className={cssClasses.hint}>
        <p>
          <strong>Notice:</strong>We only provide{" "}
          <strong>non-ticket transactions</strong> for an address!
        </p>
        <FormControl>
          <Select value={direction} onChange={handelChange}>
            <MenuItem value={"from"}>
              <small>
                <strong>Outgoing Txns</strong>
              </small>
            </MenuItem>
            <MenuItem value={"to"}>
              <small>
                <strong>Incoming Txns</strong>
              </small>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Transactions
        tableOptions={{
          pageSizeOptions: [5, 10],
          pageSize: 5
        }}
        params={{ [direction]: address, txMade }}
      />
    </>
  );
}
