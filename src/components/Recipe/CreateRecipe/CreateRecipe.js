import React from "react";
import { createRecipe } from "../../../services/recipes/RecipeService";
import { useForm } from "react-hook-form";
import ListIngredientsForm from "../../Form/ListIngredientsForm";
import ListStepsForm from "../../Form/ListStepsForm";

export default function CreateRecipe() {
  const { register, handleSubmit, errors } = useForm();

  const onRecipeSubmit = (data, e) => {
    console.log(data);
    // console.log(watch("example"));
    // console.log(register);
    createRecipe(data)
      .then((response) => {
        // console.log(response);
        alert("Recipe Created");
        e.target.reset();
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onRecipeSubmit)}>
        <input
          name="recipe_name"
          placeholder="Recipe Name"
          ref={register({ required: true, maxLength: 20 })}
        />
        {errors.recipe_name && <span>This field is required</span>}
        <input
          name="category"
          placeholder="Category"
          ref={register({ maxLength: 50 })}
        />
        <input
          name="recipe_intro"
          placeholder="Recipe Intro"
          ref={register({ maxLength: 100 })}
        />
        <input
          name="prep_time"
          placeholder="Preparation Time"
          ref={register({ maxLength: 10 })}
          type="number"
        />
        <input
          name="cook_time"
          placeholder="Cook Time"
          ref={register({ maxLength: 10 })}
          type="number"
        />
        <input
          name="total_time"
          placeholder="Total Time"
          ref={register({ required: true, maxLength: 10 })}
          type="number"
        />
        <input
          name="difficulty"
          placeholder="Difficulty"
          type="number"
          ref={register({ maxLength: 1 })}
        />
        <input
          name="recipe_image"
          placeholder="Recipe Image URL"
          type="text"
          ref={register({ maxLength: 100 })}
        />
        <input
          name="yield"
          placeholder="Yield (number of servings)"
          type="text"
          ref={register({ maxLength: 20 })}
        />
        <input
          name="difficulty"
          placeholder="Difficulty - 10 being hardest"
          type="number"
          ref={register({ maxLength: 2 })}
        />
        <input
          name="nutrition"
          placeholder="Nutritional Information"
          type="text"
          ref={register({ maxLength: 500 })}
        />
        <input
          name="recipe_url"
          placeholder="URL of recipe (if applicable)"
          type="text"
          ref={register({ maxLength: 100 })}
        />
        <div>
          <ListIngredientsForm register={register} />
          <ListStepsForm register={register} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
