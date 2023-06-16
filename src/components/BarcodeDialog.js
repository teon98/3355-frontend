import { Box, Dialog, IconButton, Slide } from "@mui/material";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import BarcodeScan from "./BarcodeScan";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BarcodeDialog({ open, handleClose }) {
  return (
    <>
      <Dialog
        fullScreen
        sx={{ maxWidth: "600px", mx: "auto" }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Box>{open && <BarcodeScan open={open} />}</Box>
        <Box
          sx={{
            mt: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleClose} aria-label="close">
            <CancelRoundedIcon sx={{ color: "#a1a1a1", fontSize: 60 }} />
          </IconButton>
        </Box>
      </Dialog>
    </>
  );
}

export default BarcodeDialog;
