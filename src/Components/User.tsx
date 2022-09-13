import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const User = () => {
  return (
    <div>
      <p>Users</p>
      <Outlet />
    </div>
  );
};

export default User;
