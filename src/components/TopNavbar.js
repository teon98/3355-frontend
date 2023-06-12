import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import HeadLogo from "../images/HeadLogo_3355.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const GradientAppBar = styled(AppBar)`
  background: linear-gradient(360deg, #17b7bd 4.53%, #7cde9d 75.31%);
`;

const TopNavbar = () => {
  return (
    <Box>
      <GradientAppBar position="static">
        <Toolbar sx={{ minHeight: "64px" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <Box>
              <img src={HeadLogo} alt="탑 Nav바 LOGO" />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="large" aria-label="알림창">
              <NotificationsIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton size="large" aria-label="내 프로필">
              <AccountCircleIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </GradientAppBar>
    </Box>
  );
};

export default TopNavbar;
