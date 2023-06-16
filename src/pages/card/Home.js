import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CardAni from "../../components/CardAni";
import AccPoBal from "../../components/AccPoBal";
import CashCharge from "../../components/CashCharge";
import ListTabs from "../../components/MainStoreList";
import CropFreeIcon from "@mui/icons-material/CropFree";
import BarcodeDialog from "../../components/BarcodeDialog";

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box px={3} pb={8}>
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
          <Box
            sx={{
              mt: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="delete" onClick={handleClickOpen}>
              <CropFreeIcon sx={{ color: "#666666", fontSize: 32 }} />
            </IconButton>
            <BarcodeDialog open={open} handleClose={handleClose} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
