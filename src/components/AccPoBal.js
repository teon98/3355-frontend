import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";

const AccPoBal = () => {
  //리덕스 변수 사용하기
  const userNo = useSelector((state) => state.userNo);

  const [cardBalance, setCardBalance] = useState(0);
  const [pointBalance, setPointBalance] = useState(0);

  useEffect(() => {
    axios({
      url: "/home",
      method: "get",
      params: { userNo: userNo },
    })
      .then((response) => {
        console.log(response);
        setCardBalance(response.data.accountBalance);
        setPointBalance(response.data.pointBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                {cardBalance.toLocaleString()} 원
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
                {pointBalance.toLocaleString()} P
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Stack>
    </Box>
  );
};

export default AccPoBal;
