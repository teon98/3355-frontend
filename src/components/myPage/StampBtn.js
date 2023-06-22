import { Box, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../../styles/ProfileStyles.css";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import { MyContext } from "../../pages/mypage/Mypage";

//버튼모양
const EditButton = styled(Button)({
  background: "#A055FF",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  "&:hover": {
    background: "#672AB5",
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

const StampBtn = () => {
  //유저 정보들
  const userNo = useSelector((state) => state.userNo);
  const { userStamp, setUserStamp } = useContext(MyContext);

  // 출석체크
  const handleStamp = () => {
    console.log(userNo);
    axios({
      url: `/my/stamp.sam`,
      method: "post",
      params: { userNo: userNo },
    })
      .then((res) => {
        if (res.data === "성공") {
          setUserStamp(userStamp + 1);
          //출석성공
          Toast.fire({
            icon: "success",
            title: "출석이 완료되었습니다.",
          });
        } else {
          //출석실패
          Toast.fire({
            icon: "error",
            title: "이미 출석을 하셧습니다.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <EditButton variant="contained" onClick={handleStamp}>
        출석체크
      </EditButton>
    </Box>
  );
};

export default StampBtn;
