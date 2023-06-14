import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

//내가 팔로우 하는 사람들의 LIST
const MyFollowerList = () => {
  const [followlist, setFollowlist] = useState([]);

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

  const [img, setImg] = useState();

  const handleChange = (e) => {
    console.log(e.target.files);
    setImg(e.target.files);
  };

  const handleClick = () => {
    console.log(img + "클릭 중");

    var data = new FormData();

    //이미지 넣기
    for (let i = 0; i < img.length; i++) {
      data.append("files", img[i]);
    }

    //경로 넣어주기
    data.append("defaultpath", process.env.REACT_APP_IMGPATH);
    data.append("path", "profile");

    axios
      .post("/uploadImg", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };
  //1. 내 정보가 가져와지는가
  return (
    <Box>
      <p>내가 팔로우 하는 사람들 목록</p>
      {/* {followlist.map((i) => (
        <p>{i.nickname}</p>
      ))} */}

      <input type="file" onChange={handleChange}></input>
      <button type="button" onClick={handleClick}>
        제출
      </button>
    </Box>
  );
};

export default MyFollowerList;
