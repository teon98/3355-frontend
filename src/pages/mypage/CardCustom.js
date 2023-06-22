import { Box } from "@mui/material";
import React, { useState } from "react";
import CardAni from "../../components/CardAni";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const CardCustom = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ px: "24px" }}>
        <Box>
          <CardAni />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardCustom;
