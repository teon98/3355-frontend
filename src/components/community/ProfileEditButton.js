import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const EditButton = styled(Button)({
  background: "#A055FF",
  width: "100%",
  "&:hover": {
    background: "#672AB5",
  },
});

const ProfileEditButton = () => {
  return (
    <Link to="/community/profileEdit">
      <EditButton variant="contained">프로필 편집</EditButton>
    </Link>
  );
};

export default ProfileEditButton;
