import { Box, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

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
  const location = useLocation();

  const currentPath = location.pathname;
  const navigate = useNavigate();
  const onClickBtn = () => {
    if (currentPath == "/auth/login") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };
  return (
    <ThemeProvider theme={backtheme}>
      <Box sx={{ minHeight: "52px", display: "flex", alignItems: "center" }}>
        <IconButton
          aria-label="back"
          size="large"
          onClick={onClickBtn}
          color="primary"
        >
          <ArrowBackRoundedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </ThemeProvider>
  );
};

export default BackNavbar;
