import React, { useEffect, useState } from "react";
import logo from "../../images/Logo_3355.svg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router";

import axios from "axios";
import BackNavbar from "../../components/common/BackNavbar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";

const auththeme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },
  palette: {
    primary: {
      main: "#FFFFFF", //배경색
      contrastText: "#17B7BD", //글자색FFFFFF
    },
    secondary: {
      main: "#17B7BD", //배경색
      contrastText: "#FFFFFF", //글자색
    },
  },
});

const Singup = () => {
  //유저 변수들
  const navi = useNavigate({});
  const [userEmail, setUserEmail] = useState();
  const [userPass, setUserPass] = useState();
  const [userBirth, setUserBirth] = useState();
  const [userGender, setUserGender] = useState(1);
  const [userNickname, setUserNickname] = useState();
  const [user, setUser] = useState({});
  const [checkboxChecked, setCheckboxChecked] = useState(false); // 체크박스 상태

  //조건들 정규식
  const emailRegEx =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passRegEx = /^[A-Za-z0-9]{4,8}$/;
  const birthRegEx = /^[0-9]{6}$/;
  const genderRegEx = /^[0-9]{1}$/;
  const nickRegEx = /^[A-Za-z0-9_ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;

  //성공여부확인
  const [userEmailBoo, setUserEmailBoo] = useState(false);
  const [userPassBoo, setUserPassBoo] = useState(false);
  const [userBirthBoo, setUserBirthBoo] = useState(false);
  const [userGenderBoo, setUserGenderBoo] = useState(false);
  const [userNicknameBoo, setUserNicknameBoo] = useState(false);
  const [userCheck, setUsercheck] = useState(false);

  //버튼잠금
  const [emaildisable, setEmailDisable] = useState(true);
  const [nickdisable, setNickDisable] = useState(true);
  const [userdisable, setUserDisable] = useState(true);

  useEffect(() => {
    if (
      //유저정보 합격이 한개라도 없으면
      userEmailBoo === true &&
      userPassBoo === true &&
      userBirthBoo === true &&
      userGenderBoo === true &&
      userNicknameBoo === true &&
      userCheck === true
    ) {
      setUserDisable(false);
      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
    } else {
      setUserDisable(true);
    }
  }, [
    userEmailBoo,
    userPassBoo,
    userBirthBoo,
    userGenderBoo,
    userNicknameBoo,
    userCheck,
  ]);

  //이메일 체크
  const handleEmail = (e) => {
    if (emailRegEx.test(e.target.value)) {
      setUserEmail(e.target.value);
      const el = document.getElementById("emailmessage");
      el.innerHTML = "중복체크를 진행해주세요.";
      el.style.color = "#136162";
      setEmailDisable(false);
      setUserEmailBoo(true);
    } else {
      const el = document.getElementById("emailmessage");
      el.innerHTML = "이메일의 형식이 올바르지 않습니다.";
      el.style.color = "red";
      setEmailDisable(true);
      setUserEmailBoo(false);
    }
  };

  const emailCheck = () => {
    axios({
      url: `/user/emailDup.sam/${userEmail}`,
      method: "get",
    })
      .then((res) => {
        if (res.data === "성공") {
          const el = document.getElementById("emailmessage");
          el.innerHTML = "사용 가능한 이메일입니다.";
          el.style.color = "#136162";
          setUser({ userEmail, userPass, userBirth, userGender, userNickname });
        } else {
          const el = document.getElementById("emailmessage");
          el.innerHTML = "이미 사용중인 이메일입니다.";
          el.style.color = "red";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //비밀번호 체크
  const handlePass = (e) => {
    if (passRegEx.test(e.target.value)) {
      const el = document.getElementById("passmessage");
      el.innerHTML = "사용 가능한 비밀번호입니다.";
      el.style.color = "#136162";
      setUserPass(e.target.value);
    } else {
      const el = document.getElementById("passmessage");
      el.innerHTML = "비밀번호는 영문 숫자만 가능하며 4~8자리입니다.";
      el.style.color = "red";
    }
  };

  //비밀번호 텍스트-비밀전환
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //비밀번호 2차체크
  const handlePassDup = (e) => {
    if (userPass === e.target.value) {
      const el = document.getElementById("passDupmessage");
      el.innerHTML = "비밀번호가 일치합니다.";
      el.style.color = "#136162";

      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
      setUserPassBoo(true);
    } else {
      const el = document.getElementById("passDupmessage");
      el.innerHTML = "비밀번호가 일치하지 않습니다.";
      el.style.color = "red";
      setUserPassBoo(false);
    }
  };

  //생년월일 체크
  const handleBirth = (e) => {
    if (birthRegEx.test(e.target.value)) {
      const el = document.getElementById("birthmessage");
      el.innerHTML = "생년월일이 확인되었습니다.";
      el.style.color = "#136162";
      setUserBirth(e.target.value);

      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
      setUserBirthBoo(true);
    } else {
      const el = document.getElementById("birthmessage");
      el.innerHTML = "생년월일 6자리를 입력해주세요.";
      el.style.color = "red";
      setUserBirthBoo(false);
    }
  };

  //성별체크
  const handleGender = (e) => {
    if (genderRegEx.test(e.target.value)) {
      setUserGender(e.target.value);
      setUserGenderBoo(true);

      setUser({ userEmail, userPass, userBirth, userGender, userNickname });
    } else {
      setUserGenderBoo(false);
    }
  };

  //별명체크
  const handleNickname = (e) => {
    if (nickRegEx.test(e.target.value)) {
      setUserNickname(e.target.value);

      const el = document.getElementById("nickmessage");
      el.innerHTML = "중복체크를 진행해주세요";
      el.style.color = "#136162";

      setNickDisable(false);
    } else {
      const el = document.getElementById("nickmessage");
      el.innerHTML = "영문 숫자 한글 2~5자를 입력해주세요.";
      el.style.color = "red";

      setNickDisable(true);
      setUserNicknameBoo(false);
    }
  };

  //별명 중복체크
  const nickCheck = () => {
    axios({
      url: `/user/nicknameDup.sam/${userNickname}`,
      method: "get",
    })
      .then((res) => {
        if (res.data === "성공") {
          setUserNicknameBoo(true);
          const el = document.getElementById("nickmessage");
          el.innerHTML = "사용 가능한 닉네임입니다.";
          el.style.color = "#136162";
          setUser({ userEmail, userPass, userBirth, userGender, userNickname });
        } else {
          const el = document.getElementById("nickmessage");
          el.innerHTML = "이미 사용중인 닉네임입니다.";
          el.style.color = "red";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //유저정보 값 보내기
  const handleInsert = () => {
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

  //다이얼로그
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCheckboxChecked(false); //체크박스체크
    setUsercheck(false); //유저동의체크
  };
  const handleDraw = () => {
    setOpen(false); //다이알로그 오픈
    setCheckboxChecked(true); //체크박스체크
    setUsercheck(true); //유저동의체크
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
              label="E-mail"
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
                flex: 7.7,
              }}
            />
            <Button
              variant="outlined"
              id="userBtn"
              type="button"
              className="btn btn-default"
              onClick={emailCheck}
              disabled={emaildisable}
              sx={{
                flex: 2.3,
                border: "2px solid white",
                borderRadius: "50px",
                "&:hover": {
                  border: "2px solid white", // 원하는 효과로 수정해주세요
                },
              }}
            >
              중복확인
            </Button>
          </Box>
          <p id="emailmessage" style={{ color: "#136162", marginTop: "10px" }}>
            이메일 형식에 맞게 입력해주세요
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
            <PersonOutlineIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="NickName"
              variant="standard"
              onChange={handleNickname}
              name="userNickname"
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
                flex: 7.7,
              }}
            />
            <Button
              variant="outlined"
              id="userBtn"
              type="button"
              className="btn btn-default"
              onClick={nickCheck}
              disabled={nickdisable}
              sx={{
                flex: 2.3,
                border: "2px solid white",
                borderRadius: "50px",
                "&:hover": {
                  border: "2px solid white", // 원하는 효과로 수정해주세요
                },
              }}
            >
              중복확인
            </Button>
          </Box>
          <p id="nickmessage" style={{ color: "#136162", marginTop: "10px" }}>
            영문 한글 2~5자리입니다
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
                flex: 7.5,
              }}
            />
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
          <p id="passmessage" style={{ color: "#136162", marginTop: "10px" }}>
            패스워드는 영문 숫자 4~8자리입니다
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
              label="Confirm PassWord"
              variant="standard"
              type={showPassword ? "text" : "password"}
              onChange={handlePassDup}
              name="userPassDup"
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
                flex: 7.5,
              }}
            />
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
          <p
            id="passDupmessage"
            style={{ color: "#136162", marginTop: "10px" }}
          >
            패스워드 2차체크
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
            <CakeOutlinedIcon sx={{ color: "white", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="Birth"
              variant="standard"
              onChange={handleBirth}
              name="userBirth"
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
                flex: 5,
              }}
            />
            <FormControl
              sx={{
                ml: 2,
                flex: 5,
              }}
              style={{ color: "white" }}
            >
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleGender}
              >
                <FormControlLabel value="1" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <p id="birthmessage" style={{ color: "#136162", marginTop: "10px" }}>
            생년월일 6자리를 입력해주세요
          </p>
          <br></br>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={checkboxChecked}
                  onClick={handleClickOpen}
                />
              }
              label="[필수] 개인정보 관리 동의"
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{ color: "black", textAlign: "center" }}
              >
                {`개인 정보 관리 동의서
          `}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ color: "black" }}
                >
                  <div
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                      lineHeight: 1.5,
                      fontFamily: "GmarketSans",
                    }}
                  >
                    <p>
                      <strong>[삼삼오오]</strong>은(는) 귀하의 개인정보를
                      중요시하며, 관련 법규를 준수하여 안전하게 처리하고
                      있습니다. 본 동의문은 귀하의 개인정보를 수집, 보유, 이용,
                      제공 및 파기하는 경우에 적용됩니다. 아래의 내용을 주의
                      깊게 읽고, 동의 여부를 결정해 주시기 바랍니다.
                    </p>
                    <br></br>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      수집 및 이용 목적
                    </p>
                    <ul>
                      <li>
                        ● 목적 1: 서비스 제공을 위한 회원 가입, 인증, 계약 이행
                        등
                      </li>
                      <li> ● 목적 2: 고객 지원 및 문의 응대</li>
                      <li> ● 목적 3: 이벤트 참여 및 경품 배송 등</li>
                    </ul>
                    <br />

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      수집하는 개인정보의 항목
                    </p>
                    <p>귀하의 개인정보 항목은 다음과 같이 수집됩니다:</p>
                    <p>● 수집항목 1 : 이메일</p>
                    <p>● 수집항목 2 : 생년월일</p>
                    <p>● 수집항목 3 : 성별</p>
                    <br />
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      개인정보의 보유 및 이용 기간
                    </p>
                    <p>
                      귀하의 개인정보는 수집 및 이용 목적 달성 시까지 보유 및
                      이용되며, 목적 달성 후에는 즉시 파기됩니다. 다만, 관련
                      법령에 따라 보존할 필요가 있는 경우에는 해당 기간 동안
                      보관됩니다.
                    </p>
                    <br></br>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      개인정보의 제공
                    </p>
                    <ul>
                      <li>
                        ● 제공 항목 1: 생년월일, 성별/ 제공받는 자 1: 마케팅
                        파트너
                      </li>
                      <li>
                        ● 제공 항목 2: 이메일 / 제공받는 자 2: 마케팅 파트너
                      </li>
                    </ul>

                    <p>
                      <strong>개인정보의 파기</strong>
                    </p>
                    <p>
                      귀하의 개인정보는 수집 및 이용 목적 달성 후에는 지체 없이
                      파기됩니다. 파기 절차, 방법 및 시기는 다음과 같습니다:
                    </p>
                  </div>
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} style={{ color: "red" }}>
                  동의하지않음
                </Button>
                <Button
                  onClick={handleDraw}
                  style={{ color: "green" }}
                  autoFocus
                >
                  동의
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Button
            variant="outlined"
            onClick={handleInsert}
            disabled={userdisable}
            sx={{
              fontWeight: "bold",
              pt: "15px",
              pb: "15px",
              width: "100%",
              border: "2px solid white",
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

export default Singup;
