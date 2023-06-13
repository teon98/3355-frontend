import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../styles/MainCSS/CashCharge.css";
import AccBalDialog from "./AccBalDialog"; // AccBalDialog 컴포넌트를 가져옵니다.

const CashCharge = () => {
  const [open, setOpen] = useState(false);

  const handleRechargeButtonClick = () => {
    setOpen(true); // 다이얼로그 열기
  };

  const handleClose = () => {
    setOpen(false); // 다이얼로그 닫기
  };

  return (
    <Box display="flex" mt={2}>
      <Stack direction="row" spacing={2} className="reCharge">
        <p>충전페이지로 이동</p>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleRechargeButtonClick}
          className="chargebtn"
        >
          충전
        </Button>
        <AccBalDialog open={open} handleClose={handleClose} />{" "}
      </Stack>
    </Box>
  );
};

export default CashCharge;
