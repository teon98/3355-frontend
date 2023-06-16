import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadTest = () => {
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

  return (
    <div>
      <input type="file" onChange={handleChange}></input>
      <button type="button" onClick={handleClick}>
        제출
      </button>
    </div>
  );
};

export default UploadTest;
