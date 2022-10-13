import { useEffect, useState } from "react";
import Post from "./Post";
import { useContext } from "react";
import { AuthContext } from "../Contexts/Auth";
import IPost from "../API/types/IPost";
import get from "../API/Get";
import { Outlet, useSearchParams } from "react-router-dom";

const PostFeed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [detailViewPost, setDetailViewPost] = useState<IPost | undefined>(
    undefined
  );

  const { jwt } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const request = searchParams.get("tagId")
      ? `/post?tagId=${searchParams.get("tagId")}`
      : `/post`;
    const fetch = async () => {
      get<IPost[]>(jwt, request)
        .then((res) => {
          console.log({ res });
          setPosts(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch();
  }, [jwt, searchParams]);

  return (
    // detail view modal
    <div className="">
      <div className="flex flex-column justify-center mt-8">
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
      <Outlet />
    </div>
  );
};

export default PostFeed;
