import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import comingsoon from "../../images/comingsoon.jpg";

const EventPage = () => {
  return (
    <Box p={3}>
      <Typography
        variant="h5"
        align="center"
        color="black"
        sx={{ m: "16px auto 8px" }}
      >
        이벤트
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ my: "16px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                src={comingsoon}
                alt="coming soon"
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  Event 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이벤트 1이다. 내가 낸데
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ my: "16px" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                src={comingsoon}
                alt="coming soon"
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  Event 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  이벤트 2이다. 니 뭐 돼?
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventPage;
