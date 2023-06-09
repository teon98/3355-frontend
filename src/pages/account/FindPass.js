import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import BackNavbar from "../../components/BackNavbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
            <h5> 이메일 </h5>
            <input
              type="text"
              maxLength="20"
              name="SearchEmial"
              onChange={handleSearchEmail}
            />
          </Box>
          <Box>
            <h5> 닉네임 </h5>
            <input
              type="text"
              maxLength="15"
              name="SearchNickName"
              onChange={handleSearchNickName}
            />
          </Box>
          <Box>
            <button
              id="findPassBtn"
              type="button"
              className="btn btn-default"
              onClick={handleFindPass}
            >
              비밀번호 찾기
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
export default FindPass;
