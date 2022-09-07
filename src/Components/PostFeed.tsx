import React, { useEffect, useState } from "react";
import Post from "./Post";
import fetchPosts from "../API/fetchPosts";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";
import IPost from "../API/types/IPost";
import { Link, useNavigate } from "react-router-dom";

const PostFeed = () => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const { jwt } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      console.log("fetching feed posts with auth token: " + jwt);
      const postList = await fetchPosts(jwt);
      if (postList === undefined) {
        //TODO: add error handling
        setPosts(null);
        console.log("empty posts return value");
      } else {
        console.log(postList);
        setPosts(postList);
      }
    };
    fetch();
  }, [jwt]);

  return (
    <div>
      <ul>
        {posts !== null ? (
          posts.map((post) => {
            return (
              <li>
                <Post
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  authorId={post.authorId}
                  author={post.author}
                  description={post.description}
                  key={post.id}
                />
              </li>
            );
          })
        ) : (
          <p>no posts to show</p>
        )}
      </ul>
    </div>
  );
};

export default PostFeed;
