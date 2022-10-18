import { BellIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import get from "../API/Get";
import IPost from "../API/types/IPost";
import { AuthContext } from "../Contexts/Auth";
import Button from "./Button";
import Post from "./Post";
import SubscribeToTagWidget from "./SubscribeToTagWidget";

const Feed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { jwt } = useContext(AuthContext);
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

    const fetch = async () => {
      get<IPost[]>(jwt, request)
        .then((res) => {
          setPosts(res);
          console.log({ res });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    fetch();
  }, [jwt, searchParams]);

  return (
    <div className="flex flex-column justify-center items-center mt-8">
      {isLoading ? (
        <div className="">
          <PropagateLoader size={20} color={"#818cf8"} />
        </div>
      ) : (
        <div>
          {isTagRequest ? (
            <div className="w-full h-16 mb-4 p-2 px-4 bg-white rounded-md flex justify-center items-center rounded-md">
              <SubscribeToTagWidget tagId={tagId} />
            </div>
          ) : (
            <></>
          )}
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
            ) : (
              <p>There are no posts yet for this tag</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feed;
