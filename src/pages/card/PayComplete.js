import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appStyle from "../../App.module.css";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import axios from "axios";
import { useSelector } from "react-redux";
import ReceiptDetail from "../../components/ReceiptDetail";

function PayComplete(props) {
  const userNo = useSelector((state) => state.userNo); // 리덕스 변수 사용하기

  const navi = useNavigate();
  // const location = useLocation();
  // let payData = location.state.payData;
  // console.log(payData);

  const [data, setData] = useState({});

  useEffect(() => {
    axios({
      url: "/home/pay/complete",
      method: "get",
      params: { userNo: userNo },
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box className={appStyle.notgradient} p={3} pb={5}>
      <Box sx={{ display: "flex", height: "80vh", alignItems: "center" }}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "white",
            padding: "4px 12px",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6" align="center" sx={{ m: "16px auto" }}>
            결제 완료!
          </Typography>
          <ReceiptDetail data={data} />
          <Box sx={{ display: "flex", justifyContent: "center", my: "16px" }}>
            <IconButton
              aria-label="okay"
              onClick={() => {
                navi("/home");
              }}
            >
              <CheckCircleOutlineRoundedIcon
                sx={{ fontSize: 50, color: "#81c147" }}
              />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default PayComplete;
