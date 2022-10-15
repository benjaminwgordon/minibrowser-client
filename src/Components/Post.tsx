import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostDetail from "./PostDetail";

interface IPostProps {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: { username: string; id: number };
  description: string;
}

const Post = (props: IPostProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-96 rounded-lg bg-white border">
      <div className="flex flex-row justify-between items-center px-5 border-b border-gray-100">
        <h3 className="flex items-center text-lg h-10">{props.title}</h3>
        <a
          onClick={() => navigate(`/user/${props.author.username}`)}
          className="flex flex-row items-center"
        >
          <UserCircleIcon className="w-8 h-8 hover:cursor-pointer " />
          <p className="pl-1 hover:cursor-pointer">{props.author.username}</p>
        </a>
      </div>
      <div
        className="w-full bg-black flex items-center justify-center"
        onClick={() => navigate(`post/${props.id}`)}
      >
        <img src={props.content} alt="user uploaded content" loading="lazy" />
      </div>
      <div className="border-t border-gray-100">
        <p className="mt-2 pl-2 text-sm">{props.description}</p>
      </div>
    </div>
  );
};

export default Post;
