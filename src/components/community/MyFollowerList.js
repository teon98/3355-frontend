import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

//내가 팔로우 하는 사람들의 LIST
const MyFollowerList = () => {
  const [followlist, setFollowlist] = useState([]);
  const loadPath = process.env.REACT_APP_IMGPATH + "/profile/06/14/";

  useEffect(() => {
    axios
      .get("/commu/followingProfileImgList", {
        params: {
          userNo: 1,
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

  //1. 내 정보가 가져와지는가
  return (
    <Box>
      <p>내가 팔로우 하는 사람들 목록</p>
      {followlist.map((item, index) => (
        <div key={index}>
          <p>{item.nickname}</p>
          <img src={item.profileImg} alt="프로필 이미지" />
        </div>
      ))}
    </Box>
  );
};

export default MyFollowerList;
