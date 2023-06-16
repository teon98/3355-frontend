import React from "react";
import Profile from "./Profile";
import { Box } from "@mui/system";
import ProfileEditButton from "./ProfileEditButton";

const ProfileHome = () => {
  return (
    <Box sx={{ px: "24px" }}>
      <Profile />
      <ProfileEditButton />
    </Box>
  );
};

export default ProfileHome;
