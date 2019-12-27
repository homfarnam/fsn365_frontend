import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#1d6fa5",
      main: "#2196f3",
      light: "#4dabf5"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#f8f9fa"
    },
    link: {
      dark: "#1d6fa5",
      main: "#3498db",
      light: "#4dabf5"
    },
    spacing: {
      table: "0.625rem",
      info: "0.75rem"
    },
    weight: {
      normal: 400,
      bold: 600,
      bolder: 700
    }
  }
});

export default theme;
