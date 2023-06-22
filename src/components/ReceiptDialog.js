import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReceiptDetail from "./ReceiptDetail";
import axios from "axios";
import { useSelector } from "react-redux";

function ReceiptDialog({ date, openDialog, handleCloseDetail }) {
  const userNo = useSelector((state) => state.userNo); // 리덕스 변수 사용하기

  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      url: `/home/history/detail`,
      method: "get",
      params: { userNo: userNo, date: date },
    })
      .then((response) => {
        console.log("쿄쿄", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDetail}>
        <Box sx={{ p: 4, mx: "auto", backgroundColor: "transparent" }}>
          <Box>{date}</Box>
          <ReceiptDetail data={data} />
        </Box>
      </Dialog>
    </>
  );
}

export default ReceiptDialog;
