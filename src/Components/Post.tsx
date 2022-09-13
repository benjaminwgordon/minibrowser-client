import React from "react";
import { useNavigate } from "react-router-dom";

interface IPostProps {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: string;
  description: string;
}

const Post = (props: IPostProps) => {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <p>{props.description}</p>
      <a onClick={() => navigate(`/user/${props.author}`)}>
        <p>Author: {props.author}</p>
      </a>
    </div>
  );
};

export default Post;
