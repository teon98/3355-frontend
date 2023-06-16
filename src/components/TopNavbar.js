import {
  AppBar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import HeadLogo from "../images/HeadLogo_3355.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "../styles/MainCSS/TopNavbar.css";

const GradientAppBar = styled(AppBar)`
  background: linear-gradient(360deg, #17b7bd 4.53%, #7cde9d 75.31%);
`;

const TopNavbar = () => {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMenuOpen = Boolean(profileMenuAnchor);

  const profileId = "primary-search-account-menu";

  const handleMenuOpen = (e) => {
    setProfileMenuAnchor(e.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const navigator = useNavigate();

  // 메뉴 아이템으로 이동
  const handleNavigate = (e) => {
    // console.log(e.target.dataset.name);
    navigator(e.target.dataset.name);
  };

  const profileMenu = (
    <Menu
      anchorEl={profileMenuAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={profileId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleNavigate} data-name="/mypage">
        <PersonIcon sx={{ mr: "10px" }} />
        마이페이지
      </MenuItem>
      <MenuItem onClick={handleNavigate} data-name="/home">
        <SettingsRoundedIcon sx={{ mr: "10px" }} />
        카드 관리
      </MenuItem>
      <MenuItem onClick={handleNavigate} data-name="/logout">
        <LogoutRoundedIcon sx={{ mr: "10px" }} />
        로그아웃
      </MenuItem>
    </Menu>
  );

  const SideBarButtonClick = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const sidebar = (
    <Drawer anchor="left" open={isSidebarOpen} onClose={closeSidebar}>
      <Box className="drawerContent">
        <List>
          <ListItem button onClick={handleNavigate} data-name="/home">
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="My Card" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleNavigate}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Event" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleNavigate}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Community" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleNavigate}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        </List>
        <Box className="drawerFooter">
          <Divider />
          <List>
            <ListItem button onClick={handleNavigate} data-name="/logout">
              <ListItemIcon>
                <LogoutRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="로그아웃" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );

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
            onClick={SideBarButtonClick}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <Box>
              <img src={HeadLogo} alt="탑 Nav바 로고" />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="large" aria-label="알림창">
              {/* 알림 숫자 표시 - badgeContent 안에서 설정 */}
              <Badge badgeContent={5} color="error">
                <NotificationsIcon sx={{ color: "white" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="내 프로필"
              aria-controls={profileId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </GradientAppBar>
      {profileMenu}
      {sidebar}
    </Box>
  );
};

export default TopNavbar;
