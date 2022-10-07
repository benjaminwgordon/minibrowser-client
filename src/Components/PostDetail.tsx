import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IPost from "../API/types/IPost";
import get from "../API/Get";
import { AuthContext } from "../Contexts/Auth";

const PostDetail = () => {
  const navigate = useNavigate();
  const { jwt } = useContext(AuthContext);
  const params = useParams();
  const location = useLocation();

  const [post, setPost] = useState<IPost | undefined>(undefined);

  useEffect(() => {
    function fetchPost(): void {
      setPost(undefined);
      get<IPost>(jwt, `/post/${params.postId}`)
        .then((res) => {
          setPost(res);
        })
        .catch((err) => console.log(err));
    }
    fetchPost();
  }, [params]);

  return post ? (
    <div
      className="fixed top-0 left-0 z-10 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center"
      onClick={() => {
        const unnestedLocation = location.pathname
          .split("/")
          .slice(0, -2)
          .join("/");
        navigate(unnestedLocation);
      }}
    >
      <div
        className="flex flex-col justify-start h-3/4 rounded-lg bg-white m-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center border-b border-gray-200">
          <h3 className="flex items-center text-lg p-2">{post.title}</h3>
        </div>
        <div className="flex flex-row justify-stretch h-full">
          <div className="flex justify-center items-center bg-black ">
            <img
              src={post.content}
              alt="user uploaded content"
              loading="lazy"
              className="h-0 min-h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between items-left w-1/3 p-2">
            <button
              onClick={() => navigate(`/user/${post.author.username}`)}
              className="flex flex-row items-center"
            >
              <UserCircleIcon className="w-8 h-8 hover:cursor-pointer " />
              <p className="pl-1 hover:cursor-pointer">
                {post.author.username}
              </p>
            </button>
            <p className="mt-2 pl-2 text-sm">{post.description}</p>
            <div className="flex justify-self-end">
              <ul>
                <li>comment #1</li>
                <li>comment #2</li>
                <li>comment #3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PostDetail;
