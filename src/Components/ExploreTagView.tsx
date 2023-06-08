import { useState, useEffect } from "react";
import ITag from "../Types/ITag";
import { useContext } from "react";
import { AuthContext } from "../Contexts/UserSession";
import get from "../API/Get";
import { PropagateLoader } from "react-spinners";
import TopTags from "./TopTags";
import { EyeIcon } from "@heroicons/react/20/solid";

// renders a list of top tag links
const ExploreTagView = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    get<ITag[]>(`/tag/top?take=8`).then((res) => {
      setTags(res);
      setIsLoading(false);
    });
  }, [auth]);

  return (
    <div className="mt-8 p-4 w-96 md:w-64 bg-white rounded-lg border border-gray-200 ">
      <div className="flex flex-row flex-nowrap items-center mb-2">
        <EyeIcon className="w-8 h-8 mr-2 " />
        <h2 className="text-lg text-center">Explore popular tags</h2>
      </div>
      {isLoading ? (
        <PropagateLoader size={20} color={"#818cf8"} />
      ) : (
        <TopTags />
      )}
    </div>
  );
};

export default ExploreTagView;
