import { Box, color } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Modal, Typography } from "@mui/material";
import PostDetailModal from "./PostDetailModal";

const FollowerAllPost = (props) => {
  //모달창 state
  const [modalopen, setModalopen] = useState(false);
  //모달창으로 전달할 item
  const [postItem, setPostItem] = useState({});

  //모달창 열기
  const handleClickOpen = (item) => {
    console.log("모달창 열림");
    setPostItem(item);
    setModalopen(true);
  };

  //모달창 닫기
  const handleClose = () => {
    setModalopen(false);
  };

  return (
    <Box>
      <ImageList>
        {props.followerPosts.map((item, index) => {
          //console.log(item);
          //console.log("tags", item.post.tags);
          //console.log("length", item.post.tags.length);
          var tag_list_view = "";
          for (var i = 0; i < item.post.tags.length; i++) {
            //console.log(item.post.tags[i]);
            var tag_string = item.post.tags[i]["tag"]["tagContent"];

            tag_list_view += "#" + tag_string + " ";
          }
          //console.log("tags", tag_list);
          const img_string = item.post.postImg.slice(1, -1);
          const img_arr = img_string.split(",");

          return (
            <ImageListItem
              key={index}
              onClick={() => handleClickOpen(item)}
              sx={{ cursor: "pointer" }}
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
      </ImageList>

      {modalopen && (
        <PostDetailModal
          modalopen={modalopen}
          onClose={handleClose}
          postItem={postItem}
        />
      )}
    </Box>
  );
};

export default FollowerAllPost;
