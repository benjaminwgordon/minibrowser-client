import { BellIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import get from "../API/Get";
import IPost from "../API/types/IPost";
import { AuthContext } from "../Contexts/UserSession";
import Button from "./Button";
import ExploreTagView from "./ExploreTagView";
import Post from "./Post";
import SubscribeToTagWidget from "./SubscribeToTagWidget";

const Feed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const auth = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [isSubscribedRequest, setIsSubscribedRequest] =
    useState<boolean>(false);
  const [isTagRequest, setIsTagRequest] = useState<boolean>(false);
  const [tagId, setTagId] = useState<number>(-1);

  useEffect(() => {
    setIsLoading(true);

    let request = "/post";

    // check if user is requesting their subscribed tags
    if (searchParams.has("tagId")) {
      request += `?tagId=${searchParams.get("tagId")}`;
      setIsTagRequest(true);
      const tagIdParam = searchParams.get("tagId");
      if (typeof tagIdParam == "string") {
        const tagIdInt = parseInt(tagIdParam);
        setTagId(tagIdInt);
      }
    } else {
      setIsTagRequest(false);
    }

    // check if user is requesting their subscribed tags
    if (searchParams.has("subscribedTags")) {
      request += "?subscribedTags=true";
      setIsSubscribedRequest(true);
    } else {
      setIsSubscribedRequest(false);
    }

    if (request.indexOf("?") == -1) {
      request += "?";
    } else {
      request += "&";
    }

    request += "cursor=1&take=5";

    const fetch = async () => {
      get<IPost[]>(request)
        .then((res) => {
          setPosts(res);
          // console.log({ res });
          setIsLoading(false);
        })
        .catch((error) => {
          // console.log(error);
          setIsLoading(false);
        });
    };
    fetch();
  }, [auth, searchParams]);

  return (
    <div className="w-full flex flex-column justify-center items-center pb-16">
      {isLoading ? (
        <div className="">
          <PropagateLoader size={20} color={"#818cf8"} />
        </div>
      ) : (
        <div className="w-full relative flex flex-col items-center">
          {isTagRequest && (
            <div className="sticky top-0 w-full h-16 mb-4 p-2 px-4 bg-white rounded-md flex justify-center items-center rounded-md border-b border-gray-200">
              <SubscribeToTagWidget tagId={tagId} />
            </div>
          )}
          <div className="mt-4 w-96 flex flex-row-reverse flex-nowrap">
            <ul>
              {posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <li key={post.id} className="mb-8">
                      <Post
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        authorId={post.author.id}
                        author={post.author}
                        description={post.description}
                      />
                    </li>
                  );
                })
              ) : isSubscribedRequest ? (
                <p className="mt-8">
                  You are not subscribed to any tags yet, try subscribing to
                  some{" "}
                  <Link
                    to="/tag"
                    className="text-indigo-400 hover:text-ingido-500 hover:cursor-pointer"
                  >
                    top tags
                  </Link>
                </p>
              ) : (
                <p className="mt-8">
                  There are no posts associated with this tag
                </p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
