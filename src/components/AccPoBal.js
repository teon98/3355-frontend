import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/MainCSS/AccPoBal.css";

const AccPoBal = () => {
  const pointBalance = "2,000";
  const cardBalance = "10,000";

  return (
    <Box className="root1">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Link to="payment" className="linked">
          <Card className="card1">
            <CardContent>
              <Typography className="title" variant="h5" component="h2">
                카드 잔액
              </Typography>
              <Typography className="balance" variant="body1" component="p">
                {cardBalance} 원
              </Typography>
            </CardContent>
          </Card>
        </Link>

        <Link to="point" className="linked">
          <Card className="card1">
            <CardContent>
              <Typography className="title" variant="h5" component="h2">
                포인트 잔액
              </Typography>
              <Typography className="balance" variant="body1" component="p">
                {pointBalance} 원
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Stack>
    </Box>
  );
};

export default AccPoBal;
