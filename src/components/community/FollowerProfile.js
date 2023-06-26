import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import { Avatar, Typography } from "@mui/material";
import defaultImg from "../../images/default.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const FollowerProfile = () => {
  const params = useParams();

  const [profileImg, setProfileImg] = useState("");
  const [profileAbout, setProfileAbout] = useState("");
  const [profileLevel, setProfileLevel] = useState("");
  const [levelStyle, setLevelStyle] = useState("");

  console.log(params.memberNickName);
  useEffect(() => {
    axios
      .get("/commu/profile", {
        params: {
          userNickname: params.memberNickName,
        },
      })
      .then((res) => {
        let level = res.data.profileLevel;
        setProfileImg(res.data.profileImg);
        setProfileLevel(res.data.profileLevel);
        setLevelStyle(level.slice(0, -1));
        setProfileAbout(res.data.profileAbout);
        console.log(res.data);
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
          src={!profileImg ? defaultImg : profileImg}
          alt="프로필 이미지"
        />
      </div>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box className={[levelStyle, "levelborder"]}>
            <MilitaryTechRoundedIcon fontSize="0.8rem" />
          </Box>
          <Typography color="#7A7A7A" sx={{ fontSize: "0.8rem" }}>
            {profileLevel}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: "1.3rem" }}>
          {params.memberNickName}
        </Typography>
        <Typography color="#323232" sx={{ fontSize: "0.9rem" }}>
          {!profileAbout || profileAbout === "null" ? "" : profileAbout}
        </Typography>
      </Box>
    </Box>
  );
};

export default FollowerProfile;
