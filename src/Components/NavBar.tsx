import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  PlusCircleIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

const NavBar = () => {
  return (
    <div className="float-left sticky z-50 top-0 bg-white w-full h-16 px-5 border border-gray-200 flex justify-center items-center">
      <div className="flex items-center justify-between max-w-4xl w-full">
        <Link
          to={"/post"}
          className="text-black text-lg hover:text-gray-600 select-none w-36"
        >
          MiniBrowser
        </Link>
        <SearchBar />
        <nav className="flex w-36 justify-between">
          <Link to={"/post"}>
            <HomeIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </Link>
          <Link
            to={"/post/new"}
            className="text-black hover:text-gray-600 select-none"
          >
            <PlusCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </Link>
          <Link
            to={"/user/me"}
            className="text-black hover:text-gray-600 select-none"
          >
            <UserCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
