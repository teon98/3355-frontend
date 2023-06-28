import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/MainCSS/AlarmList.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import comingsoon from "../images/comingsoon.jpg";

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

  const webView = useMediaQuery("(min-width:600px)");
  console.log(webView);

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
            {list.map((item, idx) => (
              <Box
                key={idx}
                sx={{ cursor: "pointer" }}
                onClick={() => readOne(item.alarmNo, item.alarmCategory)}
              >
                <Divider />
                <Grid container sx={{ my: "16px" }}>
                  <Grid
                    item
                    xs={webView ? 8 : 12}
                    sx={{
                      pl: 2,
                      color: item.alarmStatus ? "#b7b7b7" : "",
                    }}
                  >
                    <Typography variant="body1" align="left">
                      {item.alarmMsg.indexOf("] 0원 결제") > 0
                        ? item.alarmMsg.replace("] 0원 결제", "] 포인트 결제")
                        : item.alarmMsg}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{
                      pr: 2,
                      fontWeight: "lighter",
                      color: item.alarmStatus ? "#b7b7b7" : "",
                    }}
                  >
                    <Typography
                      variant="body1"
                      align="right"
                      sx={{
                        fontSize: webView ? "12px" : "11px !important",
                        mt: "4px",
                      }}
                    >
                      {item.alarmDate
                        .substr(
                          2,
                          item.alarmDate.indexOf(".") > 0
                            ? item.alarmDate.indexOf(".") - 2
                            : item.alarmDate.length
                        )
                        .replace(/(\d{2})-(\d{2})-(\d{2})/, "$1/$2/$3")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Divider />
          </AlarmList>
          {/* 소셜 알림 */}
          <AlarmList value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "450px",
              }}
            >
              <Card sx={{ maxWidth: 345, my: "16px", height: "min-content" }}>
                <CardMedia
                  component="img"
                  height="140"
                  src={comingsoon}
                  alt="coming soon"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Coming Soon...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={-1}>
                    추후 도입될 기능입니다.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </AlarmList>
        </Box>
      </Box>
    </Box>
  );
}

export default ListTabs;
