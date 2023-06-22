import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/MainCSS/AlarmList.css";
import axios from "axios";
import { useSelector } from "react-redux";

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
  //리덕스 변수 사용하기
  const userNo = useSelector((state) => state.userNo);
  const [value, setValue] = useState(0);
  const [list, setList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios({
      url: "/home/alarm/",
      method: "get",
      params: { userNo: userNo },
    })
      .then((response) => {
        console.log(response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
              {list.map((item, idx) => (
                <Box key={idx}>
                  <Typography
                    onClick={() => {}}
                    variant="body1"
                    align="left"
                    sx={{ marginTop: "30px" }}
                  >
                    {item.alarmMsg}
                  </Typography>
                  <Divider />
                </Box>
              ))}
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
