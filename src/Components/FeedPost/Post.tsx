import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";
import FeedPostHeader from "./FeedPostHeader";
import FeedPostBody from "./FeedPostBody";
import FeedPostImage from "./FeedPostImage";

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
  const { id, title, content, authorId, author, description } = props;

  return (
    <div className="flex flex-col justify-center w-96 rounded-md">
      <FeedPostHeader title={title} author={author} />
      <FeedPostImage id={id} content={content} />
      <FeedPostBody description={description} />
    </div>
  );
};

export default Post;
