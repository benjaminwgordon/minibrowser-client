import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import {
  PlusCircleIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import NewPostForm from "./NewPost/NewPostForm";
import Modal from "./Modal";
import { AuthContext } from "../Contexts/Auth";
import { XCircleIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  // TODO: The NavBar currently controls the new post modal form, but this feels hard to track.  Condiser moving it in the future for clarity
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    auth.logout();
  };

  return (
    <div className="bg-white w-full h-16 px-5 border border-gray-200 flex justify-center items-center">
      <div className="flex items-center justify-between max-w-4xl w-full">
        <Link
          to={"/post/feed"}
          className="text-black text-lg hover:text-gray-600 select-none w-36"
        >
          MiniBrowser
        </Link>
        <SearchBar />
        <nav className="flex w-36 justify-between">
          <Link to={"/post/feed"}>
            <HomeIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </Link>
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="text-black hover:text-gray-600 select-none"
          >
            <PlusCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </button>
          <Link
            to={`/user/${auth.username}`}
            className="text-black hover:text-gray-600 select-none"
          >
            <UserCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </Link>
          <button
            className="text-black hover:text-gray-600 select-none"
            onClick={() => handleLogout()}
          >
            <XCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </button>
        </nav>
      </div>
      {isNewPostModalOpen ? (
        <Modal
          close={() => setIsNewPostModalOpen(false)}
          content={<NewPostForm close={() => setIsNewPostModalOpen(false)} />}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavBar;
