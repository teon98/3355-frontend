import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import "../../styles/ProfileStyles.css";
import { useSelector } from "react-redux";

import { MyContext } from "../../pages/mypage/Mypage";

const MyDays = () => {
  //유저 정보들
  const userNo = useSelector((state) => state.userNo);
  const { userStamp, userWork } = useContext(MyContext);

  return (
    <Box>
      <table className="postButton">
        <tr>
          <td style={{ borderRight: "solid 1px" }}>{userStamp} 일</td>
          <td>{userWork} 일</td>
        </tr>
        <tr>
          <td style={{ borderRight: "solid 1px" }}>출석일수</td>
          <td>운동일수</td>
        </tr>
      </table>
    </Box>
  );
};

export default MyDays;
