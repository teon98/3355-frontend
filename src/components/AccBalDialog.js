import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function AccBalDialog({ open, handleClose }) {
  const [chargeAmount, setChargeAmount] = useState("");
  const [cardPass, setCardPass] = useState("");
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCharge = async () => {
    try {
      const userNo = "110";
      const data = {
        userNo,
        chargeAmount,
        cardPass,
      };

      const response = await axios.post("/home/charge", data);
      handleResponse(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handlePasswordChange = (e) => {
    setCardPass(e.target.value);
    setIsIncorrectPassword(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    await handleCharge();

    setIsSubmitting(false);
  };

  const handleResponse = (response) => {
    if (response === "OK") {
      window.location.reload();
    } else if (response === "WRONG") {
      setIsIncorrectPassword(true);
    }
  };

  const handleCloseDialog = () => {
    setChargeAmount("");
    setCardPass("");
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>잔액 충전하기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            충전 금액과 카드 비밀번호를 입력해주세요~
          </DialogContentText>
          <form autoComplete="off" onSubmit={handleFormSubmit}>
            <TextField
              margin="dense"
              id="charge-amount"
              label="충전 금액 입력"
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              InputProps={{
                endAdornment: "원",
              }}
              fullWidth
              variant="standard"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value)}
              autoComplete="off"
            />
            <TextField
              margin="dense"
              id="card-pass"
              label="카드 비밀번호"
              type="password"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 4,
              }}
              fullWidth
              variant="standard"
              value={cardPass}
              onChange={handlePasswordChange}
              autoComplete="off"
              error={isIncorrectPassword}
              helperText={isIncorrectPassword && "비밀번호가 틀렸습니다."}
            />
            <DialogActions>
              <Button onClick={handleCloseDialog} disabled={isSubmitting}>
                닫기
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                충전
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
