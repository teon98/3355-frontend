import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
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
const Login = () => {
  return (
    <ThemeProvider theme={auththeme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      ></Box>
    </ThemeProvider>
  );
};
export default Login;
