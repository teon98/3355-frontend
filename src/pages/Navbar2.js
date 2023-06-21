import React from "react";

import LowerNavbar from "../components/LowerNavbar";
import { Outlet } from "react-router-dom";
import BackNavbar2 from "../components/BackNavbar2";

const Navbar = () => {
  return (
    <div>
      <BackNavbar2 />
      <Outlet />
      <LowerNavbar />
    </div>
  );
};

export default Navbar;
