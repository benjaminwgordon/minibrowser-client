import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";
import IPost from "../API/types/IPost";
import { Link, useNavigate } from "react-router-dom";
import get from "../API/Get";

const PostFeed = () => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const { jwt } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const postList: IPost[] | null = await get<IPost[]>(jwt, "/post");
      if (postList === undefined) {
        //TODO: add error handling
        setPosts(null);
      } else {
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
              <li key={post.id}>
                <Post
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  authorId={post.authorId}
                  author={post.author}
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
