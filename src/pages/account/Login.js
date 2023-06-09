import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const navi = useNavigate({});

  //유저 입력정보 저장변수
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();
  const [user, setUser] = useState();

  //유저,비밀번호 저장
  const handleEmail = (e) => {
    setUserEmail(e.target.value);
    setUser({ userEmail, userPass });
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
    setUser({ userEmail, userPass });
  };

  //로그인버튼
  const handleLogin = (e) => {
    axios({
      url: `/user/login.sam`,
      method: "get",
      params: { userEmail: userEmail, userPass: userPass },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data > 0) {
          navi("/home");
        } else {
          console.log("실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={auththeme}>
      {/* 상단 뒤로가기 nav바 */}
      <BackNavbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "15%",
            mb: "15%",
            minHeight: "200px",
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
          <Box>
            이메일:
            <input onChange={handleEmail} name="userEmail"></input>
          </Box>
          <Box>
            비밀번호:
            <input onChange={handlePass} name="userPass"></input>
          </Box>
          <Box>
            <button
              id="loginBtn"
              type="button"
              className="btn btn-default"
              onClick={handleLogin}
            >
              로그인
            </button>
          </Box>
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
                Sign UP
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
