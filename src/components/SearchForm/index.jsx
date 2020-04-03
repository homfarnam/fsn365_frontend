import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import options from "./options";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import fetch from "../../libs/fetch";
import Router from "next/router";

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    form: {
      position: "relative",
      background: "#fff"
    },
    searchForm: {
      display: "flex",
      flexWrap: "nowrap",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      background: "#fff",
      border: "none"
    },
    typeFilter: {
      width: "128px",
      background: "#fff",
      borderRadius: 0,
      [breakpoints.down("md")]: {
        display: "none"
      }
    },
    typeFilterSearchBar: {
      width: "128px",
      background: "#fff",
      borderRadius: 0,
      "&>div": {
        padding: "9.5px 24px!important",
        borderRadius: "0!important",
        fontSize: "14px"
      }
    },
    searchBox: {
      flexGrow: 1,
      "&:hover": {
        borderColor: "transparent"
      },
      "&:focus": {
        borderColor: "transparent"
      }
    },
    searchBoxAtBar: {
      flexGrow: 1,
      "&:hover": {
        borderColor: "transparent"
      },
      "&:focus": {
        borderColor: "transparent"
      },
      "&>div": {
        borderRadius: 0,
        borderLeft: "none",
        fontSize: "14px"
      }
    },
    title: {
      color: "#fff",
      paddingBottom: ".5rem"
    },
    searchBtn: {
      position: "absolute",
      right: 0,
      top: 0,
      height: "100%",
      background: "#3498db",
      color: "#fff",
      borderRadius: 0,
      "&:hover": {
        background: "#2196f3"
      }
    }
  })
);
export default function SearchBar(props) {
  const { place = "home", className = " " } = props;
  const size = place === "home" ? "medium" : "small";
  const [searchType, setSearchType] = useState(options[0].type);
  const handelSearchType = e => {
    const value = e.target.value.trim();
    setSearchType(value);
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const handelSearchkeyword = e => {
    setSearchKeyword(e.target.value);
  };
  const handelSubmit = e => {
    e.preventDefault();
    doSearch(searchType, searchKeyword);
  };

  const cssClasses = useStyles();
  return (
    <form className={cssClasses.form + ` ${className}`} onSubmit={handelSubmit}>
      <FormControl className={cssClasses.searchForm}>
        <Select
          value={searchType}
          onChange={handelSearchType}
          placeholder="Search type"
          className={
            place == "home"
              ? cssClasses.typeFilter
              : cssClasses.typeFilterSearchBar
          }
          variant="outlined"
          size={size}
        >
          {options.map(option => {
            return (
              <MenuItem
                value={option.type}
                key={option.type}
                className={cssClasses.small}
                size={size}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          variant="outlined"
          className={
            place == "home" ? cssClasses.searchBox : cssClasses.searchBoxAtBar
          }
          placeholder="Search by Address/Tx Hash/Block/Asset"
          size={size}
          onChange={handelSearchkeyword}
        ></TextField>
        <Button className={cssClasses.searchBtn} type="submit">
          <SearchIcon />
        </Button>
      </FormControl>
    </form>
  );
}

async function doSearch(type, keyword) {
  const params = {
    type,
    keyword
  };

  const resData = await fetch("/search", params)
    .then(res => res.json())
    .then(res => res.data)
    .catch(e => {
      return {
        type: type,
        result: ""
      };
    });

  if (!resData || resData.length == 0) {
    return Router.push(`/search?keyword=${keyword}`);
  }
  const option = resData[0];
  window.location = `/${option.type}/${option.id}`;
}
