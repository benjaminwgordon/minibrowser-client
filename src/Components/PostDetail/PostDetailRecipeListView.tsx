import { useContext, useEffect, useState } from "react";
import get from "../../API/Get";
import { AuthContext } from "../../Contexts/UserSession";
import { IRecipe } from "../NewPost/NewPostRecipeForm";
import PostDetailRecipeView from "./PostDetailRecipeView";

interface IPostDetailRecipeListViewProps {
  postId: number;
}

const PostDetailRecipeListView = (props: IPostDetailRecipeListViewProps) => {
  const { postId } = props;

  const [recipes, setRecipes] = useState<
    { recipeFor: string; RecipeStep: { id: number; instruction: string }[] }[]
  >([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    get<
      { recipeFor: string; RecipeStep: { id: number; instruction: string }[] }[]
    >(`/post/${postId}/recipe`)
      .then((res) => {
        setRecipes(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderRecipes = () => {
    if (recipes.length === 0) {
      return <p>This post has no recipes</p>;
    } else {
      return recipes.map((recipe, index) => (
        <PostDetailRecipeView
          recipeFor={recipe.recipeFor}
          RecipeStep={recipe.RecipeStep}
          key={"recipe-" + index}
        />
      ));
    }
  };

  return (
    <div className="">
      <h3 className="text-lg font-semibold select-none">Recipes</h3>
      <ul className="">{renderRecipes()}</ul>
    </div>
  );
};

export default PostDetailRecipeListView;
