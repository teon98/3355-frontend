import React, { useEffect, useState } from "react";
import Breakdown from "../../components/Breakdown";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const userNo = 110; // 사용자 번호

const PaymentDetails = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios({
      url: `/home/history/${userNo}`,
      method: "get",
    })
      .then((response) => {
        console.log(response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box p={3} pb={10}>
      <Typography variant="h5" align="center" sx={{ m: "16px auto" }}>
        결제 상세 내역
      </Typography>
      <Breakdown list={list} flag={false} />
    </Box>
  );
};

export default PaymentDetails;
