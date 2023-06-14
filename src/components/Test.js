import React, { useEffect, useState } from "react";
import axios from "axios";

function Test(props) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userNo = "110"; // 사용자 번호
        const response = await axios.get(`/home/pthistory/${userNo}`);
        const pointHistory = response.data;

        const cardCode = pointHistory[0];
        console.log("카드 코드: ", cardCode);

        for (let i = 1; i < pointHistory.length; i += 4) {
          console.log(pointHistory[i]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div>{/* 컴포넌트 내용 */}</div>;
}

export default Test;
