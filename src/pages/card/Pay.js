import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import appStyle from "../../App.module.css";
import Receipt from "../../components/Receipt";
import { useSelector } from "react-redux";

function Pay(props) {
  const userNo = useSelector((state) => state.userNo); // 리덕스 변수 사용하기
  const navi = useNavigate();
  const { storeNo, storeName } = useLocation().state;
  const [amount, setAmount] = useState("");
  const [point, setPoint] = useState("");
  const [payData, setPayData] = useState({
    userNo: userNo,
    storeNo: storeNo,
    point: point === "" ? 0 : point,
    amount: amount,
  });
  const [accBal, setAccBal] = useState(0);
  const [poBal, setPoBal] = useState(0);
  const [availablePoint, setAvailablePoint] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false); // 체크박스 상태

  // 테스트 출력 ==============================================================
  useEffect(() => {
    console.log("amount", amount);
    console.log("point", point);
    console.log("pay data", payData);
  }, [amount, point, payData]);
  //--------------------------------------------------------------------------

  // (amount, point) TextField의 값이 변경될 때, 각각의 상태 update
  const handleChange = (e) => {
    const { name, value, max } = e.target;

    const confirmedValue = Number(value) > max ? max : value;
    if (name === "amount") setAmount(confirmedValue);
    else setPoint(confirmedValue);
    setPayData({ ...payData, [name]: confirmedValue });
  };

  const useMaxPoint = () => {
    if (payData.amount) {
      const maxPoint = poBal > Number(payData.amount) ? payData.amount : poBal;
      setPoint(maxPoint.toString());
      setPayData({ ...payData, point: maxPoint.toString() });
    }
  };

  useEffect(() => {
    axios({
      url: "/home/pay",
      method: "get",
      params: { userNo: userNo },
    })
      .then((response) => {
        setAccBal(response.data.accountBalance);
        setPoBal(response.data.pointBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 최저 사용 포인트 처리
  useEffect(() => {
    if (poBal < 100) setAvailablePoint(false);
  }, [poBal]);

  const handlePay = () => {
    axios({
      url: "/home/pay",
      method: "post",
      data: payData,
    })
      .then((response) => {
        navi("/home/pay/complete", {
          state: {
            data: response.data,
            payData: payData,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={appStyle.notgradient} p={3}>
      <Box>
        <Typography
          variant="h5"
          align="center"
          color="black"
          sx={{ m: "16px auto" }}
        >
          결제
        </Typography>
        <Paper
          elevation={3}
          sx={{
            height: "auto",
            backgroundColor: "white",
            padding: "24px",
            textAlign: "center",
            borderRadius: "12px",
          }}
        >
          <Grid container spacing={2}>
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="h6"
                align="center"
                sx={{ m: "24px auto 12px" }}
              >
                {storeName}
              </Typography>
            </Box>
            <Grid item xs={12}>
              <TextField
                label="결제 금액"
                required
                fullWidth
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  max: accBal,
                  style: { textAlign: "right" },
                }}
                helperText="결제할 금액을 가맹점에 여쭤보삼"
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2" align="left" pl={1}>
                카드 잔액
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" align="right" pr={1}>
                {accBal}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: "12px" }}>
              <TextField
                label="포인트"
                fullWidth
                type="number"
                id="point"
                name="point"
                value={point}
                disabled={availablePoint}
                onChange={handleChange}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: "100",
                  max: poBal,
                  style: { textAlign: "right" },
                }}
                helperText="100 포인트 이상 보유시 사용 가능"
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2" align="left" pl={1}>
                보유 포인트
              </Typography>
            </Grid>
            <Grid item xs sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                component="span"
                align="right"
                pr={1}
                sx={{
                  textDecoration: "underline",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={useMaxPoint}
              >
                {poBal}
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              backgroundColor: "#eee",
              padding: "16px 12px 8px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              mt: "32px",
              mb: "0",
            }}
          >
            <Receipt payData={payData} flag={true} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                    />
                  }
                  label="[필수] 전자결제대행 이용 동의"
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mb: 1 }}
            size="large"
            onClick={handlePay}
            disabled={!checkboxChecked || amount <= 0} // 체크박스가 선택되지 않은 경우 버튼 비활성화
          >
            결제
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Pay;
