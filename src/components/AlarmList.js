import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/MainCSS/AlarmList.css";

function AlarmList({ children, value, index }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={`alarmList-tabpanel ${value === index ? "active" : ""}`} // 새로운 클래스를 추가합니다.
    >
      {children}
    </Box>
  );
}

AlarmList.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ListTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box className="alarmList-container">
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered={true}
          >
            <Tab label="카드 알림" {...a11yProps(0)} />
            <Tab label="소셜 알림" {...a11yProps(1)} />
          </Tabs>
          <AlarmList value={value} index={0}>
            <Stack spacing={3}>
              <Typography
                onClick={() => {
                  alert("헤헤");
                }}
                variant="body1"
                align="left"
                sx={{ marginTop: "30px" }}
              >
                <p>[택주네 헬스장] 15000원 결제되었습니다~</p>
              </Typography>
              <Divider />
              <Typography variant="body1" align="left">
                <p>[경윤쓰 볼링장] 2000원 결제되었습니다~</p>
              </Typography>
              <Divider />
              <Typography variant="body1" align="left">
                <p>[택주네 헬스장] 20000원 결제되었습니다~</p>
              </Typography>
              <Divider />
            </Stack>
          </AlarmList>
          {/* 소셜 알림 */}
          <AlarmList value={value} index={1}></AlarmList>
        </Box>
      </Box>
    </Box>
  );
}

export default ListTabs;
