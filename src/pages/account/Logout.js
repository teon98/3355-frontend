import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Logout = () => {
  const navi = useNavigate({});
  //리덕스 변수 가져오기
  const userNo = useSelector((state) => state.userNo);
  const dispatch = useDispatch();

  //로그아웃
  useEffect(() => {
    dispatch({ type: "setUserNo", num: 0 });
    navi("/");
  });
  return <Box></Box>;
};

export default Logout;
