import { PlusCircleIcon } from "@heroicons/react/24/outline";
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

const NewPostRecipe = () => {
  // upload data for recipes and recipe steps
  const [recipes, setRecipies] = useState<IRecipe[]>([]);

  return (
    <div>
      <div>
        <h2>Add Recipes</h2>
        <PlusCircleIcon className="w-6 h-6 text-green" />
      </div>

      <div></div>
    </div>
  );
};

export default NewPostRecipe;
