import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";
import IPost from "../API/types/IPost";
import { Link, useNavigate } from "react-router-dom";
import get from "../API/Get";
import PostDetail from "./PostDetail";

const PostFeed = () => {
  const [posts, setPosts] = useState<
    (IPost & { author: { username: string; id: number } })[]
  >([]);
  const [detailViewPost, setDetailViewPost] = useState<
    undefined | (IPost & { author: { username: string; id: number } })
  >(undefined);

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
    // detail view modal
    <div className="">
      <div className="flex flex-column justify-center mt-8">
        <ul>
          {posts !== null ? (
            posts.map((post) => {
              return (
                <li key={post.id} className="mb-8">
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
    </div>
  );
};

export default PostFeed;
