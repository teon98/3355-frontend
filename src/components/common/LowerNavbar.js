import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import BarcodeDialog from "../BarcodeDialog";
import CropFreeIcon from "@mui/icons-material/CropFree";

// 폰트 GmarketSans로 지정
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
  const [open, setOpen] = useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    navigator(newValue);
  };

  const handleBarcodeScan = () => {
    setOpen(true);
  };

  const handleBarcodeScanComplete = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  let navigationComponent;

  if (location.pathname === "/home") {
    navigationComponent = (
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Events"
          value="/event"
          icon={<LocalActivityRoundedIcon />}
        />
        <BottomNavigationAction
          label="Barcode"
          value="/home"
          icon={<CropFreeIcon sx={{ color: "#666666", fontSize: 32 }} />}
          onClick={handleBarcodeScan}
        />
        <BottomNavigationAction
          label="Community"
          value="/community"
          icon={<GroupsRoundedIcon />}
        />
      </BottomNavigation>
    );
  } else {
    navigationComponent = (
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
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          {navigationComponent}
        </Paper>
        {open && (
          <BarcodeDialog open={open} handleClose={handleBarcodeScanComplete} />
        )}
      </ThemeProvider>
    </>
  );
};

export default LowerNavbar;
