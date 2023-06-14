import React from "react";
import Breakdown from "../../components/Breakdown";
import { Box, Typography } from "@mui/material";

const PaymentDetails = () => {
  return (
    <Box p={3}>
      <Typography variant="h6" align="center" sx={{ m: "16px auto" }}>
        결제내역 상세 페이지
      </Typography>
      <Breakdown />
    </Box>
  );
};

export default PaymentDetails;
