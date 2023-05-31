import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  let { username } = useParams();
  let auth = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    setPosts([]);
    get<IUser & { posts: IPost[] }>(auth, `/user/${username}/posts`)
      .then((res) => {
        setUser({ username: res.username, id: res.id });
        setPosts(res.posts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [auth, username]);

  return isLoading ? (
    <div className="w-full pt-8 flex flex-col justify-center items-center">
      <PropagateLoader size={20} color={"#818cf8"} />
    </div>
  ) : user ? (
    <div className="w-full flex flex-col justify-evenly ">
      <div className="flex flex-row p-4 pl-8 justify-start border-b rounded-md">
        <div className="text-xl font-bold flex flex-row">
          <UserCircleIcon className="w-8 h-8 mr-4" />
          <h2>{user.username}</h2>
        </div>
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
