import { TagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import ITag from "../Types/ITag";

interface ITopTagsProps {
  tags: ITag[];
}

const TopTags = (props: ITopTagsProps) => {
  const navigate = useNavigate();

  const topTagList = props.tags.map((tag) => (
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

  return <ul className="ml-2">{topTagList}</ul>;
};

export default TopTags;
