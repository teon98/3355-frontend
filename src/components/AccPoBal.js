import React from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import "../styles/MainCSS/AccPoBal.css";

const AccPoBal = () => {
  const pointBalance = "2,000";
  const cardBalance = "10,000";

  return (
    <div className="root1">
      <Container sx={{ bgcolor: "black", height: "200px" }}>
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
      </Container>
    </div>
  );
};

export default AccPoBal;
