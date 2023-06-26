import React, { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import "../styles/MainCSS/CardAni.css";

import magImage from "../images/CardImg/mag.png";
import masterImage from "../images/CardImg/mastercard.png";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

function CardAni() {
  //유저 정보
  const userNo = useSelector((state) => state.userNo);
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [cardCode, setCardCode] = useState("");
  const [userNick, setUserNick] = useState("");

  //카드 번호 닉네임기가져오기
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
        console.log("색" + res.data.customColor1);
        const el = document.getElementsByClassName("front");
        for (let i = 0; i < el.length; i++) {
          el[i].style.background =
            "linear-gradient(to right," +
            res.data.customColor1 +
            " , " +
            res.data.customColor2 +
            ")";
          el[i].style.color = "white";
          el[i].style.zIndex = "9999";
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <Box className="allcard">
      <Box
        className={`card ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleClick}
      >
        <Box
          class="front"
          // style={{
          //   background: "linear-gradient(to right, #213e26, #05fa5f)",
          //   color: "white",
          //   zIndex: 9999,
          // }}
        >
          <h3>SamSam</h3>
          <Box className="magicon">
            <ArrowBackIosRoundedIcon
              className="leftIcon"
              size="24"
              color="gray"
            />
            <img src={magImage} className="magimg" alt="마그네틱이미지" />
          </Box>
          <Box className="cardNomaster">
            <Box className="cardNo">{userNick}</Box>
            <img src={masterImage} className="masterimg" alt="마스터카드로고" />
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
  );
}

export default CardAni;
