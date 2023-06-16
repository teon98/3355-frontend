import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import defaultImg from "../../images/default.png";
import "../../styles/ProfileStyles.css";
import { Button, Typography } from "@mui/material";

const ProfileEdit = () => {
  const userNo = useSelector((state) => state.userNo);

  const [myprofile, setMyprofile] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const [levelStyle, setLevelStyle] = useState("");

  const [profileImg, setProfileImg] = useState("");
  const profileImgRef = useRef();

  //!myprofile.profileImg ? defaultImg : myprofile.profileImg;
  //기존 user 정보 가져오기
  useEffect(() => {
    console.log("1");
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
        setProfileImg(
          !res.data.profileVO.profileImg
            ? defaultImg
            : res.data.profileVO.profileImg
        );
        setLevelStyle(level.slice(0, -1));
        console.log(res.data.profileVO);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //업로드된 이미지 미리보기
  const handleChange = () => {
    const file = profileImgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImg(reader.result);
    };
  };

  const handleClick = (e) => {
    console.log("click");
  };

  return (
    <Box>
      <div className="box">
        <img className="profileImg" src={profileImg} alt="프로필 이미지" />
      </div>
      <input type="file" onChange={handleChange} ref={profileImgRef}></input>
      <Button variant="contained" onClick={handleClick}>
        확인
      </Button>
    </Box>
  );
};

export default ProfileEdit;
