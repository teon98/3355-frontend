import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChangePass = () => {
  const userNo = useSelector((state) => state.userNo);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{userNo}</h1>
    </div>
  );
};

export default ChangePass;
