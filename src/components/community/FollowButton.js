import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const FollowBT = styled(Button)({
  borderColor: "#A055FF",
  borderWidth: "2px",
  color: "#A055FF",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  "&:hover": {
    borderWidth: "2px",
    borderColor: "#A055FF",
    background: "#E3DAEE",
  },
});

const FollowIngBT = styled(Button)({
  background: "#A055FF",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  "&:hover": {
    background: "#672AB5",
  },
});

const FollowButton = (props) => {
  const owneruserNo = useSelector((state) => state.userNo);
  const [btmsg, setBtmsg] = useState("");

  useEffect(() => {
    axios
      .get("/commu/followEachother", {
        params: {
          userNo: owneruserNo,
          userNickname: props.userNickName,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBtmsg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    console.log(owneruserNo);
    console.log(props.userNo);
  };

  if (btmsg === "팔로잉") {
    return (
      <FollowIngBT variant="contained" onClick={handleClick}>
        {btmsg}
      </FollowIngBT>
    );
  } else if (btmsg === "팔로우") {
    return <FollowBT variant="outlined">{btmsg}</FollowBT>;
  } else if (btmsg === "맞팔로우") {
    return (
      <FollowIngBT variant="contained" onClick={handleClick}>
        {btmsg}
      </FollowIngBT>
    );
  }
};

export default FollowButton;
