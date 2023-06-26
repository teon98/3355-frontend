import { Box } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import Profile from "../../components/community/Profile";
import MyDays from "../../components/myPage/MyDays";
import StampBtn from "../../components/myPage/StampBtn";
import { useSelector } from "react-redux";
import axios from "axios";
import CardCustomBtn from "../../components/myPage/CardCustomBtn";
import MyCouponBtn from "../../components/myPage/MyCouponBtn";
import ChangePass2Btn from "../../components/myPage/ChangePass2Btn";
import WithdrawBtn from "../../components/myPage/WithdrawBtn";
import { useNavigate } from "react-router-dom";

const MyContext = createContext();
const Mypage = () => {
  // 유저 정보들
  const userNo = useSelector((state) => state.userNo);
  const [userWork, setUserWork] = useState();
  const [userStamp, setUserStamp] = useState();
  const navi = useNavigate({});

  //로그인이 안되있으면 메인페이지로 돌아감
  useEffect(() => {
    if (userNo === 0) {
      navi("/");
    }
  });

  //운동일자
  useEffect(() => {
    axios({
      url: `/my/workday.sam`,
      method: "get",
      params: { userNo: userNo },
    })
      .then((res) => {
        setUserWork(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //출석일자
  useEffect(() => {
    axios({
      url: `/my/stampday.sam`,
      method: "get",
      params: { userNo: userNo },
    })
      .then((res) => {
        setUserStamp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ px: "24px" }}>
      <MyContext.Provider
        value={{
          userNo,
          userWork,
          setUserWork,
          userStamp,
          setUserStamp,
        }}
      >
        <Profile />
        <MyDays />
        <br></br>
        <StampBtn />
        <CardCustomBtn />
        <MyCouponBtn />
        <ChangePass2Btn />
        <WithdrawBtn />
      </MyContext.Provider>
    </Box>
  );
};

export { Mypage as default, MyContext };
