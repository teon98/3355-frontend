import { Grid, Typography } from "@mui/material";
import React from "react";

function Receipt({ payData, flag }) {
  const { amount, point } = payData;
  return (
    <>
      <Grid container spacing={flag ? 2 : 3}>
        <Grid item xs={12} mb={1}>
          <Typography variant="body1" align="left" pl={0.5}>
            최종 결제 금액
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2" align="left" pl={0.5}>
            상품 금액
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="body2" align="right" pr={1}>
            {amount ? Number(amount).toLocaleString() : "-"}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2" align="left" pl={0.5}>
            포인트 사용
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="body2" align="right" pr={1}>
            -{" "}
            {isNaN(point)
              ? ""
              : Number(point) === 0
              ? ""
              : Number(point).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={5} mt={1}>
          <Typography variant="body1" align="left" pl={0.5}>
            결제 금액
          </Typography>
        </Grid>
        <Grid item xs={7} mt={1}>
          <Typography variant="body1" align="right" pr={1}>
            {amount
              ? (Number(amount) - (point ? Number(point) : 0)).toLocaleString()
              : "-"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Receipt;
