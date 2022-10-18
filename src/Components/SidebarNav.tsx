import {
  BellIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import ITag from "../Types/ITag";

const SidebarNav = () => {
  const [subscribedTags, setSubscribedTags] = useState<ITag[]>([]);

  return (
    <div className="bg-white border-r border-gray-200 h-full">
      <Link
        to="/post/feed"
        className="pl-4 w-full h-16 flex justify-start items-center bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
      >
        <Square3Stack3DIcon className="w-6 h-6 mr-2" />
        <p>Home</p>
      </Link>
      <Link
        to="/post/feed?subscribedTags=true"
        className="pl-4 w-full h-16 flex justify-start items-center bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
      >
        <BellIcon className="w-6 h-6 mr-2" />
        <p>Subscribed</p>
      </Link>
      <Link
        to="/tag"
        className="pl-4 w-full h-16 flex justify-start items-center bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
      >
        <RectangleGroupIcon className="w-6 h-6 mr-2" />
        <p>My Tags</p>
      </Link>
      <Link
        to="/tag"
        className="pl-4 w-full h-16 flex justify-start items-center bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
      >
        <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
        <p>Explore</p>
      </Link>
    </div>
  );
};

export default SidebarNav;