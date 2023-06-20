import React from "react";
import Profile from "./Profile";
import { Box } from "@mui/system";
import ProfileEditButton from "./ProfileEditButton";
import ProfileView from "./ProfileView";
import ProfilePost from "./ProfilePost";

const ProfileHome = () => {
  return (
    <Box sx={{ px: "24px" }}>
      <Profile />
      <ProfileView />
      <ProfileEditButton />
      <ProfilePost />
    </Box>
  );
};

export default ProfileHome;
