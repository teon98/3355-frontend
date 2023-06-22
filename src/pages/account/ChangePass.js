import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";

import { useNavigate } from "react-router";

import axios from "axios";
import BackNavbar from "../../components/common/BackNavbar";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useSelector } from "react-redux";

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
  const userNo = useSelector((state) => state.userNo);
  const navi = useNavigate({});
  const [tempPass, setTempPass] = useState();
  const [newPass, setNewPass] = useState();
  const [changeDisable, setChangeDisable] = useState(true);

  //비밀번호 정규식
  const newPassRegEx = /^[A-Za-z0-9]{4,8}$/;

  //임시 비밀번호
  const handleTemPass = (e) => {
    setTempPass(e.target.value);
    const el = document.getElementById("tempmessage");
    el.innerHTML = "";
  };

  //새 비밀번호
  const handleNewPass = (e) => {
    if (newPassRegEx.test(e.target.value)) {
      setNewPass(e.target.value);
      const el = document.getElementById("passmessage");
      el.innerHTML = "사용 가능한 비밀번호입니다.";
      el.style.color = "#136162";
    } else {
      const el = document.getElementById("passmessage");
      el.innerHTML = "비밀번호는 영문 숫자만 가능하며 5~8자리입니다.";
      el.style.color = "red";
    }
  };

  //새 비밀번호 2차체크
  const handleNewPassCheck = (e) => {
    if (newPass === e.target.value) {
      const el = document.getElementById("passCheckmessage");
      el.innerHTML = "비밀번호가 일치합니다.";
      el.style.color = "#136162";
      setChangeDisable(false);
    } else {
      const el = document.getElementById("passCheckmessage");
      el.innerHTML = "비밀번호가 일치하지 않습니다.";
      el.style.color = "red";
      setChangeDisable(true);
    }
  };

  //비밀번호 변경 버튼
  const handleNewPassBtn = () => {
    axios({
      url: `/user/PassChange.sam`,
      method: "put",
      params: { userNo, tempPass, userPass: newPass },
    })
      .then((res) => {
        if (res.data === "성공") {
          navi("/auth/login");
        } else {
          const el = document.getElementById("tempmessage");
          el.innerHTML = "임시 비밀번호가 일치하지 않습니다.";
          el.style.color = "red";
          el.style.marginTop = "10px";
        }
      })
      .catch((err) => {
        console.log(err);
        const el = document.getElementById("tempmessage");
        el.innerHTML = "임시 비밀번호가 일치하지 않습니다.";
        el.style.color = "red";
        el.style.marginTop = "10px";
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
            <LockResetOutlinedIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="Temp Pass"
              variant="standard"
              name="temPassword"
              onChange={handleTemPass}
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
          <p
            id="tempmessage"
            style={{ color: "#136162", marginTop: "10px" }}
          ></p>
          <br></br>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              borderBottom: "2px solid white",
            }}
          >
            <HttpsOutlinedIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="PassWord"
              variant="standard"
              name="newPass"
              onChange={handleNewPass}
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
          <p id="passmessage" style={{ color: "#136162", marginTop: "10px" }}>
            패스워드는 영문 숫자 5~8자리입니다
          </p>
          <br></br>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              borderBottom: "2px solid white",
            }}
          >
            <HttpsOutlinedIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="Conrifm PassWord"
              variant="standard"
              name="newPassCheck"
              onChange={handleNewPassCheck}
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
          <p
            id="passCheckmessage"
            style={{ color: "#136162", marginTop: "10px" }}
          >
            패스워드 2차체크
          </p>
          <br></br>

          <Button
            variant="outlined"
            onClick={handleNewPassBtn}
            disabled={changeDisable}
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
            Register
          </Button>
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
