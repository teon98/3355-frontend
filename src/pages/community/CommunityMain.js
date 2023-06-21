import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import MyFollowerList from "../../components/community/MyFollowerList";
import Post from "../../components/community/Post";
import "../../styles/CommunityStyles.css";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },

  palette: {
    primary: {
      main: "#A055FF", //배경색
      contrastText: "#FFFFFF", //글자색
    },
  },
});

const actions = [
  { icon: <AddBoxRoundedIcon />, name: "새글쓰기", path: "/post" },
  { icon: <GridViewRoundedIcon />, name: "전체게시물", path: "/post/all" },
];

const CommunityMain = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "24px" }}>
        <MyFollowerList />

        {/* 새글쓰기, 전체 게시물 보기 */}
        <SpeedDial
          ariaLabel="commMenu"
          sx={{ position: "fixed", bottom: 75, right: 20 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleClick(action.path)}
            />
          ))}
        </SpeedDial>
      </Box>
    </ThemeProvider>
  );
};

export default CommunityMain;
