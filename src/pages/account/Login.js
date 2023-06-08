import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackNavbar from "../../components/BackNavbar";

const auththeme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },

  palette: {
    primary: {
      main: "#17B7BD", //배경색
      contrastText: "#FFFFFF", //글자색
    },
    secondary: {
      main: "#FFFFFF", //배경색
      contrastText: "#17B7BD", //글자색
    },
  },
});

const Login = () => {
  return (
    <ThemeProvider theme={auththeme}>
      {/* 상단 뒤로가기 nav바 */}
      <BackNavbar />
      {/* LOGO */}
    </ThemeProvider>
  );
};

export default Login;
