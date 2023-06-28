import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import defaultImg from "../../images/default.png";
import "../../styles/PostStyles.css";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { Paper } from "@mui/material";
//이미지 carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import axios from "axios";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const PostSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  maxHeight: "70%",
  width: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  overflow: "auto",
};

const PostDetailModal = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  const userNo = useSelector((state) => state.userNo);
  const [comments, setComments] = useState([]);
  //front를 위한 count
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios({
      url: `comment/allComments`,
      method: "get",
      params: {
        postNo: props.postNo,
      },
    })
      .then((res) => {
        console.log(res.data);
        setCount(res.data[0]["commNo"] + 1);
        setComments(res.data.sort());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postImage = props.postItem.post.postImg.slice(1, -1).split(",");
  const tags = props.postItem.post.tags;
  var tagsContent = "";

  for (var i = 0; i < tags.length; i++) {
    tagsContent += "#" + tags[i]["tag"]["tagContent"] + " ";
  }

  //새로 단 댓글
  const [text, setText] = useState("");
  const textRef = useRef();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const commentPost = (e) => {
    if (e.key === "Enter") {
      setCount(count + 1);
      //댓글 객체 생성
      setComments([
        ...comments,
        {
          commContent: text,
          commDate: "지금",
          commNo: count,
          commUser: props.myNickname,
        },
      ]);

      axios({
        url: `/post/addcomments`,
        method: "post",
        params: {
          userNo: userNo,
          postNo: props.postNo,
          commContent: text,
        },
      })
        .then((res) => {
          setText("");
          textRef.current.value = "";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //댓글 정렬하기
  comments.sort((a, b) => {
    return b.commNo - a.commNo;
  });

  return (
    <Modal open={props.modalopen} onClose={props.onClose} maxwidth="xs">
      <Paper sx={style} elevation={3}>
        {/* 프로필 및 메뉴 */}
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <div className="postprofilebox">
            <img
              className="profileImg"
              src={
                !props.postItem.userProfileImg
                  ? defaultImg
                  : props.postItem.userProfileImg
              }
              alt="프로필 이미지"
            />
          </div>
          <Typography>{props.postItem.userNickname}</Typography>
          <Box sx={{ marginLeft: "auto", cursor: "pointer" }}>
            <MoreVertRoundedIcon />
          </Box>
        </Box>
        {/* 사진리스트 */}
        <Box>
          <PostSlider {...settings}>
            {postImage.map((post, index) => (
              <Box key={index}>
                <img src={post} alt="post" width="100%" style={{}} />
              </Box>
            ))}
          </PostSlider>
        </Box>
        {/* 태그와 좋아요 */}
        <Box sx={{ p: 2, display: "flex" }}>
          <Typography variant="body2">{tagsContent}</Typography>
          <Box sx={{ display: "flex", marginLeft: "auto" }}>
            <Typography variant="body2" mr={"3px"}>
              {props.postItem.goodsCount}
            </Typography>
            <FavoriteBorderIcon fontSize="small" />
          </Box>
        </Box>
        <hr />
        {/* 댓글달기창 */}
        <Box sx={{ px: 2, py: 1, display: "flex", alignItems: "center" }}>
          <ForumRoundedIcon fontSize={"0.8rem"} />
          <Typography fontSize={"0.8rem"}>댓글달기</Typography>
          <input
            type="text"
            className="commentinput"
            onChange={handleChange}
            onKeyPress={commentPost}
            ref={textRef}
          />
        </Box>
        <hr />
        {/* 댓글보기창 */}
        <Box>
          {comments.map((comment, index) => {
            let formatDate = comment.commDate;
            formatDate = formatDate.split("T")[0];

            return (
              <Box key={index} sx={{ px: 2, py: 1, display: "flex" }}>
                <Link
                  to={`/community/${comment.commUser}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    className="moveProfile"
                    sx={{ cursor: "pointer" }}
                    fontSize={"0.8rem"}
                    fontWeight={"bold"}
                  >
                    {comment.commUser}
                  </Typography>
                </Link>
                <Typography sx={{ pl: 2 }} fontSize={"0.8rem"}>
                  {comment.commContent}
                </Typography>
                <Typography
                  sx={{ pl: 2, marginLeft: "auto" }}
                  fontSize={"0.8rem"}
                >
                  {formatDate}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Modal>
  );
};

export default PostDetailModal;
