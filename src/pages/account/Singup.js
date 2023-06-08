import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackNavbar from "../../components/BackNavbar";

const auththeme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },

  palette: {
    primary: {
      main: "#FFFFFF", //배경색
      contrastText: "#17B7BD", //글자색
    },
    secondary: {
      main: "#17B7BD", //배경색
      contrastText: "#FFFFFF", //글자색
    },
  },
});

const Singup = () => {
  return (
    <ThemeProvider theme={auththeme}>
      {/* 상단 뒤로가기 nav바 */}
      <BackNavbar />
    </ThemeProvider>
  );
};

export default Singup;
