import React from "react";
import { Box } from "@mui/material";
import CardAni from "../../components/CardAni";
import AccPoBal from "../../components/AccPoBal";
import CashCharge from "../../components/CashCharge";
import HisToryTabs from "../../components/StoreList";
import TopNavbar from "../../components/TopNavbar";

const Home = () => {
  return (
    <>
      <Box>
        <TopNavbar />
      </Box>

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
        <HisToryTabs />
      </Box>
    </>
  );
};

export default Home;
