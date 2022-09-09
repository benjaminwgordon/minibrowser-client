import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Posts</h1>
      <nav>
        <Link to="feed">Feed</Link>
        <Link to="new">New Post</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Posts;
