import React from "react";
import { useLocation } from "react-router-dom";

function PayComplete(props) {
  const location = useLocation();
  let str = location.state.data;

  return (
    <div>
      <h1>결제</h1>
      <p>{str}</p>
    </div>
  );
}

export default PayComplete;
