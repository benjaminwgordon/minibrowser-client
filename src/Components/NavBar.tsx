import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import {
  PlusCircleIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import NewPostForm from "./NewPostForm";
import Modal from "./Modal";
import { AuthContext } from "../Contexts/Auth";

const NavBar = () => {
  // TODO: The NavBar currently controls the new post modal form, but this feels hard to track.  Condiser moving it in the future for clarity
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState<boolean>(false);
  const { username } = useContext(AuthContext);

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
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="text-black hover:text-gray-600 select-none"
          >
            <PlusCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </button>
          <Link
            to={`/user/${username}`}
            className="text-black hover:text-gray-600 select-none"
          >
            <UserCircleIcon className="h-6 w-6 text-black hover:text-gray-600 select-none" />
          </Link>
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
