import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Posts = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Posts;
