import { TrashIcon } from "@heroicons/react/24/outline";
import { IRecipeStep } from "./NewPostRecipeForm";

interface INewRecipeStepProps {
  stepNumber: number;
  step: IRecipeStep;
  updateRecipeStep: (step: number, instruction: string) => void;
  deleteRecipeStep: (index: number) => void;
}

const NewRecipeStep = (props: INewRecipeStepProps) => {
  const { stepNumber, step, deleteRecipeStep, updateRecipeStep } = props;

  return (
    <div className="flex flex-row justify-start items-center">
      <button
        onClick={() => {
          deleteRecipeStep(stepNumber);
        }}
        className="select-none"
        tabIndex={-1}
      >
        <TrashIcon className="w-5 h-5 text-red-400" />
      </button>
      <div className="w-6 flex justify-center items-center">
        <p>{stepNumber + 1}</p>
      </div>
      <div className="flex flex-col grow pl-2">
        <input
          type="text"
          name="instruction"
          autoComplete="off"
          value={step.instruction}
          placeholder="Instruction..."
          maxLength={200}
          onChange={(e) => updateRecipeStep(stepNumber, e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewRecipeStep;
