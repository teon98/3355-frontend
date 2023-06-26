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
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import HeadLogo from "../../images/HeadLogo_3355.svg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "../../styles/MainCSS/TopNavbar.css";

import HomeIcon from "@mui/icons-material/Home";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BarcodeDialog from "../BarcodeDialog";

const GradientAppBar = styled(AppBar)`
  background: linear-gradient(360deg, #17b7bd 4.53%, #7cde9d 75.31%);
`;

const TopNavbar = () => {
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [badgeCnt, setBadgeCnt] = useState(0);

  const userNo = useSelector((state) => state.userNo); // 리덕스 변수 사용하기
  const location = useLocation();

  useEffect(() => {
    axios({
      url: "/home/alarm-count",
      method: "get",
      params: { userNo: userNo },
    })
      .then((response) => {
        console.log(response);
        setBadgeCnt(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

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
      <MenuItem onClick={handleNavigate} data-name="/auth/logout">
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sidebar = (
    <Drawer anchor="left" open={isSidebarOpen} onClose={closeSidebar}>
      <Box className="drawerContent">
        <List>
          <Link to="/home" className="link" onClick={closeSidebar}>
            <ListItem className="headIcon">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="My Card" />
            </ListItem>
          </Link>

          <ListItem>
            <ListItemText primary="결제 바로가기" onClick={handleClickOpen} />
            <BarcodeDialog open={open} handleClose={handleClose} />
          </ListItem>

          <Link
            to="/home/payment"
            className="link"
            onClick={closeSidebar}
            onClose={closeSidebar}
          >
            <ListItem>
              <ListItemText primary="결제 내역 확인하기" />
            </ListItem>
          </Link>
          <Link to="/home/point" className="link" onClick={closeSidebar}>
            <ListItem>
              <ListItemText primary="포인트 내역 확인하기" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/event" className="link" onClick={closeSidebar}>
            <ListItem>
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItem>
          </Link>
          <Link
            to="/event"
            sx={{ fontSize: "3px" }}
            className="link"
            onClick={closeSidebar}
          >
            <ListItem>
              <ListItemText primary="이벤트 목록 확인하기" />
            </ListItem>
          </Link>
          <Link to="/event" className="link" onClick={closeSidebar}>
            <ListItem>
              <ListItemText primary="출석체크" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/community" className="link" onClick={closeSidebar}>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Community" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/mypage" className="link" onClick={closeSidebar}>
            <ListItem>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Mypage" />
            </ListItem>
          </Link>
        </List>
        <Box className="drawerFooter">
          <Divider />
          <Link to="/auth/logout" className="link" onClick={closeSidebar}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="로그아웃" />
              </ListItem>
            </List>
          </Link>
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Box id="top-nav-bar">
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
            <Link to="../alarm">
              <IconButton size="large" aria-label="알림창">
                {/* 알림 숫자 표시 - badgeContent 안에서 설정 */}
                <Badge badgeContent={badgeCnt} color="error">
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Link>
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
