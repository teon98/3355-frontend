import React from "react";

import LowerNavbar from "../../components/common/LowerNavbar";
import { Outlet } from "react-router-dom";
import BackNavbar2 from "../../components/common/BackNavbar2";

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
