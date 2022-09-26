import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import NavBar from "./NavBar";

const Posts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <Link to="feed">Feed</Link>
        <NavBar />
        <Button
          additionalStyles="bg-red-500"
          onClick={() => {
            navigate("new");
          }}
          value="New Post"
        />
      </nav>
      <Outlet />
    </div>
  );
};

export default Posts;
