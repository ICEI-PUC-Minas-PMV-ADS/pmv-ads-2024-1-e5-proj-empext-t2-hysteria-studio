import { Theme, createTheme as createThemeMUI } from "@mui/material/styles";

const customTheme = {
  palette: {
    primary: {
      main: "#D4A132",
      light: "#AB7D00",
      dark: "#835B00",
    },
    secondary: {
      main: "#051118",
      light: "#2A272A",
      dark: "#4B4A54",
    },
    background: {
      default: "#f2f4f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#303742",
      secondary: "#767f8d",
      disabled: "#A6AEBA",
    },
  },
  shape: {
    borderRadius: 8,
  },
};

const createTheme = (theme: Theme) => createThemeMUI(theme || customTheme);

export { customTheme, createTheme };
