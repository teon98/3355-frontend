import React from "react";
import { Box } from "@mui/material";
import CardAni from "../../components/CardAni";
import AccPoBal from "../../components/AccPoBal";
import CashCharge from "../../components/CashCharge";
import ListTabs from "../../components/MainStoreList";

const Home = () => {
  return (
    <>
      <Box sx={{ mx: "24px" }}>
        <Box>
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
      </Box>
    </>
  );
};

export default Home;
