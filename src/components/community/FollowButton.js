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
  }, [btmsg]);

  //팔로우 걸기
  const followRequest = (owner, user) => {
    let formData = new FormData();
    formData.append("owner", owner);
    formData.append("user", user);
    axios
      .post("/commu/followrequest", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //팔로우 취소
  const followCancel = (owner, user) => {
    let formData = new FormData();
    formData.append("owner", owner);
    formData.append("user", user);
    axios(
      // .delete("/commu/followcancel", formData)
      // .delete("/commu/followcancel", { owner: owner, user: user })
      {
        url: `/commu/followcancel`,
        method: "delete",
        params: { owner: owner, user: user },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (e) => {
    console.log(owneruserNo);
    console.log(props.userNo);
    console.log(e.target.textContent);
    if (e.target.textContent === "팔로우") {
      //팔로우 취소
      followCancel(owneruserNo, props.userNo);
    } else if (e.target.textContent === "맞팔로우") {
      //맞팔로우 걸기
      followRequest(owneruserNo, props.userNo);
    } else if (e.target.textContent === "팔로잉") {
      //팔로잉 걸기
      followRequest(owneruserNo, props.userNo);
    }
  };

  if (btmsg === "팔로잉") {
    return (
      <FollowIngBT variant="contained" onClick={handleClick}>
        {btmsg}
      </FollowIngBT>
    );
  } else if (btmsg === "팔로우") {
    return (
      <FollowBT variant="outlined" onClick={handleClick}>
        {btmsg}
      </FollowBT>
    );
  } else if (btmsg === "맞팔로우") {
    return (
      <FollowIngBT variant="contained" onClick={handleClick}>
        {btmsg}
      </FollowIngBT>
    );
  }
};

export default FollowButton;
