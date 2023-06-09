import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../styles/MainCSS/CashCharge.css";

const CashCharge = () => {
  const navigate = useNavigate();

  const handleRechargeButtonClick = () => {
    navigate("/recharge"); // 충전하기 페이지로 이동
  };

  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Stack direction="row" spacing={2} className="reCharge">
        <p>충전페이지로 이동 </p>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleRechargeButtonClick}
        >
          충전
        </Button>
      </Stack>
    </Box>
  );
};

export default CashCharge;
