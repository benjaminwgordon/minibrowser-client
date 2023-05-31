import React, { createContext, useContext, useEffect, useState } from "react";
import get from "../../API/Get";
import IPost from "../../API/types/IPost";
import { AuthContext } from "../Auth";

interface IFeedProviderProps {
  children: any;
}

interface IFeedContext {
  posts: IPost[];
  triggerPostUpdate: () => void;
}

export const FeedContext = createContext<IFeedContext>({
  posts: [],
  triggerPostUpdate: () => {},
});

export const FeedProvider = (props: IFeedProviderProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const auth = useContext(AuthContext);

  const triggerPostUpdate = () => {
    let cursor = 1;
    let take = 5;
    if (posts.length > 0) {
      cursor = posts[posts.length - 1].id;
      take = 1;
    }
    console.log(`/post?cursor=${cursor}&take=${take}`);
    get<IPost[]>(auth, `/post?cursor=${cursor}&take=${take}`)
      .then((res) => {
        //append new posts
        console.log({ res });
        setPosts([...posts].concat(res));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FeedContext.Provider
      value={{
        posts,
        triggerPostUpdate,
      }}
    >
      {props.children}
    </FeedContext.Provider>
  );
};
