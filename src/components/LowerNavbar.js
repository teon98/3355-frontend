import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const [value, setValue] = useState("recents");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/* cotent가 들어가는 부분 */}
      <Outlet />

      {/* 하단 footer는 고정 */}

      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<FolderIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default Navbar;
