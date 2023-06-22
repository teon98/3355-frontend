import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const EditButton = styled(Button)({
  background: "#A055FF",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  "&:hover": {
    background: "#672AB5",
  },
});

const ChangePass2Btn = () => {
  return (
    <Link to="/community/profileEdit" style={{ textDecoration: "none" }}>
      <EditButton variant="contained">비밀번호 수정</EditButton>
    </Link>
  );
};

export default ChangePass2Btn;
