import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../styles/MainCSS/StoreList.css";

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
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <DirectionsRunIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                택주네 헬스장
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 2%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <DirectionsRunIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                갱윤쓰 볼링장
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 4%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <DirectionsRunIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                지만이네 풋살장
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 10%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <DirectionsRunIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                태영이네 야구장
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 7%
            </Typography>
          </Grid>
        </Grid>
      </MainStoreList>

      {/* 식품목록 */}
      <MainStoreList value={value} index={1}>
        <Grid container spacing={2} className="gridList">
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <AddShoppingCartIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                랭킹 닭컴
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 2%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <AddShoppingCartIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                아임닭
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 4%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <AddShoppingCartIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                국민상점
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 6%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <AddShoppingCartIcon sx={{ fontSize: "inherit" }} />
              <Typography component="span" sx={{ fontSize: "inherit" }}>
                허닭
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} className="benefit">
            <Typography component="span" sx={{ fontSize: "inherit" }}>
              등급별 혜택 + 5%
            </Typography>
          </Grid>
        </Grid>
      </MainStoreList>
    </Box>
  );
}

export default ListTabs;
