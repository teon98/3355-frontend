import {
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appStyle from "../../App.module.css";
import Receipt from "../../components/Receipt";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import axios from "axios";

function PayComplete(props) {
  const navi = useNavigate();
  // const location = useLocation();
  // let str = location.state.data;
  // let payData = location.state.payData;
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios({
      url: "/home/pay/complete",
      method: "get",
      params: { userNo: "110" },
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let str = data?.withdrawDate; // Optional chaining (?.)을 사용하여 null 또는 undefined인 경우에는 undefined를 반환.
    if (str) {
      setDate(str.slice(0, -4));
    }
  }, [data]);

  return (
    <Box className={appStyle.gradient} p={3}>
      <Box sx={{ display: "flex", height: "80vh", alignItems: "center" }}>
        <Box
          sx={{
            backgroundColor: "white",
            padding: "4px 12px",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6" align="center" sx={{ m: "16px auto" }}>
            결제 완료!
          </Typography>
          <Box
            sx={{
              backgroundColor: "#eee",
              padding: "0.1px 12px",
              borderRadius: "16px",
            }}
          >
            <Grid container spacing={3} mt={0.1} mb={2}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  {data.storeName}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2" align="left" pl={0.5}>
                  결제 일시
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body2" align="right" pr={1}>
                  {date}
                </Typography>
              </Grid>
            </Grid>
            <Divider>
              <Chip label="receipt" />
            </Divider>
            <Box my={2}>
              <Receipt payData={data} flag={false} />
            </Box>
            <Divider />
            <Grid container spacing={3} mt={0.1} mb={2.5}>
              <Grid item xs={5}>
                <Typography variant="body1" align="left" pl={0.5}>
                  포인트 적립
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 700 }}
                    title={
                      <Box
                        sx={{
                          padding: "4px",
                          fontSize: "16px",
                          fontWeight: "lighter",
                          lineHeight: "1.5em",
                        }}
                      >
                        실 결제 금액 ⨉ 회원 등급별 적립률
                        <br />( {data.amount} - {data.point} ) ⨉{" "}
                        {data.levelRatio}
                      </Box>
                    }
                  >
                    <IconButton
                      aria-label="point-info"
                      sx={{ padding: "0", marginLeft: "-45px" }}
                      onClick={handleTooltipOpen}
                    >
                      <HelpOutlineRoundedIcon
                        sx={{ fontSize: "16px", color: "black" }}
                      />
                    </IconButton>
                  </Tooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right" pr={1}>
                  + {data.pointSave}
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
        </Box>
      </Box>
    </Box>
  );
}

export default PayComplete;
