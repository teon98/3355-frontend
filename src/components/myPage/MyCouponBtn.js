import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const EditButton = styled(Button)({
  background: "#f2f1f8",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  borderBottom: "2px solid green",
  borderRight: "2px solid green",
  "&:hover": {
    background: "#7cde9d",
  },
});

const MyCouponBtn = () => {
  return (
    <Link to="/community/profileEdit" style={{ textDecoration: "none" }}>
      <EditButton variant="contained" style={{ color: "green" }}>
        프로필 수정
      </EditButton>
    </Link>
  );
};

export default MyCouponBtn;
