import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { Box, createTheme } from "@mui/material";

import BackNavbar from "../../components/common/BackNavbar";
import LinearWithValueLabel from "./Loding";
import CardAni from "../../components/CardAni";

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
const CardLoading = () => {
  return (
    <ThemeProvider theme={auththeme}>
      {/* 상단 뒤로가기 nav바 */}
      <BackNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mx: 3,
          fontFamily: "GmarketSans",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "15%",
            mb: "15%",
            minHeight: "100px",
          }}
        >
          <img src={logo} alt="logo" width="80px" />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: "10%",
            minHeight: "150px",
          }}
        >
          <Box sx={{ mb: "5%" }}>
            <CardAni></CardAni>
          </Box>
          <Box sx={{ mt: "30px" }}>
            <LinearWithValueLabel></LinearWithValueLabel>
          </Box>
          <Box sx={{ mt: "30px" }}>
            <Typography variant="body2" align="center" color="#E4F7F7">
              신한DS금융SW아카데미_2차프로젝트_삼삼조
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardLoading;
