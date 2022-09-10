import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get from "../API/Get";
import IPost from "../API/types/IPost";
import { AuthContext } from "../Contexts/Auth";

interface IUser {
  username: string;
  id: number;
}

const UserProfile = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  let { username } = useParams();
  let { jwt } = useContext(AuthContext);

  useEffect(() => {
    get<IUser>(jwt, `user/${username}`)
      .then((res) => {
        setUser(res);
        return res as IUser;
      })
      .catch((error) => {
        setErrors(["error finding user"]);
      });
  }, [user]);

  return user ? (
    <div>
      <p>{user.username}</p>
    </div>
  ) : (
    <p>No user found</p>
  );
};

export default UserProfile;
