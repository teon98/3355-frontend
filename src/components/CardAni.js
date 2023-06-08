import React, { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import "../styles/MainCSS/CardAni.css";

import magImage from "../images/CardImg/mag.png";
import masterImage from "../images/CardImg/mastercard.png";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Box } from "@mui/material";

function CardAni(props) {
  // 카드 뒤집기 애니메이션
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 바코드 생성
  const [imageUrl, setImageUrl] = useState("");
  // const storeInfo = ""; // 가게 정보 담기
  const barcodeNumber = `185382543520 `; // 바코드 번호에 가게 정보 포함.
  const cardcode = "3355-1853-8254-3520";

  useEffect(() => {
    const generateBarcode = () => {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, barcodeNumber, { height: 50, displayValue: false });
      setImageUrl(canvas.toDataURL("image/png"));
    };
    generateBarcode();
  }, [barcodeNumber]);

  return (
    <section>
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
            <p className="cardNo">LEE TAEK JOO</p>
            <img
              src={masterImage}
              className="masterimg"
              alt="마스터카드로고"
            ></img>
          </Box>
        </Box>

        {/* 카드번호를 이용한 바코드 - 카드 뒷면*/}
        <Box className="back">
          {imageUrl && (
            <Box>
              <img src={imageUrl} alt="Barcode" />
              <p>{cardcode}</p>
            </Box>
          )}
        </Box>
      </Box>
    </section>
  );
}

export default CardAni;
