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
const Logout = () => {
  const navi = useNavigate({});
  //리덕스 변수 가져오기
  const userNo = useSelector((state) => state.userNo);
  const dispatch = useDispatch();

  //로그아웃 버튼
  const handleLogout = (e) => {
    dispatch({ type: "setUserNo", num: 0 });
    console.log(userNo);
    navi("/");
  };

  return (
    <Box>
      <button
        id="logoutBtn"
        type="button"
        className="btn btn-default"
        onClick={handleLogout}
      >
        로그아웃 버튼
      </button>
    </Box>
  );
};

export default Logout;
