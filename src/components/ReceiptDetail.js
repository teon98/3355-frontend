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
import Receipt from "./Receipt";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

function ReceiptDetail({ data }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [date, setDate] = useState("");

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  useEffect(() => {
    let str = data?.withdrawDate;
    if (str) setDate(str.slice(0, str.indexOf(".")));
  }, [data]);

  return (
    <Box
      sx={{
        maxWidth: "500px",
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
        <Grid item xs={6}>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={tooltipOpen}
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
                  <br />( {data.amount} - {data.point} ) ⨉ {data.levelRatio}
                </Box>
              }
            >
              <Box
                id="earnedPoint"
                component="span"
                onClick={handleTooltipOpen}
              >
                <Typography
                  variant="body1"
                  component="span"
                  align="left"
                  pl={0.5}
                >
                  포인트 적립
                </Typography>
                <IconButton
                  aria-label="point-info"
                  disabled
                  sx={{ p: 0, mx: 1 }}
                >
                  <HelpOutlineRoundedIcon
                    sx={{ fontSize: "16px", color: "black" }}
                  />
                </IconButton>
              </Box>
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
  );
}

export default ReceiptDetail;
