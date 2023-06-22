import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import defaultImg from "../../images/default.png";
import "../../styles/ProfileStyles.css";
import { Button, Typography } from "@mui/material";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const auththeme = createTheme({
  typography: {
    fontFamily: "GmarketSans",
  },

  palette: {
    primary: {
      main: "#FFFFFF", //배경색
      contrastText: "#17B7BD", //글자색
    },
    secondary: {
      main: "#17B7BD", //배경색
      contrastText: "#FFFFFF", //글자색
    },
  },
});

const ProfileEdit = () => {
  const userNo = useSelector((state) => state.userNo);

  const [myprofile, setMyprofile] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const [levelStyle, setLevelStyle] = useState("");

  const [profileImg, setProfileImg] = useState("");
  const [file, setFile] = useState(null);
  const profileImgRef = useRef();
  const [profileAbout, setProfileAbout] = useState("");

  //!myprofile.profileImg ? defaultImg : myprofile.profileImg;
  //기존 user 정보 가져오기
  useEffect(() => {
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
        setProfileAbout(res.data.profileVO.profileAbout);
        console.log(res.data.profileVO);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //업로드된 이미지 미리보기
  const handleChange = (e) => {
    //console.log(e.target.name);
    if (e.target.name === "file") {
      const file = profileImgRef.current.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(() => {
          console.log(file);
          return reader.result;
        });
      };
    } else if (e.target.name === "about") {
      setProfileAbout(() => {
        console.log(e.target.value);
        return e.target.value;
      });
    }
  };

  //프로필 수정하기(post)
  const handleClick = () => {
    //formData 생성
    var formData = new FormData();
    formData.append("profileImg", file);
    formData.append("userNo", userNo);
    formData.append("profileAbout", profileAbout);

    axios
      .patch("/profile/s3upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ px: "24px", my: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box className={[levelStyle, "levelborder"]}>
            <MilitaryTechRoundedIcon fontSize="0.8rem" />
          </Box>
          <Typography color="#7A7A7A" sx={{ fontSize: "0.8rem" }}>
            {myprofile.profileLevel}
          </Typography>
        </Box>
        <div
          className="box"
          style={{ marginTop: "15px", marginBottom: "15px" }}
        >
          <img className="profileImg" src={profileImg} alt="프로필 이미지" />
        </div>
        <label htmlFor="file">
          <p id="fileuploadtext">사진 수정하기</p>
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleChange}
          ref={profileImgRef}
        ></input>
      </Box>

      {/* gird로 css */}
      <div id="editTable">
        <div id="editTableRow">
          <div className="padding center">name</div>
          <div className="padding">
            <input
              type="text"
              className="input"
              value={userNickname}
              readOnly
            />
          </div>
        </div>
        <div id="editTableRow">
          <div className="padding center">about</div>
          <div className="padding">
            <input
              type="text"
              className="input"
              placeholder={!myprofile.profileAbout ? "소개글을 작성하세요" : ""}
              value={profileAbout}
              onChange={handleChange}
              name="about"
            />
          </div>
        </div>
      </div>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleClick}>
          확인
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEdit;
