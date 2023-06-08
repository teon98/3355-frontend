import React from "react";
import TopNavbar from "../../components/TopNavbar";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <TopNavbar />
      <h1>Card Home 화면입니다.</h1>
      <p>폰트 적용 test GmarketSans 입니까?</p>
      <Box>안녕하세요</Box>
    </Box>
  );
};

export default Home;
