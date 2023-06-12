import React from "react";
import { Box } from "@mui/material";
import CardAni from "../../components/CardAni";
import AccPoBal from "../../components/AccPoBal";
import CashCharge from "../../components/CashCharge";
import TopNavbar from "../../components/TopNavbar";
import ListTabs from "../../components/MainStoreList";

const Home = () => {
  return (
    <>
      <Box>
        <TopNavbar />
      </Box>
      <Box p={3}>
        <Box>
          <CardAni />
        </Box>
        <Box>
          <AccPoBal />
        </Box>

        <Box>
          <CashCharge />
        </Box>

        <Box>
          <ListTabs />
        </Box>
      </Box>
    </>
  );
};

export default Home;
