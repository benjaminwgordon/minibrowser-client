import { ArrowLeftIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface IRecipe {
  recipeFor: string;
  steps: IRecipeStep[];
}

interface IRecipeStep {
  tool: string;
  ingredient: string;
  technique: string;
}

interface INewPostRecipeProps {
  nextStep: () => void;
  previousStep: () => void;
}

const NewPostRecipe = (props: INewPostRecipeProps) => {
  const { nextStep, previousStep } = props;

  // upload data for recipes and recipe steps
  const [recipes, setRecipies] = useState<IRecipe[]>([]);

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-100">
      <div className="w-full flex flex-row justify-between items-center h-12 px-4 border-b bg-white">
        <button
          type="button"
          onClick={() => previousStep()}
          className="text-blue-400"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="mx-4">Add Recipes</h3>
        <input
          type="button"
          value="next"
          onClick={() => {
            nextStep();
          }}
          className="text-blue-400 hover:cursor-pointer"
        />
      </div>
      <div>
        <PlusCircleIcon className="w-6 h-6 text-green" />
      </div>
    </div>
  );
};

export default NewPostRecipe;
