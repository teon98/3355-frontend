import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";

import { useNavigate } from "react-router";

import axios from "axios";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

//비밀번호 변경시 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center-center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

const MyChangePass = () => {
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
          //비밀번호 변경시 알람
          Toast.fire({
            icon: "success",
            title: "비밀번호가 변경되었습니다.",
          });
          setTimeout(() => {
            navi("/mypage");
          }, 1000);
        } else {
          const el = document.getElementById("tempmessage");
          el.innerHTML = "이전 비밀번호가 일치하지 않습니다.";
          el.style.color = "red";
          el.style.marginTop = "10px";
        }
      })
      .catch((err) => {
        console.log(err);
        const el = document.getElementById("tempmessage");
        el.innerHTML = "이전 비밀번호가 일치하지 않습니다.";
        el.style.color = "red";
        el.style.marginTop = "10px";
      });
  };

  return (
    <Box sx={{ px: "24px" }}>
      {" "}
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
        ></Box>

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
              borderBottom: "2px solid green",
            }}
          >
            <LockResetOutlinedIcon sx={{ color: "green", mt: 2.3 }} />
            <TextField
              id="standard-basic"
              label="Old Pass"
              variant="standard"
              name="temPassword"
              onChange={handleTemPass}
              color="primary"
              InputProps={{
                disableUnderline: true,
              }}
              InputLabelProps={{
                style: {
                  color: "green", // 원하는 색상으로 변경
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
              borderBottom: "2px solid green",
            }}
          >
            <HttpsOutlinedIcon sx={{ color: "green", mt: 2.3 }} />
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
                  color: "green", // 원하는 색상으로 변경
                },
              }}
              sx={{
                ml: 2,
                flex: 8,
              }}
            />
          </Box>
          <p id="passmessage" style={{ color: "green", marginTop: "10px" }}>
            패스워드는 영문 숫자 5~8자리입니다
          </p>
          <br></br>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              borderBottom: "2px solid green",
            }}
          >
            <HttpsOutlinedIcon sx={{ color: "green", mt: 2.3 }} />
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
                  color: "green", // 원하는 색상으로 변경
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
            style={{ color: "green", marginTop: "10px" }}
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
              border: "2px solid green",
              color: "green",
              "&:hover": {
                border: "2px solid green", // 원하는 효과로 수정해주세요
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MyChangePass;
