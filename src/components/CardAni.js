import React, { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import "../styles/MainCSS/CardAni.css";

import magImage from "../images/CardImg/mag.png";
import masterImage from "../images/CardImg/mastercard.png";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Box } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function CardAni() {
  const userNo = useSelector((state) => state.userNo);

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

  const [cardCode, setCardCode] = useState("");
  const [userNick, setUserNick] = useState("");

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

  return (
    <Box className="allcard">
      <Box
        className={`card ${isFlipped ? "is-flipped" : ""}`}
        onClick={handleClick}
      >
        <Box className="front">
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
