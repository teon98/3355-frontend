import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  SpeedDial,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/all.css";
import PostDetailModal from "./PostDetailModal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import BackNavbar2 from "../common/BackNavbar2";

const All = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "GmarketSans",
    },

    palette: {
      primary: {
        main: "#53E2E8", //배경색
        contrastText: "#FFFFFF", //글자색
      },
    },
  });
  //tag 스타일 변경
  const tagRef = useRef();

  const backPallete = [
    "#FFDDE0",
    "#DDFFF7",
    "#FFFDCD",
    "#D3F4BF",
    "#E8DDFF",
    "#BFD7F4",
    "#F4DCBF",
  ];
  const colorPallete = [
    "#D95762",
    "#577BD9",
    "#D0931F",
    "#3F7E19",
    "#7957D9",
    "#404BB5",
    "#C96304",
  ];

  //tag 불러오자!
  const [tagList, setTagList] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  var [origin, setOrigin] = useState([]);

  useEffect(() => {
    //tag list get
    axios({
      method: "get",
      url: "/commu/tagListHighTen",
    })
      .then((res) => {
        //console.log(res.data);
        setTagList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //post list get
    axios({
      method: "get",
      url: "/post/loadAllPost",
    })
      .then((res) => {
        console.log(res.data);
        setOrigin(res.data);
        setAllPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function containsObject(obj, array) {
    for (let i = 0; i < array.length; i++) {
      if (JSON.stringify(array[i]["tag"]) === JSON.stringify(obj)) {
        //console.log(JSON.stringify(array[i]["tag"]) === JSON.stringify(obj));
        return true;
      }
      console.log(JSON.stringify(array[i]["tag"]) === JSON.stringify(obj));
    }
    return false;
  }

  const handletagfilter = (tagname) => {
    // console.log(tagname.tagContent);
    // console.log(allPosts);
    //console.log("응애", allPosts[0].post.tags);
    const filterData = origin.filter((allpost) =>
      containsObject(tagname, allpost.post.tags)
    );
    setAllPosts(filterData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mx: "24px", pt: "24px", pb: "70px" }}>
        {/* 태그 리스트 */}
        <Box>
          <input
            type="button"
            value="🔥HOT 게시물"
            className="tagButton"
            onClick={() => setAllPosts(origin)}
          />
          {tagList.map((item, index) => {
            const dynamicStyle = {
              background: backPallete[index % 7],
              color: colorPallete[index % 7],
            };
            return (
              <input
                key={index}
                type="button"
                value={"#" + item.tagContent}
                style={dynamicStyle}
                className="tagButton"
                onClick={() => handletagfilter(item, item.tagContent)}
              />
            );
          })}
        </Box>

        {/* 이미지 리스트 */}
        <ImageList>
          {allPosts.map((item, index) => {
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
              //myNickname={props.myNickname}
            />
          )}
        </ImageList>

        {/* SpeedDial 부분 */}
        <SpeedDial
          ariaLabel="commMenu"
          sx={{ position: "fixed", bottom: 75, right: 20 }}
          icon={<ArrowUpwardRoundedIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        ></SpeedDial>
      </Box>
    </ThemeProvider>
  );
};

export default All;
