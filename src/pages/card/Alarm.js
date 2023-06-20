import { Box, Button, Stack, Typography } from "@mui/material";
import AlarmList from "../../components/AlarmList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";

function Alarm(props) {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate("../home");
  };

  return (
    <>
      <Box p={3} pb={10}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            justifyContent: { xs: "center", sm: "space-between" },
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Link to={"../home"}>
            <ArrowBackIcon sx={{ minWidth: 0 }} />
          </Link>
          <Typography sx={{ flex: 1, textAlign: "center" }}>알림</Typography>
          <Button
            variant="outlined"
            sx={{ minWidth: 0 }}
            onClick={handleConfirmClick}
          >
            확인
          </Button>
        </Stack>
        <AlarmList />
      </Box>
    </>
  );
}

export default Alarm;
