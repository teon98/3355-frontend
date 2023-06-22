import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BackNavbar from "../../components/common/BackNavbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Swal from "sweetalert2";

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

const FindPass = () => {
  const navi = useNavigate({});

  const [searchEmail, setSearchEmail] = useState();
  const [searchNickName, setSearchNickName] = useState();

  //이메일 입력
  const handleSearchEmail = (e) => {
    setSearchEmail(e.target.value);
  };

  //닉네임 입력
  const handleSearchNickName = (e) => {
    setSearchNickName(e.target.value);
  };

  const dispatch = useDispatch();
  //비밀번호 체크 메일 보내기
  const handleFindPass = (e) => {
    axios({
      url: `/user/findPass.sam`,
      method: "put",
      params: { userEmail: searchEmail, userNickname: searchNickName },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data > 0) {
          dispatch({ type: "setUserNo", num: res.data });
          navi("/auth/ChangePass");
        } else {
          //검색 실패시 알람
          Toast.fire({
            icon: "error",
            title: "E-Mail 또는 NickName을 확인해주세요.",
          });
          console.log("실패");
        }
      })
      .catch((err) => {
        //검색 실패시 알람
        Toast.fire({
          icon: "error",
          title: "E-Mail 또는 NickName을 입력해주세요.",
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
              name="SearchEmial"
              onChange={handleSearchEmail}
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
            <PersonOutlineIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="NickName"
              variant="standard"
              name="SearchNickName"
              onChange={handleSearchNickName}
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
          <br></br>
          <br></br>
          <br></br>

          <Button
            variant="outlined"
            onClick={handleFindPass}
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
            Find Pass
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
export default FindPass;
