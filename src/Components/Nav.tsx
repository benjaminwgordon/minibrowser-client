import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SidebarNav from "./SidebarNav";

// renders the side and top bar navigation panels
const Nav = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="w-screen h-16">
        <NavBar />
      </div>
      <div className="w-screen h-screen flex flex-row flex-nowrap">
        <div className="w-72 h-screen">
          <SidebarNav />
        </div>
        <div className="w-full overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Nav;
