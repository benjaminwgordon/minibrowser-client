import React from "react";

type FeedPostBodyProps = {
  description: string;
};

const FeedPostBody = (props: FeedPostBodyProps) => {
  return (
    <div className="border-t border-gray-100">
      <p className="mt-2 p-2 text-sm">{props.description}</p>
    </div>
  );
};

export default FeedPostBody;
