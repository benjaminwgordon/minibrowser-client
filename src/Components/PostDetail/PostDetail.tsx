import { TagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IPost from "../../API/types/IPost";
import get from "../../API/Get";
import ITag from "../../Types/ITag";
import PostDetailRecipeListView from "./PostDetailRecipeListView";

const PostDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [tags, setTags] = useState<
    { postId: number; tagId: number; tag: ITag }[] | undefined
  >(undefined);

  useEffect(() => {
    function fetchPost(): void {
      setPost(undefined);
      get<IPost>(`/post/${params.postId}`)
        .then((res) => {
          setPost(res);
          // console.log({ post: res });
        })
        .catch((err) => console.log(err));
    }
    fetchPost();
  }, [params]);

  useEffect(() => {
    if (post?.id) {
      get<{ postId: number; tagId: number; tag: ITag }[]>(
        `/post/${post.id}/tag`
      )
        .then((res) => {
          setTags(res);
          // console.log({ tags: res });
        })
        .catch((err) => console.log(err));
    }
  }, [post]);

  return post ? (
    <div
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center"
      onClick={() => {
        const unnestedLocation = location.pathname
          .split("/")
          .slice(0, -2)
          .join("/");
        navigate(unnestedLocation);
      }}
    >
      <div
        className="flex flex-col justify-start w-3/4 max-w-3/4 max-h-3/4 rounded-lg bg-white m-5 border-4 border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center border-b border-gray-200">
          <h3 className="flex items-center text-lg p-2">{post.title}</h3>
        </div>
        <div className="flex flex-col lg:flex-row justify-stretch">
          <div className="flex justify-center h-full items-center bg-black w-full lg:w-2/3">
            <img
              src={post.content}
              alt="user uploaded content"
              loading="lazy"
              className="min-h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-start items-left w-full lg:w-1/3 border-l border-gray-200">
            <div className="p-2 pb-4 border-b border-gray-200">
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
            </div>
            <div className="overflow-y-scroll grow p-4">
              <PostDetailRecipeListView postId={post.id} />
            </div>
            <div className="justify-self-end p-2 w-full max-w-full">
              <ul className="flex flex-row flex-wrap">
                {tags?.map((postTag) => (
                  <li
                    key={postTag.tag.id}
                    className="bg-indigo-400 text-white rounded-full pl-2 pr-3 m-1"
                  >
                    <button
                      onClick={() =>
                        navigate(`/post/feed?tagId=${postTag.tag.id}`)
                      }
                      className="flex flex-row flex-nowrap justify-start items-center"
                    >
                      <TagIcon className="w-5 h-5  mr-2" />
                      <span className="">{postTag.tag.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="h-12 border-t border-gray-200"></div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PostDetail;
