import { AppBar, Box, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import styled from "@emotion/styled";

const GradientAppBar = styled(AppBar)`
  background: linear-gradient(360deg, #17b7bd 4.53%, #7cde9d 75.31%);
`;

const backtheme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },

  palette: {
    primary: {
      main: "#FFFFFF", //배경색
    },
  },
});

const BackNavbar = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <ThemeProvider theme={backtheme}>
      <GradientAppBar>
        <Box sx={{ minHeight: "64px", display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="back"
            size="large"
            onClick={onClickBtn}
            color="primary"
          >
            <ArrowBackRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </GradientAppBar>
    </ThemeProvider>
  );
};

export default BackNavbar;
