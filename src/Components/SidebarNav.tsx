import {
  BellIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import ITag from "../Types/ITag";
import SidebarSubscribed from "./SidebarSubscribed";

enum NavLocation {
  Home,
  Subscribed,
  Tags,
  Explore,
}

const updateNavLocation = (location: Location): NavLocation | null => {
  const path = (location.pathname + location.search)
    .split("/")
    .slice(1)
    .join("/");
  if (path == "tag") {
    return NavLocation.Explore;
  } else if (path == "post/feed?subscribedTags=true") {
    return NavLocation.Subscribed;
  } else if (path == "post/feed") {
    return NavLocation.Home;
  } else {
    return null;
  }
};

const SidebarNav = () => {
  const location = useLocation();
  const [navLocation, setNavLocation] = useState<NavLocation | null>(
    NavLocation.Home
  );

  useEffect(() => {
    const newLoc = updateNavLocation(location);
    console.log({ newLoc });
    setNavLocation(newLoc);
  }, [location]);

  return (
    <div className="bg-gray-200 border-gray-200 h-full select-none">
      <Link
        to="/post/feed"
        className={`pl-4 w-full h-16 flex justify-start items-center ${
          navLocation === NavLocation.Home ? "bg-gray-50" : "bg-gray-200"
        } hover:bg-white hover:cursor-pointer`}
      >
        <Square3Stack3DIcon className="w-6 h-6 mr-2" />
        <p>Home</p>
      </Link>
      <Link
        to="/post/feed?subscribedTags=true"
        className={`pl-4 w-full h-16 flex justify-start items-center ${
          navLocation === NavLocation.Subscribed ? "bg-gray-50" : "bg-gray-200"
        } hover:bg-white hover:cursor-pointer`}
      >
        <BellIcon className="w-6 h-6 mr-2" />
        <p>Subscribed</p>
      </Link>
      <SidebarSubscribed />
      <Link
        to="/tag"
        className={`pl-4 w-full h-16 flex justify-start items-center ${
          navLocation === NavLocation.Explore ? "bg-gray-50" : "bg-gray-200"
        } hover:bg-white hover:cursor-pointer`}
      >
        <MagnifyingGlassIcon className="w-6 h-6 mr-2" />
        <p>Explore</p>
      </Link>
    </div>
  );
};

export default SidebarNav;
