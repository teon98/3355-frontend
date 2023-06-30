import React, { useEffect, useState } from "react";
import FollowerProfile from "./FollowerProfile";
import { Box, Typography } from "@mui/material";
import ProfileView from "./ProfileView";
import { useSelector } from "react-redux";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import FollowButton from "./FollowButton";

const FollowerProfileHome = () => {
  const params = useParams();

  const [userNo, setUserNo] = useState("");
  //loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userNo) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    axios
      .get("/post/followerPost", {
        params: {
          userNickName: params.memberNickName,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserNo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(params.memberNickName);

  if (loading) {
    return (
      <Box
        sx={{
          px: "24px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: "24px",
        }}
      >
        <Typography const="h1">Loading</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: "24px", pb: "70px" }}>
      <FollowerProfile />
      {/* <ProfileView /> */}
      <FollowButton userNickName={params.memberNickName} userNo={userNo} />
      <ProfilePost userNo={userNo} />
    </Box>
  );
};

export default FollowerProfileHome;
