import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRecipe } from "../../../services/recipes/RecipeService";
import { useForm } from "react-hook-form";
import ListIngredientsForm from "../../Form/ListIngredientsForm";
import ListStepsForm from "../../Form/ListStepsForm";
import ImportRecipe from "../RecipeImport/ImportRecipe";
import Button from "../../Generics/Button";

export default function CreateRecipe(recipe) {
  const { register, handleSubmit, setValue, errors } = useForm();

  const onRecipeSubmit = (data, e) => {
    console.log(data);
    createRecipe(data)
      .then((response) => {
        alert("Recipe Created");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  console.log(recipe);
  useEffect(() => {
    setValue("recipe_name", recipe.recipe.recipe_name);
    setValue("category", recipe.recipe.category);
    setValue("recipe_intro", recipe.recipe.recipe_intro);
    setValue("prep_time", recipe.recipe.prep_time[1]);
    setValue("total_time", recipe.recipe.total_time[1]);
    setValue("cook_time", recipe.recipe.cook_time[1]);
    setValue("difficulty", recipe.recipe.difficulty);
    setValue("yield", recipe.recipe.yield);
    setValue("recipe_image", recipe.recipe.recipe_image);
    if (recipe.recipe.nutrition) {
      setValue("nutrition", recipe.recipe.nutrition);
    }
    setValue("recipe_url", recipe.recipe.recipe_url);
    setValue("ingredients", recipe.recipe.ingredients);
    setValue("steps", recipe.recipe.steps);
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onRecipeSubmit)}>
          <input
            name="recipe_name"
            placeholder="Recipe Name"
            ref={register({ required: true, maxLength: 50 })}
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
            name="recipe_image"
            placeholder="Recipe Image URL"
            type="text"
            ref={register}
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
          {recipe.recipe.nutrition.map((item, index) => {
            return (
              <input
                name={`nutrition[${index}]`}
                placeholder="Nutrition"
                defaultValue={item}
                type="text"
                ref={register()}
              />
            );
          })}
          <input
            name="recipe_url"
            placeholder="URL of recipe (if applicable)"
            type="text"
            ref={register({ maxLength: 100 })}
          />
          {recipe.recipe.ingredients.map((item, index) => {
            return (
              <input
                name={`ingredients[${index}]`}
                placeholder="Ingredients"
                defaultValue={item}
                type="text"
                ref={register()}
              />
            );
          })}
          {recipe.recipe.steps.map((item, index) => {
            return (
              <input
                name={`steps[${index}]`}
                placeholder="Steps"
                defaultValue={item}
                type="text"
                ref={register()}
              />
            );
          })}
          <div>
            <ListIngredientsForm register={register} />
            <ListStepsForm register={register} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}
