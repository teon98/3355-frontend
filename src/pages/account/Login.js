import { Box } from "@mui/material";
import React from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

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
          justifyContent: "space-between",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "20%",
            minHeight: "200px",
          }}
        >
          <img src={logo} alt="logo" />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: "10%",
            minHeight: "150px",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            align="left"
            color="white"
            gutterBottom
          >
            Welcome!
          </Typography>
          <Typography
            variant="body1"
            align="left"
            color="white"
            gutterBottom
            sx={{ mb: "20px" }}
          >
            Healthy 하고픈 당신에게
            <br />
            Healthy 한 혜책과 커뮤니티를 선사합니다.
          </Typography>
          <Stack spacing={2}>
            <Link
              to="/auth/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  pt: "15px",
                  pb: "15px",
                  width: "100%",
                }}
              >
                Login
              </Button>
            </Link>
            <Link
              to="/auth/signup"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                variant="outlined"
                sx={{
                  fontWeight: "bold",
                  pt: "15px",
                  pb: "15px",
                  width: "100%",
                }}
              >
                Outlined
              </Button>
            </Link>
          </Stack>
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

export default Login;
