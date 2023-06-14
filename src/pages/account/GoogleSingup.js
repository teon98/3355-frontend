import React, { useEffect, useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const GoogleSignup = () => {
  const { state } = useLocation();
  const userEmail = state;

  //유저 변수들
  const navi = useNavigate({});
  const [userPass, setUserPass] = useState();
  const [userBirth, setUserBirth] = useState();
  const [userGender, setUserGender] = useState();
  const [userNickname, setUserNickname] = useState();
  const [user, setUser] = useState({});

  //조건들 정규식
  const passRegEx = /^[A-Za-z0-9_]+[A-Za-z0-9]{5,8}$/;
  const birthRegEx = /^[0-9]{6}$/;
  const genderRegEx = /^[0-9]{1}$/;
  const nickRegEx = /^[A-Za-z0-9_ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;

  //성공여부확인
  // const [userEmailBoo, setUserEmailBoo] = useState(false);
  // const [userPassBoo, setUserPassBoo] = useState(false);
  // const [userBirthBoo, setUserBirthBoo] = useState(false);
  // const [userGenderBoo, setUserGenderBoo] = useState(false);
  // const [userNicknameBoo, setUserNicknameBoo] = useState(false);

  //비밀번호 체크
  const handlePass = (e) => {
    if (passRegEx.test(e.target.value)) {
      const el = document.getElementById("passmessage");
      el.innerHTML = "사용 가능한 비밀번호입니다.";
      setUserPass(e.target.value);
    } else {
      const el = document.getElementById("passmessage");
      el.innerHTML = "비밀번호는 영문 숫자만 가능하며 5~8자리입니다.";
    }
  };

  //비밀번호 2차체크
  const handlePassDup = (e) => {
    if (userPass === e.target.value) {
      const el = document.getElementById("passDupmessage");
      el.innerHTML = "비밀번호가 일치합니다.";

      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
      // setUserPassBoo(true);
    } else {
      const el = document.getElementById("passDupmessage");
      el.innerHTML = "비밀번호가 일치하지 않습니다.";
      // setUserPassBoo(false);
    }
  };

  //생년월일 체크
  const handleBirth = (e) => {
    if (birthRegEx.test(e.target.value)) {
      const el = document.getElementById("birthmessage");
      el.innerHTML = "생년월일이 확인되었습니다.";
      setUserBirth(e.target.value);

      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
      // setUserBirthBoo(true);
    } else {
      const el = document.getElementById("birthmessage");
      el.innerHTML = "생년월일 6자리를 입력해주세요.";
      // setUserBirthBoo(false);
    }
  };

  //성별체크
  const handleGender = (e) => {
    if (genderRegEx.test(e.target.value)) {
      const el = document.getElementById("gendermessage");
      el.innerHTML = "주민번호 뒷자리 1개가 확인되었습니다.";
      setUserGender(e.target.value);
      // setUserGenderBoo(true);
      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
    } else {
      const el = document.getElementById("gendermessage");
      el.innerHTML = "주민번호 뒷자리 1개를 입력해주세요.";
      // setUserGenderBoo(false);
    }
  };

  //별명체크
  const handleNickname = (e) => {
    if (nickRegEx.test(e.target.value)) {
      setUserNickname(e.target.value);
      // setUserNicknameBoo(true);

      const el = document.getElementById("nickmessage");
      el.innerHTML = "중복체크를 진행해주세요";
    } else {
      const el = document.getElementById("nickmessage");
      el.innerHTML = "영문 숫자 한글 2~5자를 입력해주세요.";
      // setUserNicknameBoo(false);
    }
  };

  const nickCheck = () => {
    console.log(userNickname);

    axios({
      url: `/user/nicknameDup.sam/${userNickname}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        const el = document.getElementById("nickmessage");
        el.innerHTML = res.data;
        setUser({ userEmail, userPass, userBirth, userGender, userNickname });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //유저정보 값 보내기
  const handleInsert = () => {
    console.log(user);

    axios({
      url: `/user/insert.sam`,
      method: "post",
      data: user,
    })
      .then((res) => {
        console.log(res.data);
        navi("/auth/cardCreate", { state: res.data });
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
            <p id="emailmessage">{userEmail}</p>
          </Box>
          <Box>
            패스워드:
            <input onChange={handlePass} name="userPass"></input>
            <p id="passmessage">패스워드는 영문 숫자 8자리입니다</p>
          </Box>
          <Box>
            패스워드 2차체크:
            <input onChange={handlePassDup} name="userPassDup"></input>
            <p id="passDupmessage">패스워드 2차체크</p>
          </Box>
          <Box>
            생년월일 6자리:
            <input onChange={handleBirth} name="userBirth"></input>
            <p id="birthmessage">생년월일 6자리를 입력해주세요</p>
            주민번호 앞자리:
            <input onChange={handleGender} name="userGender"></input>
            <p id="gendermessage">주민번호 뒷자리 1개를 입력해주세요</p>
          </Box>

          <Box>
            별명:
            <input onChange={handleNickname} name="userNickname"></input>
            <p id="nickmessage">별명을 입력해주세요</p>
            <button
              id="userBtn"
              type="button"
              className="btn btn-default"
              onClick={nickCheck}
            >
              이메일 중복체크
            </button>
          </Box>
          <Box>
            <button
              id="userBtn"
              type="button"
              className="btn btn-default"
              onClick={handleInsert}
            >
              입력하기
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
export default GoogleSignup;
