import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import NewPostRecipe from "./NewPostRecipe";

export interface IRecipe {
  recipeFor: string;
  steps: IRecipeStep[];
}

export interface IRecipeStep {
  instruction: string;
}

interface INewPostRecipeProps {
  nextStep: () => void;
  previousStep: () => void;
  recipes: IRecipe[];
  setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
}

const NewPostRecipeForm = (props: INewPostRecipeProps) => {
  const { nextStep, previousStep, recipes, setRecipes } = props;

  return (
    <div className="w-208 h-208 flex flex-col items-center bg-gray-100">
      <div className="w-full flex flex-row justify-between items-center h-12 px-4 border-b bg-white">
        <button
          type="button"
          onClick={() => previousStep()}
          className="text-blue-400 hover:cursor-pointer hover:text-blue-600"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h3 className="mx-4">Add Recipes</h3>
        <input
          type="button"
          value="publish"
          onClick={() => {
            nextStep();
          }}
          className="text-blue-400 hover:cursor-pointer hover:text-blue-600"
        />
      </div>
      <div className="w-full px-4  overflow-y-scroll flex flex-col justify-center">
        <ul className="mt-2 w-full flex flex-col">
          {recipes.map((recipe, index) => (
            <li className="mb-4" key={index}>
              <NewPostRecipe
                index={index}
                recipes={props.recipes}
                setRecipes={props.setRecipes}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setRecipes([...recipes, { recipeFor: "", steps: [] }]);
          }}
          className="my-4 bg-green-400 text-white rounded-lg px-2 py-1 self-center select-none"
        >
          <p>Add a recipe</p>
        </button>
      </div>
    </div>
  );
};

export default NewPostRecipeForm;
