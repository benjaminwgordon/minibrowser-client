import React from "react";
import ITag from "../../Types/ITag";
import { useNavigate } from "react-router-dom";
import { TagIcon } from "@heroicons/react/24/outline";

interface ISearchTagResultsProps {
  searchTagResult: ITag[];
  resetSearchUI: () => void;
}

const SearchTagResults = (props: ISearchTagResultsProps) => {
  const navigate = useNavigate();

  const searchTagResultItems = props.searchTagResult.map((tag) => (
    <li
      key={tag.id}
      onClick={() => {
        navigate(`/post/feed?tagId=${tag.id}`);
        props.resetSearchUI();
      }}
      className="flex w-full h-8 pl-5 items-center text-black hover:bg-gray-100"
    >
      <TagIcon className="w-6 h-6 text-indigo-400 mr-2" />
      {tag.name}
    </li>
  ));

  return <ul>{searchTagResultItems}</ul>;
};

export default SearchTagResults;
