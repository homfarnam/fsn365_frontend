import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SearchForm from "../SearchForm";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundImage: "linear-gradient(150deg,#19a0ff,#2d1582)",
      backgroundRepeat: "repeat-x",
      padding: "1rem",
      marginBottom: "1.75rem",
      borderRadius: "4px",
      boxShadow: "0 0.5rem 1.2rem rgba(189,197,209,.2)"
    },
    title: {
      color: "#fff",
      paddingBottom: ".5rem",
      lineHeight: 1
    }
  })
);
export default function SearchBar() {
  const cssClasses = useStyles();
  return (
    <div className={cssClasses.container}>
      <Typography
        variant="h6"
        component="h6"
        align="left"
        className={cssClasses.title}
      >
        Fusion Blockchain Explorer
      </Typography>
      <SearchForm />
    </div>
  );
}

function doSearch(type, keyword) {}
