import { useContext, useEffect, useState } from "react";
import INewPost from "../../API/types/INewPost";
import IPost from "../../API/types/IPost";
import { AuthContext } from "../../Contexts/Auth";
import ImageUpload from "./ImageUpload";
import NewPostFormMetadata from "./NewPostFormMetadata";
import { useNavigate } from "react-router-dom";
import postMultipart from "../../API/PostMultipart";
import NewPostTags from "./NewPostTags";
import ITag from "../../Types/ITag";
import post from "../../API/Post";
import { PropagateLoader } from "react-spinners";
import NewPostRecipe, { IRecipeStep } from "./NewPostRecipeForm";
import { IRecipe } from "./NewPostRecipeForm";

interface INewPostFormProps {
  close: () => void;
}

enum NewPostFormSteps {
  ImageUpload,
  Metadata,
  Tags,
  Recipes,
}

const NewPostForm = (props: INewPostFormProps) => {
  const progressiveFormStepOrder: NewPostFormSteps[] = [
    NewPostFormSteps.ImageUpload,
    NewPostFormSteps.Metadata,
    NewPostFormSteps.Tags,
    NewPostFormSteps.Recipes,
  ];

  const [currentPostFormStep, setCurrentPostFormStep] =
    useState<NewPostFormSteps>(NewPostFormSteps.ImageUpload);

  const nextStep = () => {
    console.log("next step called");
    const currentStepIndex =
      progressiveFormStepOrder.indexOf(currentPostFormStep);
    if (currentStepIndex === -1) {
      console.log({
        progressiveFormError:
          "failed to find index of current progressive form step",
      });
    } else {
      if (currentStepIndex === progressiveFormStepOrder.length - 1) {
        // once all steps are complete, submit the new Post with metadata, tags, and recipes
        handleSubmit();
      } else {
        setCurrentPostFormStep(progressiveFormStepOrder[currentStepIndex + 1]);
      }
    }
  };

  const previousStep = () => {
    console.log("previous step called");
    const currentStepIndex =
      progressiveFormStepOrder.indexOf(currentPostFormStep);
    if (currentStepIndex === -1) {
      console.log({
        progressiveFormError:
          "failed to find index of current progressive form step",
      });
    } else {
      if (currentStepIndex === 1) {
        props.close();
      }
      if (currentStepIndex === 0) {
        console.log({
          progressiveFormError:
            "index out of bounds, no previous progressive form steps exist",
        });
      } else {
        setCurrentPostFormStep(progressiveFormStepOrder[currentStepIndex - 1]);
      }
    }
  };

  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const { jwt, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // remove incomplete recipesSteps
    let cleanedRecipes = recipes.map((recipe) => {
      const steps = recipe.steps.filter((step) => step.instruction !== "");
      const filteredRecipe: IRecipe = {
        recipeFor: recipe.recipeFor,
        steps,
      };
      return filteredRecipe;
    });

    // removed incomplete recipes
    cleanedRecipes = cleanedRecipes.filter((recipe) => recipe.recipeFor !== "");

    console.log({ uncleanedRecipes: recipes, cleanedRecipes: cleanedRecipes });

    setIsUploading(true);
    if (image === undefined) {
      throw new Error();
    }
    const body: INewPost = {
      title,
      description,
      image,
    };

    postMultipart<INewPost, IPost>(jwt, "/post", body)
      .then((result) => {
        // if user added tags, upload them
        if (tags.length !== 0) {
          post<{ post: IPost; tags: ITag[] }, IPost & ITag[]>(
            jwt,
            `/post/${result.id}/tag`,
            { post: result, tags }
          )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // if user added recipes, upload them
        if (recipes.length !== 0) {
          post<{ recipes: IRecipe[] }, any>(jwt, `/post/${result.id}/recipe`, {
            recipes: cleanedRecipes,
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        // cleanup and nav to view new post
        setIsUploading(false);
        props.close();
        navigate(`/user/${username}`);
      })
      .catch((error) => {
        console.log({ error });
        props.close();
        setIsUploading(false);
      });
  };

  const imageUpload = (
    <ImageUpload
      image={image}
      setImage={setImage}
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );

  const metadataUpload = (
    <NewPostFormMetadata
      image={image}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );
  const tagsUpload = (
    <NewPostTags
      tags={tags}
      setTags={setTags}
      nextStep={nextStep}
      previousStep={previousStep}
    />
  );

  const propagateSpinner = (
    <div className="w-96 h-96 bg-white rounded-lg flex flex-col justify-center items-center">
      <p className="mb-2 text-indigo-400 text-xl">Uploading your image</p>
      <PropagateLoader size={20} color={"#818cf8"} />
    </div>
  );

  const recipesUpload = (
    <NewPostRecipe
      nextStep={nextStep}
      previousStep={previousStep}
      recipes={recipes}
      setRecipes={setRecipes}
    />
  );

  const content = () => {
    if (isUploading) {
      return propagateSpinner;
    } else {
      switch (currentPostFormStep) {
        case NewPostFormSteps.ImageUpload:
          return imageUpload;
        case NewPostFormSteps.Metadata:
          return metadataUpload;
        case NewPostFormSteps.Tags:
          return tagsUpload;
        case NewPostFormSteps.Recipes:
          return recipesUpload;
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {content()}
    </div>
  );
};

export default NewPostForm;
