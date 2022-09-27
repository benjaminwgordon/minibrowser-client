import { link } from "fs";
import { stringify } from "querystring";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get from "../API/Get";
import IPost from "../API/types/IPost";
import { AuthContext } from "../Contexts/Auth";
import Post from "./Post";

interface IUser {
  username: string;
  id: number;
}

const UserProfile = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser>();
  const [errors, setErrors] = useState<string[]>([]);

  let { username } = useParams();
  let { jwt } = useContext(AuthContext);

  useEffect(() => {
    get<IUser & { posts: IPost[] }>(jwt, `/user/${username}/posts`)
      .then((res) => {
        console.log({ res });
        setErrors([]);
        setUser({ username: res.username, id: res.id });
        setPosts(res.posts);
      })
      .catch((error) => {
        console.log(error);
        setErrors(["error finding user"]);
      });
  }, [username]);

  return user ? (
    <div className="">
      <div>
        <ul className="">
          {posts.map((post) => (
            <li key={post.id}>
              <Post
                id={post.id}
                title={post.title}
                content={post.content}
                authorId={user.id}
                author={user.username}
                description={post.description}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>UserProfile</p>
        <p>{user.username}</p>
      </div>
    </div>
  ) : (
    <p>No user found</p>
  );
};

export default UserProfile;
