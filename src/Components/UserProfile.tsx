import { useContext, useEffect, useState } from "react";
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
    <div className="w-screen flex flex-col justify-evenly ">
      <div className="flex flex-row p-4  justify-center border-b rounded-md">
        <h1 className="text-xl font-bold">{user.username}</h1>
      </div>
      <div>
        <ul className="flex flex-row justify-evenly flex-wrap">
          {posts.map((post) => (
            <li key={post.id} className="m-4">
              <img
                src={post.content}
                alt={post.title}
                className="w-64 h-64 object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>No user found</p>
  );
};

export default UserProfile;
