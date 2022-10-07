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
  const [isShowDetailView, setIsShowDetailView] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center w-96 rounded-lg bg-white border">
      {isShowDetailView ? (
        <PostDetail
          post={props}
          close={() => {
            setIsShowDetailView(false);
          }}
        ></PostDetail>
      ) : (
        <></>
      )}
      <div className="flex flex-row justify-between items-center px-5">
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
        onClick={() => setIsShowDetailView(true)}
      >
        <img src={props.content} alt="user uploaded content" loading="lazy" />
      </div>
      <p className="mt-2 pl-2 text-sm">{props.description}</p>
    </div>
  );
};

export default Post;
