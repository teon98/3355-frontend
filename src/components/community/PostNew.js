import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import postst from "../../styles/CommunityStyles.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import FollowerAllPost from "./FollowerAllPost";

const PostNew = (myprofile) => {
  const userNo = useSelector((state) => state.userNo);

  const [inputTag, setInputTag] = useState("");
  const [tagArray, setTagArray] = useState([]);
  const [imageArray, setImageArray] = useState([]);

  //이미지 배열
  const imagesRef = useRef();

  //태그 생성 버튼 이벤트
  const tagCreate = () => {
    setTagArray([...tagArray, inputTag]);
    setInputTag("");
    console.log(inputTag);
  };

  const handleChange = (e) => {
    setInputTag(e.target.value);
  };

  //업로드된 이미지 미리보기
  const [viewImage, setViewImage] = useState([]);
  const uploadImgChange = (e) => {
    //console.log(imagesRef.current.files);

    let imageView = [];
    let imageView2 = [];
    for (var i = 0; i < imagesRef.current.files.length; i++) {
      imageView.push(imagesRef.current.files[i]);

      let file = imagesRef.current.files[i];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        imageView2.push(reader.result);
        setViewImage(imageView2);
      };
    }
    console.log(imageView);
    setImageArray(imageView); //post보낼 image

    //미리보기할 image
  };

  //enterKey 눌러도 태그 생성되도록 추가
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      tagCreate();
    }
  };

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

  const tagstyled = {
    borderRadius: "20px",
    padding: "5px 20px",
    textAlign: "center",
    width: "fit-content",
    margin: "5px",
    display: "inline-block",
    fontSize: "0.7rem",
    cursor: "pointer",
  };

  const removeTag = (index) => {
    const removeTag = [...tagArray];
    removeTag.splice(index, 1);
    setTagArray(removeTag);
  };

  //게시물
  const [followerPosts, setFollowerPosts] = useState([]);

  const postSubmit = useCallback(() => {
    //formData 생성
    var formData = new FormData();
    for (var i = 0; i < imageArray.length; i++) {
      formData.append("postImgs", imageArray[i]);
    }

    formData.append("userNo", userNo);
    for (var i = 0; i < tagArray.length; i++) {
      formData.append("tagList", tagArray[i]);
    }

    function loadPost(userNo) {
      axios
        .get("/post/main", {
          params: {
            userNo: userNo,
          },
        })
        .then((res) => {
          console.log(res.data);
          setFollowerPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    axios
      .post("/post/newpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("post 성공!");
        setTagArray([]);
        setImageArray([]);
        setViewImage([]);
        loadPost(userNo);
      })
      .catch((err) => {
        console.log(err);
        alert("입력이 잘못되었습니다.");
      });
  });

  useEffect(() => {
    axios
      .get("/post/main", {
        params: {
          userNo: userNo,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFollowerPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          background: "white",
          my: "18px",
          borderRadius: "20px",
        }}
        className={postst.postnew}
      >
        <div className={postst.inputHead}>
          <div className={postst.profileHead}>
            <div className={postst.box}>
              <img
                className={postst.profileImg}
                src={myprofile.myImg}
                alt="내 프로필 이미지"
              />
            </div>
            <div className={postst.name}>{myprofile.myNickname}</div>
          </div>
          <div>
            <div className={postst.taginputhead}>
              <input
                type="text"
                placeholder="원하는 태그명을 입력하세요"
                value={inputTag}
                onChange={handleChange}
                className={postst.taginput}
                onKeyPress={handleOnKeyPress}
              />
              <input
                type="button"
                value="버튼생성"
                onClick={tagCreate}
                className={postst.createTagbutton}
              />
            </div>
            <div className={postst.tagbody}>
              {tagArray.map((item, index) => {
                const dynamicStyle = {
                  background: backPallete[index % 7],
                  color: colorPallete[index % 7],
                };

                const combineStyle = { ...dynamicStyle, ...tagstyled };
                return (
                  <div
                    key={index}
                    ref={tagRef}
                    style={combineStyle}
                    onClick={() => removeTag(index)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 이미지 업로드 */}
        <div className={postst.inputFooter}>
          <label htmlFor="viewFile">
            <div className={postst.viewButton}>
              <AddPhotoAlternateIcon />
            </div>
          </label>
          <input
            name="viewFile"
            id="viewFile"
            type="file"
            multiple
            onChange={uploadImgChange}
            ref={imagesRef}
            className={postst.viewFile}
          />
          <div className={postst.preview}>
            {viewImage.map((image, index) => (
              <div key={index} className={postst.previewItem}>
                <img src={image} alt="이미지" width="35px" height="35px" />
              </div>
            ))}
          </div>
          <input
            onClick={postSubmit}
            className={postst.submitButton}
            type="button"
            value="등록"
          />
        </div>
      </Box>
      <FollowerAllPost userNo={userNo} followerPosts={followerPosts} />
    </>
  );
};

export default PostNew;
