import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultImg from "../../images/default.png";
import { Box, height, width } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import "../../styles/ProfileStyles.css";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";

const Profile = () => {
  const userNo = useSelector((state) => state.userNo);

  const [myprofile, setMyprofile] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const [levelStyle, setLevelStyle] = useState("");

  useEffect(() => {
    console.log(userNo);
    axios
      .get("/profile", {
        params: {
          userNo: userNo,
        },
      })
      .then((res) => {
        let level = res.data.profileVO.profileLevel;
        setMyprofile(res.data.profileVO);
        setUserNickname(res.data.userNickname);
        setLevelStyle(level.slice(0, -1));
        console.log(res.data.profileVO);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
  );
};

export default Profile;
