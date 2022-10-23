import {
  ArrowLeftIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { PropagateLoader } from "react-spinners";
import get from "../../API/Get";
import post from "../../API/Post";
import { AuthContext } from "../../Contexts/Auth";
import ITag from "../../Types/ITag";

interface INewPostTagsProps {
  tags: ITag[];
  setTags: Dispatch<SetStateAction<ITag[]>>;
  nextStep: () => void;
  previousStep: () => void;
}

const NewPostTags = (props: INewPostTagsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ITag[]>([]);
  const [isShowInstructions, setIsShowInstructions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { jwt } = useContext(AuthContext);

  const { tags, setTags } = props;

  const addTag = (newTag: ITag): void => {
    setTags([...tags, newTag]);
  };

  const removeTag = (removedTag: ITag): void => {
    setTags(tags.filter((element) => element.id != removedTag.id));
  };

  const submitNewTag = () => {
    setIsLoading(true);
    const newTagName = searchTerm;
    post<{ name: string }, ITag>(jwt, "/tag", { name: newTagName })
      .then((res) => {
        addTag(res);
        setSearchTerm("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      //run a search against all available tags
      setIsLoading(true);
      get<ITag[]>(jwt, `/tag?name=${searchTerm}`)
        .then((res) => {
          setSearchResult(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
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
          onClick={() => props.previousStep()}
          className="text-blue-400"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div
          className="px-4"
          onMouseEnter={() => setIsShowInstructions(true)}
          onMouseLeave={() => setIsShowInstructions(false)}
        >
          <h3 className="relative flex flex-row flex-nowrap justify-center items-center">
            Add Tags{" "}
            <QuestionMarkCircleIcon className="ml-1 w-4 h-4 text-blue-400" />
            {isShowInstructions ? (
              <div className="absolute top-0 left-full z-50 bg-white w-96 rounded-lg p-3 border-2 border-blue-200 text-sm">
                Adding tags to your post makes it much more likely that users
                will discover your content. If you are not sure what tags to
                add, try adding what media your content is, e.g.
                "Blacksmithing", "Knitting", "Miniatures"
              </div>
            ) : (
              <></>
            )}
          </h3>
        </div>

        <input
          type="button"
          value={tags.length === 0 ? "skip" : "next"}
          onClick={() => props.nextStep()}
          className="text-blue-400 hover:cursor-pointer"
        />
      </div>
      <div className="relative w-80 flex flex-row flex-nowrap justify-between items-center mt-2 border border-gray-200 bg-white">
        <input
          type="text"
          name="searchBarInput"
          id="searchBarInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 w-80 pl-5 outline-none focus:border border-indigo-400"
          placeholder="Search for tags"
          autoComplete="off"
        />
        {searchTerm !== "" ? (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute left-72 bg-white text-gray-400"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <ul className="w-full bg-white border-x border-b border-gray-200 w-80 h-48 px-4">
        {isLoading ? (
          <div className="w-full py-4 flex flex-row justify-center items-center">
            <PropagateLoader size={20} color={"#818cf8"} />
          </div>
        ) : searchResult.length > 0 ? (
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
        ) : searchTerm.length > 0 ? (
          <div>
            <div>
              <span className="">
                Your search didn't match any existing tags, would you like to
                create a new tag with the name
              </span>
              <span className="text-indigo-600">{` ${searchTerm}`}</span>
              <span>?</span>
            </div>
            <div className="w-full flex flex-row justify-end items-center">
              <button onClick={() => submitNewTag()}>
                <CheckIcon className="h-8 w-8 text-green-400"></CheckIcon>
              </button>
              <button onClick={() => setSearchTerm("")}>
                <XMarkIcon className="h-8 w-8 text-red-400"></XMarkIcon>
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-gray-600">
            Add tags to make your post easier to find
          </p>
        )}
      </ul>
      <div className="my-2 w-80">
        <ul className="flex flex-row flex-wrap justify-start">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <li
                key={tag.id}
                className="pl-3 pr-2 mr-2 mb-1 bg-indigo-500 text-white rounded-full flex flex-row items-center items-center flex-nowrap"
              >
                <span className="block h-full">{tag.name}</span>
                <button className="ml-2 h-full">
                  <XMarkIcon
                    className="h-4 w-4 text-white"
                    onClick={() => removeTag(tag)}
                  />
                </button>
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NewPostTags;
