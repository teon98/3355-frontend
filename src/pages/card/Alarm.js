import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import AlarmList from "../../components/AlarmList";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Alarm(props) {
  const navigate = useNavigate();
  const userNo = useSelector((state) => state.userNo);

  const handleConfirmClick = () => {
    axios({
      url: "/home/readAll",
      params: { userNo: userNo },
      method: "put",
    })
      .then((response) => {
        console.log(response.data);
        navigate("../home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          backgroundColor: "#F2F1F8",
          width: "100%",
          height: "80px",
          m: "0 auto 8px",
          position: "sticky",
          top: "0",
          zIndex: "4",
        }}
      >
        <Grid item xs={4} textAlign="left">
          <IconButton
            aria-label="go back"
            sx={{ ml: "8px" }}
            onClick={handleGoBack}
          >
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4} sx={{ pr: "16px", textAlign: "center" }}>
          <Typography>알림</Typography>
        </Grid>
        <Grid item xs={4} textAlign="right" sx={{ pr: "16px" }}>
          <IconButton
            aria-label="read all"
            sx={{ mr: "8px" }}
            onClick={handleConfirmClick}
          >
            <DoneAllIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box p={3} pt={0}>
        <AlarmList />
      </Box>
    </>
  );
}

export default Alarm;
