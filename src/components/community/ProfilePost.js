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

const ProfilePost = (props) => {
  const [myPosts, setMyPosts] = useState([]);

  console.log(props);
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
            <ImageListItem key={index}>
              <img src={img_arr[0]} alt="post_1"></img>
              <ImageListItemBar
                title={tag_list_view}
                subtitle={item.post.user.userNickname}
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
    </Box>
  );
};

export default ProfilePost;
