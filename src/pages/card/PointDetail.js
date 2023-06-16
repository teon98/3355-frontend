import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Breakdown from "../../components/Breakdown";
import axios from "axios";

const userNo = 110; // 사용자 번호

const PointDetail = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios({
      url: `/home/pthistory/${userNo}`,
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
        포인트 상세 내역
      </Typography>
      <Breakdown list={list} flag={true} />
    </Box>
  );
};

export default PointDetail;
