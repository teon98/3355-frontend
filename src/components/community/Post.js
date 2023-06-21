import { Box } from "@mui/material";
import React from "react";
import defaultImg from "../../images/default.png";

const Post = () => {
  return (
    <Box>
      <Box>
        <Box>
          <img src={defaultImg} alt="프로필 이미지" />
          <Box>
            <textarea placeholder="#을 붙이면 자동으로 태그가 만들어 집니다." />
            <input type="button" value="태그생성" />
          </Box>
        </Box>
      </Box>
      <Box>
        <button>사진</button>
        <input type="button" value="등록"></input>
      </Box>
    </Box>
  );
};

export default Post;
