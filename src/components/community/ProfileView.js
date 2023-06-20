import { Box } from "@mui/material";
import React from "react";
import "../../styles/ProfileStyles.css";

const ProfileView = () => {
  return (
    <Box
      sx={{
        display: "flex",
        fontFamily: "GmarketSans",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <p className="title">100</p>
        <p className="sub">likes</p>
      </Box>
      <div class="boundary"></div>
      <Box>
        <p className="title">10</p>
        <p className="sub">Posts</p>
      </Box>
      <div class="boundary"></div>
      <Box>
        <p className="title">200</p>
        <p className="sub">Following</p>
      </Box>
      <div class="boundary"></div>
      <Box>
        <p className="title">200</p>
        <p className="sub">Follow</p>
      </Box>
    </Box>
  );
};

export default ProfileView;
