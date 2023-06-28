import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../styles/MainCSS/StoreList.css";
import health1 from "../images/ListImg/healthImg1.png";
import health2 from "../images/ListImg/bowlinglogo1.png";
import health3 from "../images/ListImg/baseballlogo2.png";
import health4 from "../images/ListImg/soccerlogo.png";
import chicken1 from "../images/ListImg/Rankinglogo.png";
import chicken2 from "../images/ListImg/masitdaklogo.png";
import chicken3 from "../images/ListImg/kookminlogo.png";
import chicken4 from "../images/ListImg/heodaklogo.png";
import { Divider } from "@mui/material";

function MainStoreList({ children, value, index }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ p: 2 }}
    >
      {value === index && children}
    </Box>
  );
}

MainStoreList.propTypes = {
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
    <Box className="storeList">
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab label="가게" {...a11yProps(0)} />
        <Tab label="식품" {...a11yProps(1)} />
      </Tabs>

      {/* 가게목록 */}
      <MainStoreList value={value} index={0}>
        <Grid container spacing={2} className="gridList">
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pb: "16px",
            }}
          >
            <img
              src={health1}
              style={{
                objectFit: "cover",
                height: "80px",
              }}
              alt="헬스장이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center", pb: "12px" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "inherit",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              택주네 헬스장
            </Typography>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pb: "16px",
            }}
          >
            <img
              src={health2}
              style={{
                objectFit: "cover",
                height: "80px",
              }}
              alt="헬스장이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center", pb: "12px" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "inherit",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              경윤쓰 볼링장
            </Typography>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pb: "16px",
            }}
          >
            <img
              src={health3}
              style={{
                objectFit: "cover",
                height: "70px",
                margin: "5px auto",
              }}
              alt="스크린야구장이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center", pb: "12px" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "inherit",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              지만쓰 야구장
            </Typography>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={health4}
              style={{ objectFit: "cover", height: "80px" }}
              alt="풋살장이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "inherit",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              태영쓰 풋살장
            </Typography>
          </Grid>
        </Grid>
      </MainStoreList>

      {/* 식품 */}
      <MainStoreList value={value} index={1}>
        <Grid container spacing={2} className="gridList">
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={chicken1}
              style={{
                objectFit: "cover",
                height: "70px",
                paddingBottom: "16px",
              }}
              alt="랭킹닭컴 이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "18px",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              랭킹닭컴
            </Typography>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={chicken2}
              style={{
                objectFit: "cover",
                height: "70px",
                paddingBottom: "16px",
              }}
              alt="맛있닭 이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "18px",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              맛있닭
            </Typography>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={chicken3}
              style={{
                objectFit: "cover",
                height: "70px",
                paddingBottom: "16px",
              }}
              alt="국민상점 이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "18px",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              국민상점
            </Typography>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={chicken4}
              style={{ objectFit: "cover", height: "70px" }}
              alt="허닭 이미지"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className="benefit"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "18px",
                alignItems: "center",
                marginLeft: "30%",
              }}
              align="center"
            >
              허닭
            </Typography>
          </Grid>
        </Grid>
      </MainStoreList>
    </Box>
  );
}

export default ListTabs;
