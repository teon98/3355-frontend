import { Box, Button, TextField } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import { ChromePicker, GithubPicker } from "react-color";
import "../../styles/MainCSS/CardAni.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import magImage from "../../images/CardImg/mag.png";
import masterImage from "../../images/CardImg/mastercard.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//context api
const CustomContext = createContext();

//커스텀 성공시 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center-center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

const CardCustom = () => {
  //유저 정보
  const userNo = useSelector((state) => state.userNo);
  const [color1, setColor1] = useState(""); //1색
  const [color2, setColor2] = useState(""); //2색
  const [color3, setColor3] = useState(""); //글씨 색
  const [cardCode, setCardCode] = useState(""); //유저의 카드번호
  const [userNick, setUserNick] = useState(""); //유저 닉
  const [retter, setRetter] = useState(" "); //글씨
  const navi = useNavigate({});

  //카드 번호 닉네임가져오기
  useEffect(() => {
    axios({
      url: "/home/cardCodeNick",
      params: { userNo: userNo },
      method: "get",
    })
      .then((response) => {
        console.log(response.data);
        setCardCode(response.data.cardCode);
        setUserNick(response.data.userNick);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //카드 커스텀 가져오기
  useEffect(() => {
    axios({
      url: `/my/getcustom.sam`,
      method: "get",
      params: { userNo: userNo },
    })
      .then((res) => {
        setColor1(res.data.customColor1);
        setColor2(res.data.customColor2);
        setRetter(res.data.customLettering);
        setColor3(res.data.customColor3);
        const el = document.getElementsByClassName("front");
        for (let i = 0; i < el.length; i++) {
          //색깔설정~
          el[i].style.background =
            "linear-gradient(to right," +
            res.data.customColor1 +
            " , " +
            res.data.customColor2 +
            ")";
          el[i].style.color = "white";
          el[i].style.zIndex = "9999";
        }
        const el2 = document.getElementById("ret"); //글씨설정
        el2.innerHTML = retter;
        el2.style.color = color3;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //카드 커스텀 바뀔때마다 가져오기
  useEffect(() => {
    const el = document.getElementsByClassName("front");
    for (let i = 0; i < el.length; i++) {
      el[i].style.background =
        "linear-gradient(to right," + color1 + " , " + color2 + ")";
      el[i].style.color = "white";
      el[i].style.zIndex = "9999";
      el[i].style.position = "relative";
    }
    const el2 = document.getElementById("ret");
    el2.innerHTML = retter;
    el2.style.color = color3;
  }, [color1, color2, color3, retter]);

  // 카드 뒤집기 애니메이션
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 바코드 생성
  const [imageUrl, setImageUrl] = useState("");
  const barcodeNumber = `185382543520 `; // 바코드 번호에 가게 정보 포함.

  useEffect(() => {
    const generateBarcode = () => {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, barcodeNumber, { height: 50, displayValue: false });
      setImageUrl(canvas.toDataURL("image/png"));
    };
    generateBarcode();
  }, [barcodeNumber]);

  //색깔 1 지정
  const handleChangeComplete1 = (e) => {
    setColor1(e.hex);
  };

  //색갈2 지정
  const handleChangeComplete2 = (e) => {
    setColor2(e.hex);
  };
  //색갈3 지정
  const handleChangeComplete3 = (e) => {
    setColor3(e.hex);
  };

  //레터링 지정
  const handleRetter = (e) => {
    const intext = e.target.value;
    if (intext.length <= 5) {
      setRetter(e.target.value);
    }
  };

  //제출
  const handleInsert = () => {
    axios({
      url: `/my/postcustom.sam`,
      method: "post",
      params: {
        userNo: userNo,
        customColor1: color1,
        customColor2: color2,
        customLettering: retter,
        customColor3: color3,
      },
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: "카드 커스텀이 완료되었습니다.",
        });
        setTimeout(() => {
          navi("/mypage");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ px: "24px" }}>
      <Box className="allcard">
        <Box
          className={`card ${isFlipped ? "is-flipped" : ""}`}
          onClick={handleClick}
        >
          <Box class="front">
            <h3>SamSam</h3>
            <Box>
              <Box className="magicon">
                <ArrowBackIosRoundedIcon
                  className="leftIcon"
                  size="24"
                  color="gray"
                />
                <img src={magImage} className="magimg" alt="마그네틱이미지" />
              </Box>
            </Box>
            <Box className="cardNomaster">
              <Box className="cardNo">{userNick}</Box>
              <img
                src={masterImage}
                className="masterimg"
                alt="마스터카드로고"
              />
            </Box>
            <Box
              className="retbox"
              sx={{ position: "absolute", right: "10px", zIndex: 9999 }}
            >
              <Box
                id="retup"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  textAlign: "right",
                }}
              >
                <p className="ret" id="ret" style={{ color: "white" }}>
                  {retter}
                </p>
              </Box>
            </Box>
          </Box>
          {/* 카드번호를 이용한 바코드 - 카드 뒷면*/}
          <Box className="back">
            {imageUrl && (
              <Box>
                <img src={imageUrl} alt="Barcode" />
                <Box>{cardCode}</Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <SketchPicker color={back} onChangeComplete={handleChangeComplete} /> */}
        <Box
          sx={{
            ml: "5%",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ textAlign: "center", border: "2px solid green" }}>
            첫번째 색 선택
          </p>
          <Box>
            <ChromePicker
              className="chromepicker"
              color={color1}
              onChangeComplete={handleChangeComplete1}
            />
          </Box>
        </Box>
        <Box
          sx={{
            ml: "5%",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ textAlign: "center", border: "2px solid green" }}>
            두번째 색 선택
          </p>
          <Box>
            <ChromePicker
              className="chromepicker"
              color={color2}
              onChangeComplete={handleChangeComplete2}
            />
          </Box>
        </Box>
      </Box>
      <br></br>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          borderBottom: "2px solid Green",
        }}
      >
        <TextField
          id="standard-basic"
          label="Lettering"
          variant="standard"
          onChange={handleRetter}
          name="retter"
          color="primary"
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            style: {
              color: "green", // 원하는 색상으로 변경
            },
          }}
          sx={{
            ml: 2,
            flex: 8,
          }}
        />
      </Box>
      <br></br>
      <Box sx={{}}>
        {" "}
        <GithubPicker
          className="githubpicker"
          color={color3}
          onChangeComplete={handleChangeComplete3}
        />
      </Box>
      <br />
      <Button
        variant="outlined"
        onClick={handleInsert}
        sx={{
          fontWeight: "bold",
          pt: "15px",
          pb: "15px",
          width: "100%",
          border: "2px solid green",
          color: "green",
          "&:hover": {
            border: "2px solid green", // 원하는 효과로 수정해주세요
          },
        }}
      >
        Custom~~
      </Button>
    </Box>
  );
};

export { CardCustom as default, CustomContext };
