import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import NavBar from "./NavBar";

const Posts = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Posts;
