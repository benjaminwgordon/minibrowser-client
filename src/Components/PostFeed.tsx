import { Outlet } from "react-router-dom";
import Feed from "./Feed";

const PostFeed = () => {
  return (
    <div className="w-full flex flex-col justify-center ">
      <div className="w-full flex flex-col md:flex-row-reverse flex-nowrap justify-center md:justify-evenly items-center md:items-start">
        <Feed />
        <Outlet />
      </div>
    </div>
  );
};

export default PostFeed;
