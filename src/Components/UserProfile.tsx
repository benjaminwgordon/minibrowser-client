import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

  let { username } = useParams();
  let { jwt } = useContext(AuthContext);

  useEffect(() => {
    setPosts([]);
    get<IUser & { posts: IPost[] }>(jwt, `/user/${username}/posts`)
      .then((res) => {
        setUser({ username: res.username, id: res.id });
        setPosts(res.posts);
      })
      .catch((error) => {
        console.log(error);
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
            <li
              key={post.id}
              className="m-4"
              onClick={() => {
                navigate(`post/${post.id}`);
              }}
            >
              <img
                src={post.content}
                alt={post.title}
                className="w-64 h-64 object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  ) : (
    <p>No user found</p>
  );
};

export default UserProfile;
