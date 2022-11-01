import {
  ArrowDownIcon,
  ArrowRightIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import get from "../API/Get";
import IUserTagSubscription from "../API/types/userTagSub";
import { AuthContext } from "../Contexts/Auth";
import ITag from "../Types/ITag";

const SidebarSubscribed = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [subscribedTags, setSubscribedTags] = useState<
    (IUserTagSubscription & { tag: ITag })[]
  >([]);
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    get<(IUserTagSubscription & { tag: ITag })[]>(jwt, "/tags/subscribed")
      .then((res) => {
        setSubscribedTags(res);
        // console.log({ subbedTagsList: res });
      })
      .catch((err) => console.log(err));
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    console.log({ isExpanded });
  };

  return (
    <div
      onClick={() => toggleExpand()}
      className="w-full flex flex-col justify-center items-start"
    >
      <div className="pl-4 w-full h-16 flex flex-row flex-nowrap justify-between items-center hover:bg-white hover:cursor-pointer">
        <div className="flex flex-row justify-start">
          <TagIcon className="w-6 h-6 mr-2" />
          <p>My Tags</p>
        </div>
        {isExpanded ? (
          <ArrowRightIcon className="w-6 h-6 mr-4" />
        ) : (
          <ArrowDownIcon className="w-6 h-6 mr-4" />
        )}
      </div>
      {isExpanded && (
        <ul className="py-1 w-full flex flex-col bg-gray-300 border-y border-gray-400">
          {subscribedTags.map((tagSub) => (
            <Link
              to={`/post/feed?tagId=${tagSub.tag.id}`}
              className="pl-4 flex flex-row flex-nowrap hover:bg-gray-200"
            >
              <TagIcon className="w-6 h-6" />
              <p>{tagSub.tag.name}</p>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarSubscribed;
