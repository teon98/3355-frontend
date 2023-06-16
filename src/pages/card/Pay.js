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
  //리덕스 변수 사용하기
  const userNo = useSelector((state) => state.userNo);

  const navi = useNavigate();
  const location = useLocation();
  const { storeNo, storeName } = location.state;
  const [payData, setPayData] = useState({
    userNo: userNo,
    storeNo: storeNo,
    point: "0",
  });
  const [accBal, setAccBal] = useState(0);
  const [poBal, setPoBal] = useState(0);
  const [availablePoint, setAvailablePoint] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false); // 체크박스 상태를 추적하는 상태 변수

  const handleChange = (e) => {
    const { name, value, max } = e.target;

    let confirmedValue = Number(value) > max ? max : value;
    document.getElementById(name).value = confirmedValue;
    setPayData({ ...payData, [name]: confirmedValue });
  };

  const handlePointBlur = (e) => {
    let confirmedValue;
    if (Number(e.target.value) <= 0) {
      confirmedValue = "0";
      document.getElementById("point").value = "";
    } else {
      confirmedValue = Number(e.target.value) < 100 ? "100" : e.target.value;
      document.getElementById("point").value = confirmedValue;
    }
    setPayData({ ...payData, point: confirmedValue });
  };

  useEffect(() => {
    console.log("pay data", payData);
  }, [payData]);

  useEffect(() => {
    axios({
      url: "/home/pay",
      method: "get",
      params: { userNo: userNo },
    })
      .then((response) => {
        // console.log(response.data);
        setAccBal(response.data.accountBalance);
        setPoBal(response.data.pointBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (poBal < 100) {
      setAvailablePoint(false);
    }
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

  const useMaxPoint = () => {
    if (payData.amount) {
      let maxPoint = poBal > payData.amount ? payData.amount : poBal;
      document.getElementById("point").value = maxPoint;
      setPayData({ ...payData, point: maxPoint });
    }
  };

  return (
    <Box className={appStyle.notgradient} p={3}>
      <Box>
        <Typography
          variant="h6"
          align="center"
          color="black"
          sx={{ m: "24px auto 12px" }}
        >
          결제 페이지
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
                disabled={availablePoint}
                onBlur={handlePointBlur}
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
            disabled={!checkboxChecked} // 체크박스가 선택되지 않은 경우 버튼 비활성화
          >
            결제
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Pay;
