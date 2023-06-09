import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material";

//폰트 GmarketSans로 지정
const theme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },
  palette: {
    primary: {
      main: "#17B7BD",
    },
  },
});

const LowerNavbar = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(location.pathname);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    navigator(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* cotent가 들어가는 부분 */}
      <Outlet />

      {/* 하단 footer는 고정 */}
      <Paper
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Events"
            value="/event"
            icon={<LocalActivityRoundedIcon />}
          />
          <BottomNavigationAction
            label="Cards"
            value="/home"
            icon={<CreditCardRoundedIcon />}
          />
          <BottomNavigationAction
            label="Community"
            value="/community"
            icon={<GroupsRoundedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  );
};

export default LowerNavbar;
