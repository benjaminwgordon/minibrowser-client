import { useContext, useEffect, useRef } from "react";
import { FeedContext } from "../Contexts/Feed";
import Post from "./FeedPost/Post";

const PostFeedAll = () => {
  const { posts, triggerPostUpdate } = useContext(FeedContext);
  const loader = useRef(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const handleIntersect = () => {
    triggerPostUpdate();
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  const postRender = posts.map((post) => (
    <ul key={post.id}>
      <Post
        id={post.id}
        title={post.title}
        content={post.content}
        authorId={post.authorId}
        author={{
          username: post.author.username,
          id: post.author.id,
        }}
        description={post.description}
      />
    </ul>
  ));

  useEffect(() => {
    if (posts.length === 0) {
      triggerPostUpdate();
    } else {
    }
  }, []);

  return (
    <div>
      {postRender}
      <div ref={loader}></div>
    </div>
  );
};

export default PostFeedAll;
