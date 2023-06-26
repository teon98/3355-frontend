import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";

const EditButton = styled(Button)({
  background: "white",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  borderBottom: "2px solid green",
  borderRight: "2px solid green",
  "&:hover": {
    background: "#7cde9d",
  },
});

const CardCustomBtn = () => {
  return (
    <Link to="/mypage/custom" style={{ textDecoration: "none" }}>
      <EditButton variant="contained" style={{ color: "green" }}>
        카드 커스텀
      </EditButton>
    </Link>
  );
};

export default CardCustomBtn;
