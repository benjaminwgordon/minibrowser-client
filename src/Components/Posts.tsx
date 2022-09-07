import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Posts</h1>
      <input
        type="button"
        value="New Post"
        onClick={() => navigate("/post/new")}
      />
      <Outlet />
    </div>
  );
};

export default Posts;
