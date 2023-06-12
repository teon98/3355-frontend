import React from "react";
import TopNavbar from "../components/TopNavbar";
import LowerNavbar from "../components/LowerNavbar";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <TopNavbar />
      <Outlet />
      <LowerNavbar />
    </div>
  );
};

export default Navbar;
