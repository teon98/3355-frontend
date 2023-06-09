import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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
        <Box
          sx={{
            height: "auto",
            backgroundColor: "#eee",
            padding: "24px",
            textAlign: "center",
            borderRadius: "12px",
          }}
        >
          <Grid container spacing={2}>
            <Typography
              variant="h6"
              align="center"
              sx={{ m: "24px auto 12px" }}
            >
              {storeName}
            </Typography>
            <Grid item xs={12} sx={{ mb: "12px" }}>
              <TextField
                label="결제 금액"
                required
                // autoFocus
                fullWidth
                type="number"
                id="amount"
                name="amount"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                helperText="결제할 금액을 가맹점에 여쭤보삼"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="포인트"
                fullWidth
                type="number"
                id="point"
                name="point"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                helperText="100 포인트 이상 보유시 사용 가능"
              />
              {/* <FormHelperText>100 포인트 이상 보유시 사용 가능</FormHelperText> */}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2" align="left" pl={1}>
                보유 포인트
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body2" align="right" pr={1}>
                100,000
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              backgroundColor: "lightgray",
              padding: "16px 12px 8px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              mt: "32px",
              mb: "-4px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} mb={1}>
                <Typography variant="body1" align="left" pl={0.5}>
                  최종 결제 금액
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2" align="left" pl={0.5}>
                  실제 금액
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" align="right" pr={1}>
                  8,000
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2" align="left" pl={0.5}>
                  포인트
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" align="right" pr={1}>
                  - 300
                </Typography>
              </Grid>
              <Grid item xs={5} mt={1}>
                <Typography variant="body1" align="left" pl={0.5}>
                  결제 금액
                </Typography>
              </Grid>
              <Grid item xs={7} mt={1}>
                <Typography variant="body1" align="right" pr={1}>
                  7,700
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="[필수] 전자결제대행 이용 동의"
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mb: 1 }}
            size="large"
          >
            결제
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Pay;
