import React, { useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
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
const CardCreate = () => {
  //유저 정보 받아오기
  const { state } = useLocation();
  const userNo = state;

  //카드 변수
  const navi = useNavigate({});
  const [cardPass, setCardPass] = useState();
  const [card, setCard] = useState({});

  //카드 정규식
  const cardRegEx = /^[0-9]{4}/;

  //비밀번호 체크
  const handleCardPass = (e) => {
    if (cardRegEx.test(e.target.value)) {
      const el = document.getElementById("passmessage");
      el.innerHTML = "사용 가능한 비밀번호입니다.";
      setCardPass(e.target.value);
    } else {
      const el = document.getElementById("passmessage");
      el.innerHTML = "숫자 4자리를 입력해주세요.";
    }
  };

  //비밀번호 중복체크
  const handleCardDupPass = (e) => {
    if (cardPass === e.target.value) {
      const el = document.getElementById("passDupmessage");
      el.innerHTML = "비밀번호가 일치합니다.";
      setCard({ userNo, cardPass });
    } else {
      const el = document.getElementById("passDupmessage");
      el.innerHTML = "비밀번호가 일치하지 않습니다.";
    }
  };

  //카드 생성
  const handleCardInsert = (e) => {
    axios({
      url: `/user/insertCard.sam`,
      method: "post",
      data: { cardPass: cardPass },
      params: { userNo: userNo },
    })
      .then((res) => {
        console.log(card);
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
            카드 비밀번호:
            <input onChange={handleCardPass} name="userPass"></input>
            <p id="passmessage">카드 비밀번호는 숫자 4자리입니다</p>
          </Box>
          <Box>
            카드 비밀번호 2차체크:
            <input onChange={handleCardDupPass} name="userPassDup"></input>
            <p id="passDupmessage">패스워드 2차체크</p>
          </Box>
          <Box>
            <button
              id="cardBtn"
              type="button"
              className="btn btn-default"
              onClick={handleCardInsert}
            >
              카드 생성
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

export default CardCreate;
