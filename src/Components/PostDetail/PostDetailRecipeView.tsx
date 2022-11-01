import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { IRecipe } from "../NewPost/NewPostRecipeForm";
import NewRecipeStep from "../NewPost/NewRecipeStep";

interface IPostDetailRecipeView {
  recipeFor: string;
  RecipeStep: { id: number; instruction: string }[];
}

const PostDetailRecipeView = (props: IPostDetailRecipeView) => {
  const { recipeFor, RecipeStep } = props;
  const [isExpandSteps, setIsExpandSteps] = useState<boolean>(false);

  // console.log(RecipeStep);

  return (
    <div className="w-full justify-start items-start mt-2 select-none border p-1">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="bg-white self-start p-2">
            {!isExpandSteps ? (
              <ArrowDownIcon
                className="w-6 h-6 bg-white hover:text-gray-600 hover:cursor-pointer"
                onClick={() => setIsExpandSteps(true)}
              />
            ) : (
              <ArrowUpIcon
                className=" w-6 h-6 hover:text-gray-600 hover:cursor-pointer"
                onClick={() => setIsExpandSteps(false)}
              />
            )}
          </div>
          <div className="flex flex-col justify-center grow bg-white rounded-r-lg p-2">
            <p className="text-lg font-semibold">{recipeFor}</p>
            <ol className="ml-1">
              {isExpandSteps &&
                RecipeStep.map((recipeStep, index) => (
                  <li className="text-sm flex flex-row select-text mb-1">
                    <p className="mr-2">{index + 1 + "."}</p>
                    <p>{recipeStep.instruction}</p>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailRecipeView;
