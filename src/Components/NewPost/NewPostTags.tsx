import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  TagIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useContext } from "react";
import get from "../../API/Get";
import { AuthContext } from "../../Contexts/Auth";

interface INewPostTagsProps {
  back: () => void;
  launchSubmit: () => void;
}

interface ITag {
  id: number;
  name: string;
}

const NewPostTags = (props: INewPostTagsProps) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ITag[]>([]);
  const { jwt } = useContext(AuthContext);

  const addTag = (newTag: ITag): void => {
    setTags([...tags, newTag]);
  };

  const removeTag = (removedTag: ITag): void => {
    setTags(tags.filter((element) => element.id != removedTag.id));
  };

  useEffect(() => {
    if (searchTerm !== "") {
      //run a search against all available tags
      get<ITag[]>(jwt, `/tag?name=${searchTerm}`)
        .then((res) => {
          setSearchResult(res);
        })
        .catch((err) => console.log(err));
    } else {
      setSearchResult([]);
    }
    //if not tags match search term, render a "create tag" button
  }, [searchTerm]);

  return (
    <div className="w-96 h-full max-w-96 flex flex-col items-center bg-gray-100">
      <div className="w-full flex flex-row justify-between items-center h-12 px-4 border-b bg-white">
        <button
          type="button"
          onClick={() => props.back()}
          className="text-blue-400"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="px-4">Add Tags</h3>
        <input
          type="button"
          value={tags.length === 0 ? "skip" : "publish"}
          onClick={() => props.launchSubmit()}
          className="text-blue-400 hover:cursor-pointer"
        />
      </div>
      <div>
        <input
          type="text"
          name="searchBarInput"
          id="searchBarInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 border-t border-x border-gray-200 h-10 w-80 pl-5 outline-none"
          placeholder="Search"
          autoComplete="off"
        />
      </div>
      <ul className="w-full bg-white border border-gray-200 w-80 h-48 px-4">
        {searchResult.length > 0 ? (
          searchResult.map((tag) => (
            <li
              key={tag.id}
              className="p-1 flex flex-row justify-between items-center"
            >
              <span>{tag.name}</span>
              {tags.some((element) => element.id == tag.id) ? (
                <button>
                  <MinusIcon
                    className="h-6 w-6 text-red-400"
                    onClick={() => removeTag(tag)}
                  />
                </button>
              ) : (
                <button>
                  <TagIcon
                    className="h-6 w-6 text-green-400"
                    onClick={() => addTag(tag)}
                  />
                </button>
              )}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
      <div className="my-1 w-80">
        <ul className="flex flex-row flex-wrap justify-start">
          {tags.map((tag) => (
            <li className="pl-3 pr-2 mr-2 mb-1 bg-indigo-500 text-white rounded-full flex flex-row items-center items-center flex-nowrap">
              <span className="block h-full">{tag.name}</span>
              <button className="ml-2 h-full">
                <XMarkIcon
                  className="h-4 w-4 text-white"
                  onClick={() => removeTag(tag)}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewPostTags;
