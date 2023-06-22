import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/MainCSS/AlarmList.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AlarmList({ children, value, index }) {
  const getTabPanelClassName = () => {
    return `alarmList-tabpanel ${value === index ? "active" : ""}`;
  };

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={getTabPanelClassName()} // Set dynamic class name
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
  const userNo = useSelector((state) => state.userNo);
  const [value, setValue] = useState(0);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

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

  const readOne = (alarmNo, alarmCategory) => {
    axios({
      url: "/home/readSingle",
      params: { alarmNo: alarmNo },
      method: "put",
    })
      .then((response) => {
        console.log(response.data);
        if (alarmCategory === "point") {
          navigate("../home/point");
        } else {
          navigate("../home/payment");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              {list.map((item, idx) => (
                <Box
                  key={item.alarmNo}
                  name={item.alarmNo}
                  className={`alarmList-item ${
                    item.alarmStatus ? "active" : ""
                  }`}
                  style={{
                    color: item.alarmStatus ? "#b7b7b7" : "",
                  }}
                  onClick={() => readOne(item.alarmNo, item.alarmCategory)}
                >
                  <Typography
                    variant="body1"
                    align="left"
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
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
