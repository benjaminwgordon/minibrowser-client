import React from "react";
import { useNavigate } from "react-router-dom";

type FeedPostImageProps = {
  id: number;
  content: string;
};

const FeedPostImage = (props: FeedPostImageProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full bg-black flex items-center justify-center"
      onClick={() => navigate(`post/${props.id}`)}
    >
      <img src={props.content} alt="user uploaded content" loading="lazy" />
    </div>
  );
};

export default FeedPostImage;
