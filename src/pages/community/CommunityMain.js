import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyFollowerList from "../../components/community/MyFollowerList";
import Post from "../../components/community/Post";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostNew from "../../components/community/PostNew";
import { useSelector } from "react-redux";
import axios from "axios";
import FollowerAllPost from "../../components/community/FollowerAllPost";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

const theme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },

  palette: {
    primary: {
      main: "#53E2E8", //배경색
      contrastText: "#FFFFFF", //글자색
    },
  },
});

const CommunityMain = () => {
  //현재 로그인한 사용자 정보 불러오기
  const userNo = useSelector((state) => state.userNo);

  //전체 게시물 페이지로 이동
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const [myImg, setMyImg] = useState("");
  const [myNickname, setMyNickname] = useState("");

  //내 프로필 이미지를 너무 많이 불러와서 page에서 불러오는 logic 추가
  //props로 하위 컴포넌트에게 전달
  //내 프로필
  useEffect(() => {
    axios
      .get("/commu/userProfile", {
        params: {
          userNo: userNo,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMyImg(res.data.profile);
        setMyNickname(res.data.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userNo]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "24px", pb: "70px" }}>
        <MyFollowerList myprofile={myImg} />
        <PostNew myImg={myImg} myNickname={myNickname} />

        {/* SpeedDial 부분 */}
        <SpeedDial
          ariaLabel="commMenu"
          sx={{ position: "fixed", bottom: 75, right: 20 }}
          icon={<ArrowUpwardRoundedIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        ></SpeedDial>
      </Box>
    </ThemeProvider>
  );
};

export default CommunityMain;
