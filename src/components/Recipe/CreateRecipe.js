import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRecipe } from "../../services/RecipeService";
import { ClapSpinner } from "react-spinners-kit";
import {} from "./CreateRecipe.elements";
import { useForm } from "react-hook-form";
import ListIngredientsForm from "../Form/ListIngredientsForm";
import ListStepsForm from "../Form/ListStepsForm";

export default function CreateRecipe() {
  const { register, handleSubmit, watch, reset, errors } = useForm();

  const onRecipeSubmit = (data, e) => {
    // console.log(data);
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
    <form onSubmit={handleSubmit(onRecipeSubmit)}>
      <input
        name="recipe_name"
        placeholder="Recipe Name"
        ref={register({ required: true, maxLength: 20 })}
      />
      {errors.recipe_name && <span>This field is required</span>}
      <input
        name="category_name"
        placeholder="Category Name"
        ref={register({ maxLength: 20 })}
      />
      <input
        name="recipe_intro"
        placeholder="Recipe Intro"
        ref={register({ maxLength: 50 })}
      />
      <input
        name="prep_time"
        placeholder="Preparation Time"
        ref={register({ maxLength: 10 })}
      />
      <input
        name="total_time"
        placeholder="Total Time"
        ref={register({ required: true, maxLength: 10 })}
      />
      <input
        name="difficulty"
        placeholder="Difficulty"
        type="number"
        ref={register({ maxLength: 1 })}
      />

      <div class="row">
        <ListStepsForm register={register} />
        <ListIngredientsForm register={register} />
      </div>
      <input type="submit" />
    </form>
  );
}
