import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import axios from "axios";
import BackNavbar from "../../components/common/BackNavbar";
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
const ChangePass = () => {
  //유저 입력 변수들
  const navi = useNavigate({});
  const [tempPass, setTempPass] = useState();
  const [newPass, setNewPass] = useState();

  //비밀번호 정규식
  const newPassRegEx = /^[A-Za-z0-9_]+[A-Za-z0-9]{5,8}$/;

  //임시 비밀번호
  const handleTemPass = (e) => {
    setTempPass(e.target.value);
  };

  //새 비밀번호
  const handleNewPass = (e) => {
    if (newPassRegEx.test(e.target.value)) {
      setNewPass(e.target.value);
      const el = document.getElementById("passmessage");
      el.innerHTML = "사용 가능한 비밀번호입니다.";
    } else {
      const el = document.getElementById("passmessage");
      el.innerHTML = "비밀번호는 영문 숫자만 가능하며 5~8자리입니다.";
    }
  };

  //새 비밀번호 2차체크
  const handleNewPassCheck = (e) => {
    if (newPass === e.target.value) {
      const el = document.getElementById("passCheckmessage");
      el.innerHTML = "비밀번호가 일치합니다.";
    } else {
      const el = document.getElementById("passCheckmessage");
      el.innerHTML = "비밀번호가 일치하지 않습니다.";
    }
  };

  //비밀번호 변경 버튼
  const handleNewPassBtn = () => {
    axios({
      url: `/user/PassChange.sam`,
      method: "put",
      params: { tempPass, userPass: newPass },
    })
      .then((res) => {
        console.log(res.data);
        navi("/auth/login");
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
            <h5> 임시 비밀번호 </h5>
            <input
              type="text"
              maxLength="20"
              name="temPassword"
              onChange={handleTemPass}
            />
          </Box>
          <Box>
            <h5> 새 비밀번호 </h5>
            <input
              type="text"
              maxLength="15"
              name="newPass"
              onChange={handleNewPass}
            />
            <p id="passmessage">패스워드는 영문 숫자 8자리입니다</p>
          </Box>
          <Box>
            <h5> 새 비밀번호 확인</h5>
            <input
              type="text"
              maxLength="15"
              name="newPassCheck"
              onChange={handleNewPassCheck}
            />
            <p id="passCheckmessage">패스워드 2차체크</p>
          </Box>
          <Box>
            <button
              id="newPassBtn"
              type="button"
              className="btn btn-default"
              onClick={handleNewPassBtn}
            >
              비밀번호 변경
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

export default ChangePass;
