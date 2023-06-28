import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import defaultImg from "../../images/default.png";
import { Link, useNavigate } from "react-router-dom";

const MyFollowerList = (myprofile) => {
  const userNo = useSelector((state) => state.userNo);
  const [followlist, setFollowlist] = useState([]);

  //팔로워 목록 가져오기
  useEffect(() => {
    axios
      .get("/commu/followingProfileImgList", {
        params: {
          userNo: userNo,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFollowlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigator = useNavigate();

  const handleClick = (e) => {
    console.log(e.target.name);
    if (e.target.name === "myProfile") {
      navigator("/community/profileHome");
    }
  };

  //1. 내 정보가 가져와지는가
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ overflow: "auto", whiteSpace: "nowrap", my: "10px" }}
      className="scroll"
    >
      <div className="profileBox">
        <div
          className="box"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <img
            name="myProfile"
            className="profileImg"
            src={!myprofile.myprofile ? defaultImg : myprofile.myprofile}
            alt="프로필 이미지"
          />
        </div>
        <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#838282" }}>
          내 프로필
        </p>
      </div>

      {followlist.map((item, index) => (
        <div className="profileBox" key={index}>
          <div className="foloowbox">
            <Link to={`/community/${item.nickname}`}>
              <img
                className="profileImg"
                src={!item.profileImg ? defaultImg : item.profileImg}
                alt="프로필 이미지"
              />
            </Link>
          </div>
          <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
            {item.nickname}
          </p>
        </div>
      ))}
    </Stack>
  );
};

export default MyFollowerList;
