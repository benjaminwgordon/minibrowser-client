import { Outlet } from "react-router-dom";
import ExploreTagView from "./ExploreTagView";
import Feed from "./Feed";

const PostFeed = () => {
  return (
    <div className="w-full flex flex-col justify-center ">
      <div className="max-w-96 flex flex-col md:flex-row-reverse flex-nowrap justify-center md:justify-evenly items-center md:items-start">
        <ExploreTagView />
        <Feed />
        <Outlet />
      </div>
    </div>
  );
};

export default PostFeed;
