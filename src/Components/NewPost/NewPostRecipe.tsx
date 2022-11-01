import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import { IRecipe, IRecipeStep } from "./NewPostRecipeForm";
import NewRecipeStep from "./NewRecipeStep";

interface INewPostRecipeProps {
  index: number;
  recipes: IRecipe[];
  setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
}

const NewPostRecipe = (props: INewPostRecipeProps) => {
  const { recipes, setRecipes, index } = props;
  const [isExpandSteps, setIsExpandSteps] = useState<boolean>(true);

  const addBlankRecipeStep = () => {
    const newStep: IRecipeStep = {
      instruction: "",
    };
    const updatedRecipes = [...recipes];
    updatedRecipes[index].steps.push(newStep);
    setRecipes(updatedRecipes);
    console.log(recipes);
  };

  const updateRecipeStep = (stepIndex: number, instruction: string) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index].steps[stepIndex].instruction = instruction;
    setRecipes(updatedRecipes);
  };

  const deleteRecipe = () => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  const deleteRecipeStep = (stepIndex: number) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index].steps.splice(stepIndex, 1);
    setRecipes(updatedRecipes);
  };

  const updateRecipeFor = (newRecipeFor: string) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index].recipeFor = newRecipeFor;
    setRecipes(updatedRecipes);
  };

  return (
    <div className="w-full items-start bg-white rounded-md p-1">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="self-start p-2">
            {!isExpandSteps ? (
              <ArrowDownIcon
                className="w-6 h-6"
                onClick={() => setIsExpandSteps(true)}
              />
            ) : (
              <ArrowUpIcon
                className=" w-6 h-6"
                onClick={() => setIsExpandSteps(false)}
              />
            )}
          </div>
          <div className="flex flex-col justify-center grow p-2">
            <div className="">
              <label htmlFor="recipeForInput" className="sr-only">
                What part of the model is this recipe for?
              </label>
              <div className="flex flex-row flex-nowrap justify-between items-center">
                <div className="flex flex-row flex-nowrap justify-between items-center">
                  <input
                    type="text"
                    name="recipeForInput"
                    value={recipes[index].recipeFor}
                    placeholder="Recipe for..."
                    className="w-48 grow px-2 text-xl font-semibold"
                    onChange={(e) => updateRecipeFor(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button onClick={() => deleteRecipe()}>
                    <TrashIcon className="w-6 h-6 text-red-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {isExpandSteps &&
                recipes[index].steps?.map((recipeStep, index) => (
                  <NewRecipeStep
                    step={recipeStep}
                    stepNumber={index}
                    updateRecipeStep={updateRecipeStep}
                    deleteRecipeStep={deleteRecipeStep}
                  />
                ))}
              {isExpandSteps && (
                <div className="h-6 w-full flex flex-row flex-nowrap">
                  <button
                    className="text-green-500 flex flex-row flex-nowrap items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      addBlankRecipeStep();
                    }}
                  >
                    <PlusCircleIcon className="w-5 h-5 mr-2 ml-5 text-green-400" />
                    <p>Add Step</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostRecipe;
