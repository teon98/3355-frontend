import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../styles/ProfileStyles.css";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import axios from "axios";
import PostDetailModal from "./PostDetailModal";
import { useSelector } from "react-redux";

const ProfilePost = (props) => {
  const userNo = useSelector((state) => state.userNo);
  const [myPosts, setMyPosts] = useState([]);

  const [modalopen, setModalopen] = useState(false);
  //모달창으로 전달할 item
  const [postNo, setPostNo] = useState(0);
  const [postitem, setPostitem] = useState({});

  //모달창 열기
  const handleClickOpen = (item) => {
    //console.log("모달창 열림");
    console.log("item" + item);
    setPostNo(item.post["postNo"]);
    setModalopen(true);
    setPostitem(item);
  };

  //모달창 닫기
  const handleClose = () => {
    setModalopen(false);
  };

  // console.log(props);
  useEffect(() => {
    axios
      .get("/post/my", {
        params: {
          userNo: props.userNo,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setMyPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box>
      <ImageList>
        {myPosts.map((item, index) => {
          //console.log(item.user.userNickname);
          //console.log(item.tags);
          console.log(item);

          //이미지
          const img_string = item.post.postImg.slice(1, -1);
          const img_arr = img_string.split(",");

          //태그
          var tag_list_view = "";
          for (var i = 0; i < item.post.tags.length; i++) {
            var tag_string = item.post.tags[i]["tag"]["tagContent"];

            tag_list_view += "#" + tag_string + " ";
          }

          return (
            <ImageListItem
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => handleClickOpen(item)}
            >
              <img src={img_arr[0]} alt="post_1"></img>
              <ImageListItemBar
                title={tag_list_view}
                subtitle={item.userNickname}
                actionIcon={
                  <IconButton sx={{ color: "white" }}>
                    <Typography variant="body2" mr={"3px"}>
                      {item.goodsCount}
                    </Typography>
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}

        {modalopen && (
          <PostDetailModal
            modalopen={modalopen}
            onClose={handleClose}
            postNo={postNo}
            postItem={postitem}
            myNickname={props.myNickname}
          />
        )}
      </ImageList>
    </Box>
  );
};

export default ProfilePost;
