import React from "react";

interface IPostProps {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: string;
  description: string;
}

const Post = (props: IPostProps) => {
  return (
    <div style={{ border: "1px solid black", padding: "1rem" }}>
      <p>{props.title}</p>
      <p>{props.content}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default Post;
