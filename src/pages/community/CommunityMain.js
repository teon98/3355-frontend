import { Box } from "@mui/material";
import React from "react";
import MyFollowerList from "../../components/community/MyFollowerList";

const CommunityMain = () => {
  return (
    <Box sx={{ mx: "24px" }}>
      <MyFollowerList />
    </Box>
  );
};

export default CommunityMain;
