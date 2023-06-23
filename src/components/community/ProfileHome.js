import React from "react";
import Profile from "./Profile";
import { Box } from "@mui/system";
import ProfileEditButton from "./ProfileEditButton";
import ProfileView from "./ProfileView";
import ProfilePost from "./ProfilePost";
import { useSelector } from "react-redux";

const ProfileHome = () => {
  const userNo = useSelector((state) => state.userNo);

  return (
    <Box sx={{ px: "24px", pb: "70px" }}>
      <Profile />
      <ProfileView />
      <ProfileEditButton />
      <ProfilePost userNo={userNo} />
    </Box>
  );
};

export default ProfileHome;
