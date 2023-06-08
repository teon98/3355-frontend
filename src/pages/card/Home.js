import React from "react";
import TopNavbar from "../../components/TopNavbar";
import { Box } from "@mui/material";
import CardAni from "../../components/CardAni";
import AccPoBal from "../../components/AccPoBal";

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
    </>
  );
};

export default Home;
