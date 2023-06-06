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
      className="w-full flex items-center justify-center rounded-sm border border-white"
      onClick={() => navigate(`post/${props.id}`)}
    >
      <img
        src={props.content}
        alt="user uploaded content"
        loading="lazy"
        className="rounded"
      />
    </div>
  );
};

export default FeedPostImage;
