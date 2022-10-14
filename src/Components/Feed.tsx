import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import get from "../API/Get";
import IPost from "../API/types/IPost";
import { AuthContext } from "../Contexts/Auth";
import Post from "./Post";

const Feed = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { jwt } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const request = searchParams.get("tagId")
      ? `/post?tagId=${searchParams.get("tagId")}`
      : `/post`;
    const fetch = async () => {
      get<IPost[]>(jwt, request)
        .then((res) => {
          setPosts(res);
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
        <PropagateLoader size={20} color={"#818cf8"} />
      ) : (
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
      )}
    </div>
  );
};

export default Feed;
