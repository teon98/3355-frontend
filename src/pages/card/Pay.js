import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import axios from "axios";

function Pay(props) {
  const location = useLocation();
  const storeNo = location.state.store_no;
  const [storeName, setStoreName] = useState("");

  useEffect(() => {
    axios({
      url: "/home/pay",
      method: "get",
      params: { storeNo: storeNo },
    })
      .then((response) => {
        console.log(response.data);
        setStoreName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [storeNo]);

  return (
    <>
      <TopNavbar />
      <Box>
        <Typography
          variant="h6"
          align="center"
          color="white"
          sx={{ m: "24px auto 12px" }}
        >
          결제 페이지
        </Typography>
        <Typography variant="body1" align="center" sx={{ m: "24px auto 12px" }}>
          {storeName} 가맹점
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            backgroundColor: "#eee",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <TextField id="outlined-basic" label="결제 금액" variant="outlined" />
        </Box>
      </Box>
    </>
  );
}

export default Pay;
