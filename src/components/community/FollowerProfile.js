import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import { Avatar, Typography } from "@mui/material";
import defaultImg from "../../images/default.png";
import axios from "axios";

const FollowerProfile = () => {
  const [myprofile, setMyprofile] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const [levelStyle, setLevelStyle] = useState("");

  return (
    <Box>
      <Box sx={{ display: "flex", my: "20px" }}>
        <div className="box" style={{ marginRight: "24px" }}>
          <img
            className="profileImg"
            src={!myprofile.profileImg ? defaultImg : myprofile.profileImg}
            alt="프로필 이미지"
          />
        </div>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box className={[levelStyle, "levelborder"]}>
              <MilitaryTechRoundedIcon fontSize="0.8rem" />
            </Box>
            <Typography color="#7A7A7A" sx={{ fontSize: "0.8rem" }}>
              {myprofile.profileLevel}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: "1.3rem" }}>{userNickname}</Typography>
          <Typography color="#323232" sx={{ fontSize: "0.9rem" }}>
            {myprofile.profileAbout}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FollowerProfile;
