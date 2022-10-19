import { TagIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import get from "../API/Get";
import { AuthContext } from "../Contexts/Auth";
import ITag from "../Types/ITag";

const TopTags = () => {
  const navigate = useNavigate();
  const [topTags, setTopTags] = useState<ITag[]>([]);
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    get<ITag[]>(jwt, "/tag/top?take=20")
      .then((res) => {
        setTopTags(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const topTagList = topTags.map((tag) => (
    <li
      key={tag.id}
      className="flex flex-row flex-nowrap justify-start items-center text-indigo-400 hover:text-indigo-500"
      onClick={() => {
        navigate(`/post/feed?tagId=${tag.id}`);
      }}
    >
      <TagIcon className="w-6 h-6 mr-1" />
      <span className="">{tag.name}</span>
    </li>
  ));

  return (
    <div>
      <div>
        <h3 className="pl-4 text-xl">Check out these top tags</h3>
      </div>
      <ul className="ml-6">{topTagList}</ul>
    </div>
  );
};

export default TopTags;
