import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";
import IPost from "../API/types/IPost";
import { Link, useNavigate } from "react-router-dom";
import get from "../API/Get";

const PostFeed = () => {
  const [posts, setPosts] = useState<
    (IPost & { author: { username: string; id: number } })[]
  >([]);
  const { jwt } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      get<(IPost & { author: { username: string; id: number } })[]>(
        jwt,
        "/post"
      )
        .then((res) => {
          setPosts(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch();
  }, [jwt]);

  return (
    <div>
      <ul>
        {posts !== null ? (
          posts.map((post) => {
            return (
              <li key={post.id}>
                <Post
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  authorId={post.author.id}
                  author={post.author.username}
                  description={post.description}
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
