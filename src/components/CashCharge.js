import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../styles/MainCSS/CashCharge.css";
import AccBalDialog from "./AccBalDialog";

const CashCharge = () => {
  const [open, setOpen] = useState(false);

  const handleRechargeButtonClick = () => {
    setOpen(true); // 다이얼로그 열기
  };

  const handleClose = () => {
    setOpen(false); // 다이얼로그 닫기
  };

  return (
    <Box display="flex">
      <Stack direction="row" spacing={2} className="reCharge">
        <p>잔액 충전</p>
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
