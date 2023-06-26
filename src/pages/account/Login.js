import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackNavbar from "../../components/common/BackNavbar";
import { useDispatch, useSelector } from "react-redux";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

//로그인 실패시 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center-center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Login = () => {
  const navi = useNavigate({});

  //유저 입력정보 저장변수
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();
  const [loginFailed, setLoginFailed] = useState(false);

  //유저,비밀번호 저장
  const handleEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePass = (e) => {
    setUserPass(e.target.value);
  };

  //비밀번호 텍스트-비밀전환
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //리덕스 변수 사용하기
  const userNo = useSelector((state) => state.userNo);
  const dispatch = useDispatch();

  //로그인버튼
  const handleLogin = (e) => {
    axios({
      url: `/user/login.sam`,
      method: "get",
      params: { userEmail: userEmail, userPass: userPass },
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "setUserNo", num: res.data });
        if (res.data > 0) {
          navi("/home");
        } else {
          console.log("실패");
          //로그인 실패시 알람
          Toast.fire({
            icon: "error",
            title: "E-Mail 또는 PassWord를 확인해주세요",
          });
          setLoginFailed(true);
        }
      })
      .catch((err) => {
        //로그인 실패시 알람
        Toast.fire({
          icon: "error",
          title: "E-Mail 또는 PassWord를 입력해주세요",
        });
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              borderBottom: "2px solid white",
            }}
          >
            <MailOutlineIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="E-Mail"
              variant="standard"
              onChange={handleEmail}
              name="userEmail"
              color="primary"
              InputProps={{
                disableUnderline: true,
              }}
              InputLabelProps={{
                style: {
                  color: "white", // 원하는 색상으로 변경
                },
              }}
              sx={{
                ml: 2,
                flex: 8,
              }}
            />
          </Box>
          <br></br>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              borderBottom: "2px solid white",
            }}
          >
            <LockOpenIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="PassWord"
              variant="standard"
              type={showPassword ? "text" : "password"}
              onChange={handlePass}
              name="userPass"
              color="primary"
              InputProps={{
                disableUnderline: true,
              }}
              InputLabelProps={{
                style: {
                  color: "white", // 원하는 색상으로 변경
                },
              }}
              sx={{
                ml: 2,
                flex: 8,
              }}
            />{" "}
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                flex: 2.5,
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>

          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Button
            variant="outlined"
            onClick={handleLogin}
            sx={{
              fontWeight: "bold",
              pt: "15px",
              pb: "15px",
              width: "100%",
              border: "2px solid white",
              color: "white",
              "&:hover": {
                border: "2px solid white", // 원하는 효과로 수정해주세요
              },
            }}
          >
            Login
          </Button>
          <br></br>
          <a href="/auth/findPass">
            <p style={{ color: "#136162", marginTop: "10px" }}>
              비밀번호를 잃어버리셨나요?
            </p>
          </a>
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
